import {
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import {
  Anchor,
  Group,
  Stack,
  Text,
  Button,
  Center,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useSiteStyles } from 'src/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const abi: any = process.env.NEXT_PUBLIC_ABI;

let timer: any = null;

const Claim = ({ contract, fifaInfo, boardList }) => {
  const { address, isConnected } = useAccount();
  const [nftNumber, setNftNumber] = useState(0);
  const [userTotalReward, setUserTotalReward] = useState(0);
  const [countDownString, setCountDown] = useState([0, 0, 0, 0]);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimActive, setClaimActive] = useState(false);

  const isBreakpointXs = useMediaQuery('(max-width: 576px)');
  const { classes } = useSiteStyles();
  const { openConnectModal } = useConnectModal();

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
  };

  useEffect(() => {
    if (fifaInfo.id) {
      let endDay = new Date(`${fifaInfo.time}.000Z`);
      countDown(endDay);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [fifaInfo]);

  const countDown = (eventTime) => {
    clearTimeout(timer);
    timer = null;
    const now = new Date().getTime();
    const diffTime = eventTime - now;
    let a = 6e4,
      o = 36e5,
      s = 24 * o;

    if (diffTime > 0) {
      const day = Math.floor(diffTime / s),
        hours = Math.floor((diffTime % s) / o),
        minite = Math.floor((diffTime % o) / a),
        seconds = Math.floor((diffTime % a) / 1e3);

      setCountDown([day, hours, minite, seconds]);
      timer = setTimeout(() => {
        countDown(eventTime);
      }, 1000);
    } else {
      clearTimeout(timer);
      timer = null;
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

  return (
    <div id='claim'>
      <Stack
        align={'center'}
        spacing={isBreakpointXs ? 15 : 40}
        sx={(theme) => ({
          padding: '100px 0 80px',
          background: "url('/reward-bg.jpg') no-repeat",
          backgroundSize: 'cover',
        })}
      >
        <Stack align='center' spacing={35}>
          <Text className={classes.heroTitle}>GET YOUR PRIZE</Text>
          <Text
            color='#FBF6F6'
            align='center'
            size={18}
            sx={() => ({
              textShadow: '0px 6px 6px #000000',
              fontFamily: 'Balthazar-Regular',
            })}
          >
            If your team wins the match, you can claim the prize from pool
          </Text>
          <Anchor
            href='https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022/countdown-to-qatar-2022'
            target='_blank'
          >
            <Text
              underline
              size={14}
              color='#DBD8D8'
              style={{ fontFamily: 'Balthazar-Regular' }}
            >
              Click here to check the match information
            </Text>
          </Anchor>
        </Stack>

        <Stack align='center' spacing={38} mt={20}>
          <Text
            align='center'
            color='#F8D648'
            sx={() => ({
              fontSize: '18px',
              textShadow: '0px 7px 5px #090204',
              fontFamily: 'Balthazar-Regular'
            })}
          >
            Countdown to next reward
          </Text>
          <Group
            spacing={isBreakpointXs ? 5 : 15}
            sx={(theme) => ({
              fontSize: '24px',
              justifyContent: 'center',
              [theme.fn.smallerThan('xs')]: {
                fontSize: '18px',
              },
            })}
          >
            {countDownString.map((item, index) => {
              return (
                <Center
                  key={index}
                  sx={(theme) => ({
                    width: '180px',
                    height: '180px',
                    background: "url('/clock-bg.png') no-repeat",
                    backgroundSize: 'contain',
                    [theme.fn.smallerThan('xs')]: {
                      width: '80px',
                      height: '80px',
                    },
                  })}
                >
                  <Text
                    color='#F8D648'
                    sx={(theme) => ({
                      fontSize: '38px',
                      fontFamily: 'AlegreyaSans-Black',
                      textShadow: '0px 8px 6px #090204',
                      [theme.fn.smallerThan('xs')]: {
                        fontSize: '20px',
                      },
                    })}
                  >
                    {item}
                  </Text>
                  <Text
                    color='#F8D648'
                    sx={(theme) => ({
                      fontSize: '19px',
                      fontFamily: 'AlegreyaSans-Black',
                      textShadow: '0px 8px 6px #090204',
                      [theme.fn.smallerThan('xs')]: {
                        fontSize: '19px',
                      },
                    })}>
                    {index === 0 && 'day'}
                    {index === 1 && 'h'}
                    {index === 2 && 'min'}
                    {index === 3 && 'sec'}
                  </Text>

                </Center>
              );
            })}
          </Group>
        </Stack>

        <Stack spacing={10}>
          <Group>
            <Center>
              <Text className={classes.underLine}>
                My NFT Team Amount: {' '}
                <span style={{ color: '#F51717', paddingLeft: '4px', fontSize: '24px', fontFamily: 'BalooBhaina' }}>{nftNumber}</span>
              </Text>
            </Center>
            <div className={classes.claimButton} style={{ opacity: 0 }} />
          </Group>
          <Group spacing={20}>
            <Center>
              <Text className={classes.underLine}>
                My NFT reward:{' '}
                <span style={{ color: '#F51717', fontSize: '24px', fontFamily: 'BalooBhaina' }}>
                  {userTotalReward > 0
                    ? userTotalReward.toFixed(8)
                    : userTotalReward}
                </span>{' '}
                ETH
              </Text>
            </Center>
            <Button
              loading={claimLoading}
              className={classes.claimButton}
              disabled={!isConnected || userTotalReward <= 0 || !claimActive}
              onClick={() => handleClaim()}
            >
              Claim
            </Button>
          </Group>
        </Stack>

      </Stack>
    </div>
  );
};

export default Claim;
