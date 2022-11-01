import {
  useNetwork,
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useProvider,
} from 'wagmi';
import {
  Anchor,
  Box,
  CopyButton,
  Group,
  Stack,
  Text,
  UnstyledButton,
  Button,
  Image as MImage,
  Center,
  SimpleGrid,
  Table,
} from '@mantine/core';
import Web3 from 'web3';
import Image from 'next/image';
import { NextPage } from 'next';
import abi from 'src/abi/abi.json';
import { FifaInfo } from 'src/types';
import { Parallax } from 'rc-scroll-anim';
import React, { useState, useEffect } from 'react';
import { useSiteStyles } from 'src/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Mint from './Mint';

const Hero = () => {
  const { classes } = useSiteStyles();
  const isBreakpointLg = useMediaQuery('(min-width: 1201px)');
  return (
    <Stack
      id='home'
      align='center'
      spacing={0}
      sx={(theme) => ({
        width: '100%',
        background: "url('/banner-bg.png') no-repeat #fff",
        backgroundSize: '100% 100%',
      })}
    >
      <Center
        sx={(theme) => ({
          padding: '50px 0 0',
          width: '60vw',
          [theme.fn.largerThan('lg')]: {
            width: '40vw',
          },
          [theme.fn.largerThan('md')]: {
            width: '43vw',
          },
          [theme.fn.smallerThan('xs')]: {
            width: '80vw',
          },
        })}
      >
        <MImage src='/banner.png'></MImage>
      </Center>

      <Stack
        sx={(theme) => ({
          width: '100%',
          background: "url('/hero-bg.png') no-repeat #f3f7ff",
          backgroundSize: '60%',
          minHeight: '700px',
          backgroundPosition: 'bottom right',
          position: 'relative',
          paddingTop: '50px',
          paddingBottom: '65px',
        })}
      >
        <Stack align='center'>
          <Text align='center' className={classes.heroTitle}>
            Get your NFT,
          </Text>
          <Text align='center' className={classes.heroTitle}>
            Win the final prize!
          </Text>
        </Stack>
        <Stack align='center' pt={10}>
          <Text align='center' className={classes.modelTips}>
            Metasoco is a bridge between soccor fans and crypto users.
          </Text>
          <Text align='center' className={classes.modelTips}>
            Support your favorite team, get your NFT, and win the final prize!
          </Text>
        </Stack>
        <Box
          sx={(theme) => ({
            height: '650px',
            padding: '70px 0',
            width: '100%',
            overflow: 'hidden',
            [theme.fn.smallerThan('md')]: {
              padding: '20px 0',
              height: '550px',
            },
            [theme.fn.largerThan('lg')]: {
              height: '750px',
            },
          })}
        >
          <Parallax
            animation={{ x: 0, rotate: -5 }}
            style={{
              transform: 'translateX(-100px) rotate(-5deg)',
              margin: '30px auto',
            }}
            className='code-box-left'
          >
            <Group
              sx={() => ({
                flexWrap: 'nowrap',
              })}
            >
              {new Array(Number(16)).fill(null).map((item, index) => {
                return (
                  <MImage
                    key={`image_top_${index}`}
                    width={isBreakpointLg ? 180 : 150}
                    src={`/team/${index + 1}.png`}
                  ></MImage>
                );
              })}
            </Group>
          </Parallax>
          <Parallax
            animation={{ x: -100, rotate: -5 }}
            style={{
              transform: 'translateX(0) rotate(-5deg)',
              margin: '30px auto',
            }}
            className='code-box-right'
          >
            <Group
              sx={() => ({
                flexWrap: 'nowrap',
              })}
            >
              {new Array(Number(16)).fill(null).map((item, index) => {
                return (
                  <MImage
                    key={`image_bottom_${index}`}
                    width={isBreakpointLg ? 180 : 150}
                    src={`/team/${index + 17}.png`}
                  ></MImage>
                );
              })}
            </Group>
          </Parallax>
        </Box>
      </Stack>
    </Stack>
  );
};

