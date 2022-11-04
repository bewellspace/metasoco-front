import {
  useAccount
} from 'wagmi';
import {
  Notification,
  Group,
  Stack,
  Text,
  UnstyledButton,
  BackgroundImage,
  Grid,
} from '@mantine/core';
import Image from 'next/image';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useSiteStyles } from 'src/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const Invite = ({ contract }) => {
  const { address, isConnected } = useAccount();
  const [nftNumber, setNftNumber] = useState(0);
  const [recommenderReward, setRecommenderReward] = useState(0);

  const [copySuccess, setCopySuccess] = useState(false);
  const { classes } = useSiteStyles();
  const { openConnectModal } = useConnectModal();
  const isBreakpointMd = useMediaQuery('(max-width: 992px)');

  useEffect(() => {
    if (contract.signer) {
      init();
    }
  }, [contract]);

  const init = async () => {
    const myNft = await contract.userTokenIds();
    setNftNumber(myNft.length);
    const reward = await contract.recommenderRewards(address);
    setRecommenderReward(reward.toString() / Math.pow(10, 18));
  };

  return (
    <BackgroundImage src='/invite-bg.png'>
      <Stack
        spacing={15}
        sx={(theme) => ({
          width: '67vw',
          padding: '40px 0 50px',
          margin: '0 auto',
          [theme.fn.smallerThan('md')]: {
            justifyContent: 'center',
          },
          [theme.fn.smallerThan('xs')]: {
            width: '100%',
            padding: '20px 10px',
          },
        })}
      >
        <Text color='#FB281E' sx={() => ({
          fontSize: '24px',
          textShadow: '0px 5px 5px #090204',
          fontFamily: 'Balthazar-Regular',
        })}>
          Invite friends, get rewards together!
        </Text>
        <Grid justify='space-around' align="center" style={{ width: '100%' }}>
          <Grid.Col span={isBreakpointMd ? 12 : 7}>
            <Text color='#fff' sx={() => ({
              fontSize: '17px',
              lineHeight: '25px',
              fontFamily: 'Balthazar-Regular',
            })}>
              If the invitee's NFT team wins, the inviter receives 10% of the invitee's total prize.Users who make a purchase through an invitation link get 20% off Mint prices.
            </Text>
          </Grid.Col>
          <Grid.Col span={isBreakpointMd ? 12 : 5}>
            {isConnected ? (
              <>
                {nftNumber > 0
                  ?
                  <Stack
                    spacing={5}
                    sx={() => ({
                      background: '#193C14',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      display: 'flex',
                    })}>
                    <Text sx={() => ({
                      fontSize: '20px',
                      color: '#fb281e',
                      lineHeight: 1,
                      fontFamily: 'Balthazar-Regular',
                    })}>Your invite link:
                    </Text>
                    <Group>
                      <Text sx={(theme) => ({
                        wordBreak: 'break-all',
                        fontSize: '16px',
                        color: '#fbd91e',
                        width: '80%',
                        fontFamily: 'Balthazar-Regular',
                        [theme.fn.smallerThan('xs')]: {
                          width: '75%',
                        }
                      })}>
                        {`${window.location.origin}/${address}`}
                      </Text>
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
                          setCopySuccess(true)
                          setTimeout(() => {
                            setCopySuccess(false);
                          }, 2000);
                        }}
                        sx={() => ({
                          transition: 'transform 0.1s linear 0s',
                          fontFamily: 'Balthazar-Regular',
                          marginLeft: '16px',
                          '&:hover': {
                            transform: 'scale(0.96)',
                            transition: 'transform 0.1s linear 0s',
                          },
                        })}
                      >
                        <Image
                          src='/icon/icon-copy.png'
                          width={28}
                          height={28}
                        ></Image>
                      </UnstyledButton>
                    </Group>
                  </Stack>
                  :
                  <Text sx={(theme) => ({
                    fontSize: '16px',
                    color: '#fbd91e',
                    fontFamily: 'Balthazar-Regular',
                    [theme.fn.smallerThan('md')]: {

                    }
                  })}>
                    A minimum of one NFT is required
                  </Text>
                }
              </>
            ) : (
              <UnstyledButton
                onClick={() => openConnectModal()}
                sx={(theme) => ({
                  marginLeft: '80px',
                  marginBottom: '20px',
                  padding: '6px 8px',
                  color: '#121C66',
                  borderRadius: '6px',
                  background: '#f8d648',
                  boxShadow: '0 4px 3px rgba(9, 2, 4, 0.58)',
                  fontSize: '18px',
                  fontFamily: 'Balthazar-Regular',
                  '&:hover': {
                    background: 'linear-gradient(#f7af3d, #f22919)',
                    color: '#fafafc'
                  },
                  [theme.fn.largerThan('md')]: {
                    padding: '6px 8px',
                    borderRadius: '6px',
                  },
                  [theme.fn.smallerThan('md')]: {
                    fontSize: '14px',
                  },
                })}
              >
                Connect Wallect
              </UnstyledButton>
            )}
          </Grid.Col>
        </Grid>

        <Stack align={isBreakpointMd ? 'left' : 'center'}
          spacing={10}
          sx={(theme) => ({
            marginTop: '10px',
            [theme.fn.smallerThan('xs')]: {
              marginTop: '5px'
            }
          })}>
          <Text color='#fbf7fb'
            sx={() => ({
              fontSize: '17px',
              lineHeight: 1,
              fontFamily: 'Balthazar-Regular',
            })}>
            Awards for invitations already received :{' '}
            <span style={{ color: '#f5330c', fontFamily: 'BalooBhaina' }}>
              {recommenderReward > 0
                ? recommenderReward.toFixed(8)
                : recommenderReward}
            </span>{' '}
            ETH
          </Text>
          <UnstyledButton
            onClick={() => {
              window.open(
                `${process.env.NEXT_PUBLIC_BROWSER_DOMAIN}address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
              );
            }}
            sx={() => ({
              fontSize: '14px',
              color: '#cdcdce',
              textDecoration: 'underline',
              fontFamily: 'Balthazar-Regular',
              lineHeight: 1
            })}
          >
            Automatically transferred to wallet, check on{' '}ETHERSCAN
          </UnstyledButton>
        </Stack>

      </Stack>
      <div
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          top: copySuccess ? '100px' : '-100px',
          zIndex: 5,
          transition: 'all .2s ease-in',
        }}
      >
        <Image src='/copy-success.png' width={200} height={52}></Image>
      </div>
    </BackgroundImage>
  )
}
export default Invite