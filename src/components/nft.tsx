import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useNetwork,
  useWaitForTransaction,
} from 'wagmi';
import { ethers } from 'ethers';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Stack, Text, Button, Box, SimpleGrid, Skeleton } from '@mantine/core';
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

  const isBreakpointLg = useMediaQuery('(min-width: 1201px)');
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
    <Stack
      align='center'
      spacing={30}
      sx={(theme) => ({
        padding: '150px 80px 80px',
        background: "url('/nft-bg.png') no-repeat #d8e2f7",
        backgroundPositionX: 'right',
        backgroundPositionY: 'bottom',
        backgroundSize: '370px 410px',
        [theme.fn.smallerThan('md')]: {
          padding: '120px 10px',
        },
      })}
    >
      <Stack align='center' spacing={45}>
        <Text className={classes.heroTitle}>
          YOU OWNED {nftNumber} TEAM NFTS
        </Text>
        <Text className={classes.modelTips} underline>
          My NFT reward：
          {userTotalReward > 0
            ? userTotalReward.toFixed(8)
            : userTotalReward}{' '}
          ETH
        </Text>
      </Stack>
      <Stack align='center'>
        <Button
          loading={claimLoading}
          disabled={!isConnected || userTotalReward <= 0 || !claimActive}
          onClick={() => handleClaim()}
          sx={() => ({
            width: '150px',
            height: '45px',
            borderRadius: '45px',
            textAlign: 'center',
            color: '#ffffff !important',
            fontSize: '20px',
            background: 'linear-gradient(#f68898, #f3546a)',
            '&:hover': {
              boxShadow: '6px 6px 10px #9ab4e5',
            },
            '&:before': {
              borderRadius: '45px !important',
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
          borderRadius: '4px',
          marginTop: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        })}
      >
        <Skeleton
          visible={loading}
          style={{
            opacity: loading ? 0.8 : 1,
            minHeight: '500px',
            padding: '50px 70px',
          }}
        >
          <SimpleGrid
            cols={isBreakpointXs ? 1 : 4}
            spacing={isBreakpointXs ? 10 : 40}
          >
            <PhotoProvider maskOpacity={0.8}>
              {boxNumber > 0 &&
                new Array(Number(boxNumber)).fill(null).map((item, index) => {
                  return (
                    <PhotoView key={`box_item_${index}`} src='/box-back.png'>
                      <div
                        className='fc-wrapper'
                        style={{
                          width: isBreakpointLg ? '240px' : '200px',
                          height: isBreakpointLg ? '330px' : '260px',
                          borderRadius: '8px',
                        }}
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
                      </div>
                    </PhotoView>
                  );
                })}
              {nftList.map((item, index) => {
                return (
                  <PhotoView
                    key={`nft_${index}`}
                    src={`/team/${item}-back.png`}
                  >
                    <div
                      className='fc-wrapper'
                      style={{
                        width: isBreakpointLg ? '240px' : '200px',
                        height: isBreakpointLg ? '330px' : '260px',
                        borderRadius: '8px',
                      }}
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
                    </div>
                  </PhotoView>
                );
              })}
            </PhotoProvider>
          </SimpleGrid>
        </Skeleton>
      </Box>
    </Stack>
  );
}