const mechanismList = [
  {
    name: '16 teams',
    pool: 5,
    iconScale: 1,
    active: false,
    key: 16,
  },
  {
    name: '8 teams',
    pool: 10,
    iconScale: 1.15,
    active: false,
    key: 8,
  },
  {
    name: '1/4',
    pool: 15,
    iconScale: 1.35,
    active: false,
    key: 4,
  },
  {
    name: '1/2',
    pool: 20,
    iconScale: 1.45,
    active: false,
    key: 1,
  },
  {
    name: 'winner',
    pool: 50,
    iconScale: 1.65,
    active: false,
    key: 0,
  },
];

const Mechanism = ({ contract, fifaInfo }) => {
  const { classes } = useSiteStyles();
  const isBreakpointMd = useMediaQuery('(min-width: 992px)');

  const [totalRewardPool, setTotalRewardPool] = useState(0);

  useEffect(() => {
    if (fifaInfo) {
      mechanismList.map((item) => {
        if (item.key >= fifaInfo.type) {
          item.active = true;
        }
        return item;
      });
    }
  }, []);

  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'totalRewardPool',
    watch: true,
    onSuccess: (data) => {
      setTotalRewardPool(Number(data.toString()) / Math.pow(10, 18));
    },
  });

  return (
    <Stack
      id='mechanism'
      align='center'
      spacing={isBreakpointMd ? 50 : 'sm'}
      sx={(theme) => ({
        padding: '60px 70px 40px',
        position: 'relative',
        overflow: 'hidden',
        background: "url('/mechanism-bg.png') no-repeat #d8e2f7",
        backgroundPosition: 'left bottom',
        [theme.fn.smallerThan('md')]: {
          padding: '60px 20px 40px',
        },
      })}
    >
      <Stack align='center' spacing={25}>
        <Text align='center' className={classes.heroTitle}>
          THE MECHANISM
        </Text>
        <Text align='center' className={classes.heroTitle}>
          NFTS are the core of meta-universe props and entertainment
        </Text>
        <Center
          sx={(theme) => ({
            width: '235px',
            height: '50px',
            backgroundColor: '#f3546a',
            color: '#fbf9f9',
            boxShadow: '3px 3px 2px rgba(3, 127, 204, 0.5)',
            [theme.fn.largerThan('md')]: {
              fontSize: '20px',
            },
          })}
        >
          Current pool: {totalRewardPool} ETH
        </Center>
      </Stack>
      <SimpleGrid
        pt={20}
        cols={2}
        spacing={45}
        breakpoints={[{ maxWidth: 860, cols: 1, spacing: 45 }]}
      >
        <Stack
          align={'center'}
          spacing={25}
          sx={(theme) => ({
            padding: '0 35px',
            [theme.fn.smallerThan('md')]: {
              padding: '0',
            },
          })}
        >
          <Text align='center' className={classes.heroTitle}>
            How to play?
          </Text>
          <Text
            align='center'
            sx={(theme) => ({
              fontSize: '14px',
              [theme.fn.largerThan('lg')]: {
                fontSize: '16px',
              },
            })}
            style={{ fontFamily: 'Balthazar-Regular' }}
          >
            The project party retains 20% of the sales revenue as
            <br />
            operating expenses, and 80% of the total revenue is
            <br /> returned to NFT holders in the form of rewards.
          </Text>
          <Text
            align='center'
            sx={(theme) => ({
              fontSize: '14px',
              [theme.fn.largerThan('lg')]: {
                fontSize: '16px',
              },
            })}
            style={{ fontFamily: 'Balthazar-Regular' }}
          >
            There are five stages of the season: 32 into 16,
            <br />
            16 into 8, 8 into 4, 4 into 2, the finals. <br />
            Each winning team NFT will enter the next
            <br />
            round of the rewards pool, which will be awarded
            <br /> 5%, 10%, 15%, and 20% of the total bonus pool, respectively.
            <Text color={'#eb3f3f'} style={{ fontFamily: 'Balthazar-Regular' }}>
              The champion team NFT will receive 50% of the total sales revenue.
            </Text>
          </Text>
          <Text
            sx={(theme) => ({
              fontSize: '14px',
              [theme.fn.largerThan('lg')]: {
                fontSize: '16px',
              },
            })}
            align='center'
            style={{ fontFamily: 'Balthazar-Regular' }}
          >
            <Text
              sx={() => ({
                fontFamily: 'barlow-black',
              })}
            >
              As a member of NFT holder you recieve:
            </Text>
            NFT sales revenue awards
            <br />
            Community access
            <br />
            Airdrops
            <br />
            Regular giveaways
            <br />
            Metaverse ticket
            <br />
            Much more ...
          </Text>
        </Stack>
        <Stack
          spacing={25}
          align='center'
          sx={(theme) => ({
            width: '450px',
            padding: '25px 0 30px',
            backgroundColor: '#c3d2ef',
            borderRadius: '25px',
            justifyContent: 'center',
            [theme.fn.smallerThan('md')]: {
              width: '100%',
            },
          })}
        >
          <Group spacing={40} sx={() => ({})}>
            <Center
              sx={(theme) => ({
                width: '120px',
                height: '33px',
                opacity: 0,
                [theme.fn.smallerThan('xs')]: {
                  width: '100px',
                },
              })}
            >
              0% of the pool
            </Center>
            <Group
              sx={() => ({
                opacity: 0,
              })}
            >
              <Center
                sx={() => ({
                  width: '26px',
                  height: '20px',
                })}
              >
                <MImage src='/icon/icon-bag.png'></MImage>
              </Center>

              <Image src='/icon/icon-right.png' width={22} height={18}></Image>
            </Group>
            <Stack
              align={'center'}
              justify='flex-start'
              spacing={0}
              sx={() => ({
                position: 'relative',
              })}
            >
              <Center
                sx={() => ({
                  width: '72px',
                  height: '28px',
                  borderRadius: '28px',
                  fontSize: '13px',
                  color: '#fdfcfc',
                  backgroundColor: '#f7b04d',
                  border: '1px solid #ad8edc',
                  boxShadow: '2px 2px 2px rgba(161, 181, 226, 0.75)',
                })}
              >
                32 teams
              </Center>

              <MImage
                sx={() => ({
                  position: 'absolute',
                  top: '34px',
                })}
                src='/icon/icon-down1.png'
                width={8}
                height={16}
              ></MImage>
            </Stack>
          </Group>

          {mechanismList.map((item, index) => {
            return (
              <Group
                spacing={40}
                key={`mechanism_item_${index}`}
                sx={() => ({})}
              >
                <Center
                  sx={(theme) => ({
                    width: '120px',
                    height: '33px',
                    backgroundColor: '#bb9ce9',
                    color: '#fdfcfc',
                    fontSize: '13px',
                    boxShadow: '2px 2px 2px rgba(161, 181, 226, 0.75)',
                    [theme.fn.smallerThan('xs')]: {
                      width: '100px',
                    },
                  })}
                >
                  {item.pool}% of the pool
                </Center>
                <Group>
                  <Center
                    sx={() => ({
                      width: '26px',
                      height: '20px',
                      transform: `scale(${item.iconScale})`,
                    })}
                  >
                    <MImage src='/icon/icon-bag.png'></MImage>
                  </Center>

                  <Image
                    src='/icon/icon-right.png'
                    width={22}
                    height={18}
                  ></Image>
                </Group>
                <Stack
                  align={'center'}
                  justify='flex-start'
                  spacing={0}
                  sx={() => ({
                    position: 'relative',
                  })}
                >
                  <Center
                    sx={() => ({
                      width: '72px',
                      height: '28px',
                      borderRadius: '28px',
                      fontSize: '13px',
                      color: '#fdfcfc',
                      backgroundColor: !item.active ? '#bb9ce9' : '#f7b04d',
                      border: '1px solid #ad8edc',
                      boxShadow: '2px 2px 2px rgba(161, 181, 226, 0.75)',
                    })}
                  >
                    {item.name}
                  </Center>
                  {item.name !== 'winner' && (
                    <MImage
                      sx={() => ({
                        position: 'absolute',
                        top: '34px',
                      })}
                      src={
                        !item.active
                          ? '/icon/icon-down2.png'
                          : '/icon/icon-down1.png'
                      }
                      width={8}
                      height={16}
                    ></MImage>
                  )}
                </Stack>
              </Group>
            );
          })}
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

let timer: any = null;
const defaultData = [
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
  { claimType: 1, address1: '', address2: '', tokenId: '', rewards: '' },
];
const Claim = ({ contract, fifaInfo, boardList }) => {
  const { chain } = useNetwork();
  const provider = useProvider();
  const { address, isConnected } = useAccount();
  const [nftNumber, setNftNumber] = useState(0);
  const [userTotalReward, setUserTotalReward] = useState(0);
  const [recommenderReward, setRecommenderReward] = useState(0);
  const [countDownString, setCountDown] = useState([0, 0, 0, 0]);
  const [claimLoading, setClaimLoading] = useState(false);
  const [tableData, setTableData] = useState(defaultData);
  const [claimActive, setClaimActive] = useState(false);

  const isBreakpointXs = useMediaQuery('(max-width: 576px)');
  const { classes } = useSiteStyles();
  const { openConnectModal } = useConnectModal();

  const web3 = new Web3(Web3.givenProvider || provider);

  useEffect(() => {
    if (boardList) {
      const newBoardList = boardList.sort((a, b) => {
        return (
          web3.utils.hexToNumber(b.timeStamp) -
          web3.utils.hexToNumber(a.timeStamp)
        );
      });
      let arr = defaultData;
      let logArr = [];
      newBoardList.slice(0, 6).map((item, index) => {
        const data = web3.eth.abi.decodeLog(
          [
            { type: 'uint256', name: 'tokenId' },
            { type: 'uint8', name: 'tokenType' },
            { type: 'uint8', name: 'class' },
            {
              type: 'address',
              name: 'address1',
            },
            {
              type: 'address',
              name: 'address2',
            },
            {
              type: 'uint256',
              name: 'rewards',
            },
            {
              type: 'uint8',
              name: 'claimType',
            },
          ],
          item.data,
          item.topics
        );
        logArr.push(data);
        arr[index] = {
          claimType: Number(data.claimType),
          address1:
            data.address1.substring(0, 4) +
            '****' +
            data.address1.substring(
              data.address1.length - 4,
              data.address1.length
            ),
          address2:
            data.address2.substring(0, 4) +
            '****' +
            data.address2.substring(
              data.address2.length - 4,
              data.address2.length
            ),
          tokenId: data.tokenId,
          rewards: (Number(data.rewards) / Math.pow(10, 18)).toFixed(8),
        };
      });
      console.log(JSON.stringify(logArr));
      setTableData(arr);
    }
  }, [boardList]);

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
    const reward = await contract.recommenderRewards(address);
    setRecommenderReward(reward.toString() / Math.pow(10, 18));
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
    onSuccess: (data) => {
      setClaimActive(data);
    },
  });

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

  return (
    <div id='claim'>
      <Stack
        align={'center'}
        spacing={isBreakpointXs ? 15 : 40}
        sx={(theme) => ({
          padding: '65px 0',
          background: "url('/claim-bg.png') no-repeat #e3e9f5",
          backgroundSize: isBreakpointXs ? 'cover' : 'contain',
          backgroundPositionY: '60px',
        })}
      >
        <Stack align='center'>
          <Text className={classes.heroTitle}>GET YOUR PRIZE</Text>
          <Text className={classes.heroTitle} align='center' px={10}>
            If your team wins the match, you can claim the prize from pool
          </Text>
        </Stack>
        <Anchor
          href='https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022/countdown-to-qatar-2022'
          target='_blank'
        >
          <Text
            underline
            color='#9d9d9d'
            style={{ fontFamily: 'Balthazar-Regular' }}
          >
            Click here to check the match information
          </Text>
        </Anchor>
        <Stack align='center' spacing={35}>
          <Text
            align='center'
            color='#de3e3e'
            sx={() => ({
              fontSize: '25px',
            })}
            style={{ fontFamily: 'Balthazar-Regular' }}
          >
            Countdown to next reward
          </Text>
          <Group
            spacing={isBreakpointXs ? 5 : 50}
            sx={(theme) => ({
              fontSize: '24px',
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
                    width: '160px',
                    height: '160px',
                    background: "url('/countdown.png') no-repeat",
                    backgroundSize: 'contain',
                    [theme.fn.smallerThan('xs')]: {
                      width: '80px',
                      height: '80px',
                    },
                  })}
                >
                  <Text
                    sx={(theme) => ({
                      fontFamily: 'Saira-Black',
                      fontSize: '32px',
                      [theme.fn.smallerThan('xs')]: {
                        fontSize: '20px',
                      },
                    })}
                  >
                    {item}
                  </Text>
                  {index === 0 && 'day'}
                  {index === 1 && 'h'}
                  {index === 2 && 'min'}
                  {index === 3 && 's'}
                </Center>
              );
            })}
          </Group>
        </Stack>

        <Stack
          align='center'
          spacing={15}
          sx={() => ({
            position: 'relative',
            left: '40px',
          })}
        >
          <Group>
            <Center>
              <Text className={classes.underLine}>
                My NFT Team Amount: {nftNumber}
              </Text>
            </Center>
            <div className={classes.claimButton} style={{ opacity: 0 }} />
          </Group>
          <Group>
            <Center>
              <Text className={classes.underLine}>
                My NFT reward:{' '}
                <span style={{ color: '#f3261f' }}>
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
        <Group
          spacing={0}
          mt={30}
          sx={(theme) => ({
            [theme.fn.smallerThan('md')]: {
              justifyContent: 'center',
            },
            [theme.fn.smallerThan('xs')]: {
              width: '100%',
              padding: '0 10px',
            },
          })}
        >
          <Stack
            align='center'
            justify='center'
            sx={(theme) => ({
              zIndex: 2,
              width: '440px',
              height: '175px',
              padding: '0 28px',
              color: '#fff',
              background: "url('/card-bg.png') no-repeat",
              backgroundSize: '100% 100%',
              [theme.fn.smallerThan('xs')]: {
                width: '100vw',
                height: '160px',
              },
            })}
          >
            <Text align='center' className={classes.modelTips}>
              Invite friends,
            </Text>
            <Text align='center' className={classes.modelTips}>
              get rewards together!
            </Text>
            <Stack
              spacing={10}
              pt={10}
              sx={() => ({
                width: '100%',
                borderTop: '1px solid #bfbfbf',
              })}
            >
              <Text align='center' className={classes.modelTips}>
                Your invite link:
              </Text>
              <Group position='center' spacing={8}>
                <Box
                  sx={() => ({
                    width: 260,
                    wordBreak: 'break-all',
                    padding: '4px 20px',
                    lineHeight: '16px',
                    fontSize: '15px',
                    textAlign: 'center',
                    border:
                      isConnected && nftNumber > 0
                        ? '1px solid #555555'
                        : 'none',
                  })}
                >
                  {isConnected ? (
                    <div>
                      {nftNumber > 0
                        ? `${window.location.origin}/${address}`
                        : 'A minimum of one NFT is required'}
                    </div>
                  ) : (
                    <UnstyledButton
                      onClick={() => openConnectModal()}
                      sx={(theme) => ({
                        padding: '10px 12px',
                        color: '#fff',
                        borderRadius: '6px',
                        background: 'linear-gradient(#f97184, #F55b71)',
                        fontSize: '16px',
                        transform: 'scale(1)',
                        transition: 'transform 0.1s linear 0s',
                        '&:hover': {
                          transform: 'scale(0.98)',
                          transition: 'transform 0.1s linear 0s',
                        },
                        [theme.fn.largerThan('md')]: {
                          padding: '12px 14px',
                          borderRadius: '8px',
                        },
                        [theme.fn.smallerThan('md')]: {
                          fontSize: '14px',
                        },
                      })}
                    >
                      Connect Wallect
                    </UnstyledButton>
                  )}
                </Box>
                {!!address && nftNumber > 0 && (
                  <CopyButton
                    value={`Invite friends to participate in Metasoco NFTS, win the final prize pool together: ${window.location.origin}/${address}`}
                  >
                    {({ copied, copy }) => (
                      <UnstyledButton
                        onClick={copy}
                        sx={() => ({
                          transition: 'transform 0.1s linear 0s',
                          fontFamily: 'Balthazar-Regular',
                          '&:hover': {
                            transform: 'scale(0.96)',
                            transition: 'transform 0.1s linear 0s',
                          },
                        })}
                      >
                        <Image
                          src='/icon/icon-copy.png'
                          width={24}
                          height={24}
                        ></Image>
                      </UnstyledButton>
                    )}
                  </CopyButton>
                )}
              </Group>
            </Stack>
          </Stack>
          <Center
            sx={(theme) => ({
              width: '390px',
              height: '160px',
              backgroundColor: '#becbe6',
              position: 'relative',
              left: '-20px',
              zIndex: 1,
              [theme.fn.smallerThan('md')]: {
                left: 0,
                marginTop: '10px',
              },
              [theme.fn.smallerThan('xs')]: {
                width: '100%',
                left: 0,
                marginTop: '10px',
              },
            })}
          >
            <Text
              align='center'
              sx={(theme) => ({
                fontFamily: 'Balthazar-Regular',
                lineHeight: '28px',
                fontSize: '14px',
                [theme.fn.largerThan('lg')]: {
                  fontSize: '16px',
                },
              })}
            >
              If the invitee's NFT team wins, the inviter
              <br />
              receives <span style={{ color: '#f3261f' }}>10%</span> of the
              invitee's total prize.
              <br />
              Users who make a purchase through an
              <br />
              invitation link get <span style={{ color: '#f3261f' }}>
                20%
              </span>{' '}
              off Mint prices.
            </Text>
          </Center>
        </Group>
        <Stack align='center' spacing={14}>
          <Text
            color='#010101'
            sx={(theme) => ({
              fontSize: '14px',
              [theme.fn.largerThan('lg')]: {
                fontSize: '16px',
              },
            })}
            style={{
              lineHeight: '25px',
              fontFamily: 'Balthazar-Regular',
              borderBottom: '1px solid #010101',
            }}
          >
            Awards for invitations already received :{' '}
            <span style={{ color: '#f3261f' }}>
              {recommenderReward > 0
                ? recommenderReward.toFixed(8)
                : recommenderReward}
            </span>{' '}
            ETH
          </Text>
          <Text
            color='#8e8e8d'
            sx={(theme) => ({
              fontSize: '14px',
              [theme.fn.largerThan('lg')]: {
                fontSize: '16px',
              },
            })}
            style={{
              lineHeight: 1,
              fontFamily: 'Balthazar-Regular',
            }}
          >
            Automatically transferred to wallet, check on{' '}
            <UnstyledButton
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_BROWSER_DOMAIN}/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
                );
              }}
              sx={() => ({
                fontSize: '14px',
                color: '#0e32b6',
                fontFamily: 'Balthazar-Regular',
              })}
            >
              ETHSCAN
            </UnstyledButton>
          </Text>
        </Stack>
      </Stack>
      <Stack
        align='center'
        spacing={20}
        sx={(theme) => ({
          background: "url('/board-bg.png') no-repeat #ccdaf6",
          backgroundPosition: 'left bottom',
          padding: '50px 10px',
        })}
      >
        <Text className={classes.heroTitle}>LEARDERBOARD</Text>
        <Box
          sx={(theme) => ({
            padding: '20px',
            borderRadius: '25px',
            width: '735px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            [theme.fn.smallerThan('xs')]: {
              width: '100%',
            },
          })}
        >
          <Table
            horizontalSpacing='xl'
            sx={() => ({
              color: '#000',
              fontFamily: 'Balthazar-Regular',
            })}
          >
            <thead>
              <tr>
                <th
                  style={{
                    color: '#000',
                    borderColor: '#ccdaf6',
                  }}
                >
                  Address
                </th>
                <th
                  style={{
                    color: '#000',
                    borderColor: '#ccdaf6',
                  }}
                >
                  TokenId
                </th>
                <th
                  style={{
                    color: '#000',
                    borderColor: '#ccdaf6',
                    textAlign: 'center',
                  }}
                >
                  Rewards Claimed
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((element, index) => (
                <tr key={`table_item_${index}`}>
                  <td style={{ borderColor: '#ccdaf6', fontSize: '16px' }}>
                    {element.claimType === 1
                      ? element.address1
                      : element.address2}
                  </td>
                  <td style={{ borderColor: '#ccdaf6', fontSize: '16px' }}>
                    {element.tokenId}
                  </td>
                  <td
                    style={{
                      borderColor: '#ccdaf6',
                      fontSize: '16px',
                      textAlign: 'center',
                      height: '60px',
                    }}
                  >
                    {element.rewards}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Stack>
    </div>
  );
};

