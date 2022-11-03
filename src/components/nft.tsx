import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useWaitForTransaction,
} from 'wagmi';
import { ethers } from 'ethers';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Stack, Text, Button, Box, SimpleGrid, Skeleton, BackgroundImage, Image as MImage, Grid } from '@mantine/core';
import keccak256 from 'keccak256';
import { useRouter } from 'next/router';
import { useSiteStyles } from '../theme';
import { MerkleTree } from 'merkletreejs';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
const abi: any = process.env.NEXT_PUBLIC_ABI;

export default function NFTPage({ contract, whiteListData }) {
  const router = useRouter();
  const { classes } = useSiteStyles();
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const [nftNumber, setNftNumber] = useState(0);
  const [userTotalReward, setUserTotalReward] = useState(0);
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [boxNumber, setBoxNumber] = useState(0);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimActive, setClaimActive] = useState(false);
  const [proof, setProof] = useState([]);
  const [totalClaimedReward, setTotalReward] = useState(0);

  let shareAddress: any = NULL_ADDRESS;
  const routerAddr: any = router.query?.addr;
  if (routerAddr && ethers.utils.isAddress(routerAddr)) {
    shareAddress = routerAddr;
  }

  const isBreakpointXs = useMediaQuery('(max-width: 576px)');

  useEffect(() => {
    setNftList([])
  }, [address])

  useEffect(() => {
    if (contract.signer) {
      init();
    }
  }, [contract]);

  useEffect(() => {
    if (
      whiteListData &&
      whiteListData.length &&
      isConnected &&
      contract.signer
    ) {
      const leafNodes = whiteListData.map((addr) => keccak256(addr));
      const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      const proof = tree.getHexProof(keccak256(address));
      setProof(proof);
      getClaimedRewards(proof);
    }
  }, [whiteListData, isConnected, contract]);

  const init = async () => {
    const myNft = await contract.userTokenIds();
    setNftNumber(myNft.length);
    const calculateReward = await contract.calculateReward();
    setUserTotalReward(
      calculateReward.userTotalReward.toString() / Math.pow(10, 18)
    );
    getBoxNumber();
    setLoading(true);
    const newNftList = [...nftList];
    for (let i = 0; i < myNft.length; i++) {
      const data = await getTokenDetail(myNft[i]);
      newNftList.push(data);
    }
    setNftList(newNftList);
    setLoading(false);
  };

  const getClaimedRewards = async (proof) => {
    const data = await contract.mintInfo(shareAddress, proof);
    const totalRewards = data[3].add(data[4]).toString() / Math.pow(10, 18);
    setTotalReward(totalRewards);
  };

  const getTokenDetail = async (id) => {
    let nftDetailURI = await contract.tokenURI(id);
    return nftDetailURI.split('/')[5];
  };

  const getBoxNumber = async () => {
    const data = await contract.minterQueueInfo();
    // setBoxNumber(2);
    setBoxNumber(data[0]);
  };

  const claimPre = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'claimReward',
    enabled:
      isConnected &&
      // chain.network === process.env.NEXT_PUBLIC_CHAIN &&
      contract.signer &&
      userTotalReward > 0 &&
      claimActive,
    overrides: {
      from: address,
      value: 0,
    },
    onError: (err) => {
      // console.log('claimWriteError===', err);
      // if (err.message.indexOf(MESSAGE[0])) {
      // }
    },
  });

  const claimWrite = useContractWrite(claimPre.config);

  useEffect(() => {
    if (claimWrite.isError) {
      setClaimLoading(false);
    }
  }, [claimWrite]);

  useWaitForTransaction({
    hash: claimWrite.data?.hash,
    onSuccess: (data) => {
      setClaimLoading(false);
    },
    onSettled: async () => {
      setClaimLoading(false);
      const calculateReward = await contract.calculateReward();
      setUserTotalReward(
        calculateReward.userTotalReward.toString() / Math.pow(10, 18)
      );
      getClaimedRewards(proof);
    },
  });

  const handleClaim = () => {
    if (isConnected) {
      if (userTotalReward > 0 && claimWrite?.write) {
        setClaimLoading(true);
        claimWrite?.write();
      }
    } else {
      openConnectModal();
    }
  };

  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'claimIsActive',
    watch: true,
    onSuccess: (data: boolean) => {
      setClaimActive(data);
    },
  });

  return (
    <BackgroundImage src='/nft-bg.jpg' sx={() => ({
      backgroundPosition: 'top left'
    })}>
      <Stack
        align='center'
        spacing={30}
        sx={(theme) => ({
          padding: '150px 80px 80px',
          [theme.fn.smallerThan('md')]: {
            padding: '120px 10px',
          },
        })}
      >
        <Stack align='center' spacing={45}>
          <Text className={classes.heroTitle}>
            YOU OWNED {nftNumber} TEAM NFTS
          </Text>
          <Text color='#FCFAFA' sx={() => ({
            fontSize: '24px',
            textShadow: '3px 4px 6px #000',
            fontFamily: 'Balthazar-Regular',
          })}>
            My NFT reward:{' '}
            <span style={{ color: '#EC0F0F', fontSize: '30px' }}>
              {
                userTotalReward > 0
                  ? userTotalReward.toFixed(8)
                  : userTotalReward
              }
            </span>
            {' '}
            ETH
          </Text>
        </Stack>
        <Stack align='center'>
          <Button
            loading={claimLoading}
            disabled={!isConnected || userTotalReward <= 0 || !claimActive}
            onClick={() => handleClaim()}
            sx={() => ({
              width: '130px',
              height: '45px',
              borderRadius: '10px',
              textAlign: 'center',
              color: '#ffffff !important',
              fontSize: '20px',
              background: 'linear-gradient(#f7a435, #f51817)',
              boxShadow: '3px 3px 4px rgba(34, 34, 34, 0.53)',
              border: 'none',
              '&:hover': {
                background: 'linear-gradient(#f67d24, #f51717)',
              },
              '&:before': {
                borderRadius: '10px !important',
              },
            })}
          >
            Claim
          </Button>
          <Text
            sx={(theme) => ({
              fontFamily: 'Balthazar-Regular',
              lineHeight: '28px',
              fontSize: '14px',
              color: '#fcfafa',
              [theme.fn.largerThan('lg')]: {
                fontSize: '16px',
              },
            })}
            align='center'
          >
            Total received:{' '}
            <span style={{ color: '#f3261f' }}>
              {totalClaimedReward > 0
                ? totalClaimedReward.toFixed(8)
                : totalClaimedReward}
            </span>{' '}
            ETH
            <br />
            (Include invitation rewards)
          </Text>
        </Stack>

        <Box
          sx={(theme) => ({
            width: '86vw',
            minHeight: '500px',
            borderRadius: '10px',
            marginTop: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            [theme.fn.smallerThan('xs')]: {
              minHeight: '300px'
            }
          })}
        >
          <Skeleton
            visible={loading}
            sx={(theme) => ({
              opacity: loading ? 0.8 : 1,
              minHeight: '500px',
              padding: '50px 70px',
              [theme.fn.smallerThan('xs')]: {
                padding: '20px 10px',
              }
            })}
          >
            <PhotoProvider maskOpacity={0.8}>
              <Grid
                align='center'
                justify={isBreakpointXs ? 'center' : 'flex-start'}
                gutter={isBreakpointXs ? 10 : 30}
              >
                {boxNumber > 0 &&
                  new Array(Number(boxNumber)).fill(null).map((item, index) => {
                    return (
                      <Grid.Col span={isBreakpointXs ? 12 : 3}>
                        <PhotoView key={`box_item_${index}`} src='/box-back.png'>
                          <Box
                            sx={(theme) => ({
                              width: '200px',
                              height: '283px',
                              [theme.fn.largerThan('lg')]: {
                                width: '240px',
                                height: '340px',
                              },
                            })}
                            className='fc-wrapper'
                          >
                            <div className='fc-inner'>
                              <div className='fc-front'>
                                <img
                                  className='fc-image'
                                  src={`/box-card.png`}
                                ></img>
                              </div>
                              <div className='fc-back'>
                                <img
                                  className='fc-image'
                                  src={`/box-back.png`}
                                ></img>
                              </div>
                            </div>
                          </Box>
                        </PhotoView>
                      </Grid.Col>
                    );
                  })}
                {nftList.map((item, index) => {
                  return (
                    <Grid.Col span={isBreakpointXs ? 12 : 3}>
                      <PhotoView
                        key={`nft_${index}`}
                        src={`/team/${item}-back.png`}
                      >
                        <Box
                          className='fc-wrapper'
                          sx={(theme) => ({
                            width: '200px',
                            height: '283px',
                            [theme.fn.largerThan('lg')]: {
                              width: '240px',
                              height: '340px'
                            },

                          })}

                        >
                          <div className='fc-inner'>
                            <div className='fc-front'>
                              <img
                                className='fc-image'
                                src={`/team/${item}.png`}
                              ></img>
                            </div>
                            <div className='fc-back'>
                              <img
                                className='fc-image'
                                src={`/team/${item}-back.png`}
                              ></img>
                            </div>
                          </div>
                        </Box>
                      </PhotoView>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </PhotoProvider>
          </Skeleton>
        </Box>
      </Stack>
    </BackgroundImage >

  );
}
