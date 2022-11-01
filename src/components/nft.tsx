import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
  useNetwork,
  useWaitForTransaction,
} from 'wagmi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Stack, Text, Button, Box, SimpleGrid, Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSiteStyles } from '../theme';
import Blindbox from './Blindbox';
import { useMediaQuery } from '@mantine/hooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const abi: any = process.env.NEXT_PUBLIC_ABI;
export default function NFTPage({ contract }) {
  const { chain } = useNetwork();
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

  const isBreakpointLg = useMediaQuery('(min-width: 1201px)');
  const isBreakpointXs = useMediaQuery('(max-width: 576px)');

  useEffect(() => {
    if (contract.signer) {
      init();
    }
  }, [contract]);

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

  const getTokenDetail = async (id) => {
    let nftDetailURI = await contract.tokenURI(id);
    return nftDetailURI.split('/')[5];
  };

  const getBoxNumber = async () => {
    const data = await contract.minterQueueInfo();
    setBoxNumber(2);
    // setBoxNumber(data[0]);
  };

  const claimPre = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'claimReward',
    enabled:
      isConnected &&
      chain.network === process.env.NEXT_PUBLIC_CHAIN &&
      contract.signer &&
      userTotalReward > 0 &&
      claimActive,
    overrides: {
      from: address,
      value: 0,
    },
    onError: (err) => {
      console.log('claimWriteError===', err);
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