const voteList = [12, 8, 4, 11];

const Vote = () => {
  const { classes } = useSiteStyles();
  const isBreakpointXs = useMediaQuery('(max-width: 576px)');
  const isBreakpointLg = useMediaQuery('(min-width: 1201px)');
  return (
    <Stack
      id='vote'
      align='center'
      spacing={25}
      sx={(theme) => ({
        padding: '60px 110px 100px',
        background: "url('/vote-bg.png') no-repeat #d4dff5",
        backgroundPosition: 'left bottom',
        [theme.fn.smallerThan('md')]: {
          padding: '60px 10px',
        },
      })}
    >
      <Text align='center' className={classes.heroTitle}>
        Vote
      </Text>
      <Text color='#555555' align='center' className={classes.modelTips}>
        Top 4 hot team
      </Text>

      <Group
        align='center'
        sx={() => ({
          width: '100%',
          justifyContent: 'center',
        })}
      >
        <SimpleGrid
          cols={isBreakpointXs ? 1 : 2}
          spacing={isBreakpointXs ? 10 : isBreakpointLg ? 60 : 30}
          sx={(theme) => ({
            width: '60%',
            [theme.fn.smallerThan('md')]: {
              width: '80%',
            },
          })}
        >
          {voteList.map((item, index) => {
            return (
              <Group
                key={`item_${index}`}
                spacing={10}
                style={{
                  position: 'relative',
                  top: isBreakpointXs
                    ? 0
                    : index === 1 || index === 3
                    ? '40px'
                    : '0px',
                }}
              >
                <div
                  className='fc-wrapper'
                  style={{
                    width: isBreakpointLg ? '240px' : '200px',
                    height: isBreakpointLg ? '312px' : '260px',
                    padding: '10px',
                    background: 'rgba(176, 195, 235, 0.8)',
                  }}
                >
                  <div className='fc-inner'>
                    <div className='fc-front'>
                      <img className='fc-image' src={`/team/${item}.png`}></img>
                    </div>
                    <div className='fc-back'>
                      <img
                        className='fc-image'
                        src={`/team/${item}-back.png`}
                      ></img>
                    </div>
                  </div>
                </div>
              </Group>
            );
          })}
        </SimpleGrid>
        <Stack
          align='center'
          spacing={8}
          sx={(theme) => ({
            [theme.fn.smallerThan('md')]: {
              marginTop: '30px',
            },
          })}
        >
          <Text
            sx={(theme) => ({
              fontSize: '12px',
              [theme.fn.largerThan('md')]: {
                fontSize: '16px',
              },
            })}
            style={{ fontFamily: 'Balthazar-Regular' }}
          >
            Vote from our commutity
          </Text>
          <UnstyledButton
            onClick={() => window.open('http://t.me/theaetheroffic')}
            sx={(theme) => ({
              backgroundColor: '#f3546a',
              width: '164px',
              height: '50px',
              fontSize: '1rem',
              position: 'relative',
              textAlign: 'center',
              color: '#fdfafa',
              fontFamily: 'Balthazar-Regular',
              '&:hover': {
                boxShadow: '5px 5px 2px rgba(9, 2, 4, 0.5)',
              },
            })}
          >
            Join to vote!
            <MImage
              style={{ position: 'absolute', bottom: '-9px', right: '-7px' }}
              src='/icon/icon-mouse.png'
              width={30}
              height={26}
            ></MImage>
          </UnstyledButton>
        </Stack>
      </Group>
    </Stack>
  );
};

