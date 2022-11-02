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
  Notification,
  Group,
  Stack,
  Text,
  UnstyledButton,
  Button,
  Center,
  Table,
} from '@mantine/core';
import Web3 from 'web3';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSiteStyles } from 'src/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const abi: any = process.env.NEXT_PUBLIC_ABI;

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
  const [copySuccess, setCopySuccess] = useState(false);

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
          padding: '65px 0',
          background: "url('/claim-bg.png') no-repeat #e3e9f5",
          backgroundSize: isBreakpointXs ? 'cover' : 'contain',
          backgroundPositionY: '60px',
        })}
      >
        <Stack align='center' spacing={35}>
          <Text className={classes.heroTitle}>GET YOUR PRIZE</Text>
          <Text
            color='#FBF6F6'
            align='center'
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
              color='#DBD8D8'
              style={{ fontFamily: 'Balthazar-Regular' }}
            >
              Click here to check the match information
            </Text>
          </Anchor>
        </Stack>

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
                    width: '160px',
                    height: '160px',
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
                      fontSize: '32px',
                      fontFamily: 'Balthazar-Regular',
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
                  <UnstyledButton
                    onClick={() => {
                      const input = document.createElement('input');
                      document.body.appendChild(input);
                      input.setAttribute(
                        'value',
                        `Invite friends to participate in Metasoco NFTS, win the final prize pool together: ${window.location.origin}/${address}`
                      );
                      input.select();
                      if (document.execCommand('copy')) {
                        document.execCommand('copy');
                      }
                      document.body.removeChild(input);
                      setCopySuccess(true);
                      setTimeout(() => {
                        setCopySuccess(false);
                      }, 2000);
                    }}
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
                  `${process.env.NEXT_PUBLIC_BROWSER_DOMAIN}address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
                );
              }}
              sx={() => ({
                fontSize: '14px',
                color: '#0e32b6',
                fontFamily: 'Balthazar-Regular',
              })}
            >
              ETHERSCAN
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
      <div
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          top: copySuccess ? '100px' : 0,
          zIndex: 5,
          transition: 'all .2s ease-in',
        }}
      >
        <Notification
          onClose={() => {
            setCopySuccess(false);
          }}
          title='Copy success!'
        />
      </div>
    </div>
  );
};

export default Claim;