const About = () => {
  const { classes } = useSiteStyles();
  return (
    <Stack
      id='about'
      align='center'
      spacing={60}
      sx={(theme) => ({
        padding: '60px 130px',
        background: "url('/about-bg.png') no-repeat #d9e2f5",
        backgroundPosition: 'center bottom',
        [theme.fn.smallerThan('md')]: {
          padding: '60px 10px',
        },
      })}
    >
      <Text align='center' className={classes.heroTitle}>
        About
      </Text>

      <Text
        sx={(theme) => ({
          fontFamily: 'Balthazar-Regular',
          width: '56%',
          [theme.fn.smallerThan('md')]: {
            width: '100%',
          },
        })}
      >
        The Aether is a decentralized, open metasomatic virtual world built
        using blockchain technology, where users can build, trade, interact
        socially, and generate economic revenue. Each user is given free access
        to celestial space, where they are given a unique virtual ID. In Aether,
        players can Play, Create, Own, Govern, Social, Earn.
        <br></br>
        <br></br>
        Meta-Soco, a metaverse platform for football fans under the Aether,
        provides a web3 metaverse platform for global football fans to socialize
        and play games. Meta-Soco is the bridge between soccer lovers and crypto
        users. There will also be more games and crypto-related features that
        engage our users. We are building a full-stack Metaverse that enables
        players to enter our ecosystem and be rewarded from their NFTs with
        play-to-earn games.
      </Text>
    </Stack>
  );
};

const Partner = () => {
  const { classes } = useSiteStyles();
  const isBreakpointXs = useMediaQuery('(max-width: 576px)');
  return (
    <Stack
      id='partner'
      align='center'
      spacing={60}
      sx={(theme) => ({
        padding: '60px 130px 100px',
        backgroundColor: '#e3e9f5',
        [theme.fn.smallerThan('xs')]: {
          padding: '60px 10px',
        },
      })}
    >
      <Text align='center' className={classes.heroTitle}>
        Partners ＆Supporters
      </Text>
      <SimpleGrid cols={3} spacing={isBreakpointXs ? 10 : 25}>
        <MImage src='/partner1.png'></MImage>
        <MImage src='/partner2.png'></MImage>
        <MImage src='/partner3.png'></MImage>
      </SimpleGrid>
    </Stack>
  );
};

const HomePage: NextPage<{
  fifaInfo: FifaInfo[];
  contract: any;
  boardList: [];
  whiteListData: [];
}> = ({ fifaInfo, contract, boardList, whiteListData }) => {
  const [recentFifa, setFifaInfo] = useState({});
  useEffect(() => {
    initTime();
  }, []);

  const initTime = () => {
    const now = new Date();
    const recentFifa = fifaInfo.find((item) => {
      let endDay = new Date(`${item.time}.000Z`);
      return endDay.getTime() - now.getTime() >= 0;
    });
    setFifaInfo({
      ...recentFifa,
      now: now,
    });
  };

  return (
    <div className='container'>
      <Hero />
      <Mint contract={contract} whiteListData={whiteListData} />
      <Mechanism contract={contract} fifaInfo={recentFifa} />
      <Claim contract={contract} fifaInfo={recentFifa} boardList={boardList} />
      <Vote />
      <About />
      <Partner />
      <style jsx>{`
        .container {
          padding-top: 80px;
          width: 100%;
          height: 100%;
          line-height: 24px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
