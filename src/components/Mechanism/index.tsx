import { useContractRead } from 'wagmi';
import {
  Group,
  Stack,
  Text,
  Image as MImage,
  Center,
  SimpleGrid,
  BackgroundImage,
} from '@mantine/core';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSiteStyles } from 'src/theme';
import { useMediaQuery } from '@mantine/hooks';

const abi: any = process.env.NEXT_PUBLIC_ABI;

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
    active: true,
    key: 0,
  },
];

const Mechanism = ({ fifaInfo }) => {
  const { classes } = useSiteStyles();
  const isBreakpointXs = useMediaQuery('(max-width: 576px)');
  const isBreakpointMd = useMediaQuery('(min-width: 992px)');

  const [totalRewardPool, setTotalRewardPool] = useState(0);

  useEffect(() => {
    if (fifaInfo) {
      // mechanismList.map((item) => {
      //   if (item.key >= fifaInfo.type) {
      //     item.active = true;
      //   }
      //   return item;
      // });
    }
  }, [fifaInfo]);

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
    <div id='mechanism'>
      <BackgroundImage src='/mechanism-bg.jpg'>
        <Stack
          align='center'
          spacing={isBreakpointMd ? 50 : 'sm'}
          sx={(theme) => ({
            padding: '60px 20px 100px',
            position: 'relative',
            overflow: 'hidden',
            [theme.fn.smallerThan('md')]: {
              padding: '60px 15px 60px',
            },
          })}
        >
          <Stack align='center' spacing={25}>
            <Text align='center' className={classes.heroTitle}>
              THE MECHANISM
            </Text>
            <Text
              align='center'
              color='#FDFCFC'
              size={18}
              sx={() => ({
                textShadow: '0px 6px 6px #000000',
                fontFamily: 'Balthazar-Regular',
              })}
            >
              NFTs are the core of meta-universe props and entertainment
            </Text>
            <Text
              pt={10}
              sx={(theme) => ({
                color: '#FAFAFC',
                fontSize: '24px',
                fontFamily: 'Balthazar-Regular',
                textShadow: '1px 3px 7px rgba(34, 34, 34, 0.8)',
                [theme.fn.largerThan('md')]: {
                  // fontSize: '20px',
                },
              })}
            >
              Current pool:{' '}
              <span style={{ color: '#FA2823', fontFamily: 'BalooBhaina' }}>{totalRewardPool}</span> ETH
            </Text>
          </Stack>
          <SimpleGrid
            pt={20}
            cols={2}
            spacing={45}
            breakpoints={[{ maxWidth: 860, cols: 1, spacing: 45 }]}
            sx={(theme) => ({
              width: '80%',
              [theme.fn.smallerThan('md')]: {
                width: '100%'
              }
            })}
          >
            <Stack
              spacing={20}
              sx={(theme) => ({
                padding: '0 35px',
                [theme.fn.smallerThan('md')]: {
                  padding: '0',
                },
              })}
            >
              <Text
                color='#F8D648'
                pb={isBreakpointXs ? 0 : 5}
                sx={(theme) => ({
                  fontSize: '24px',
                  lineHeight: '56px',
                  fontFamily: 'Balthazar-Regular',
                  [theme.fn.smallerThan('xs')]: {
                    textAlign: 'center'
                  }
                })}
              >
                How to play?
              </Text>
              <Text
                color='#FCFBF9'
                sx={(theme) => ({
                  fontSize: '18px',
                  lineHeight: '30px'
                })}
                style={{ fontFamily: 'Balthazar-Regular' }}
              >
                The project party retains 20% of the sales revenue as operating expenses, and 80% of the total revenue is returned to NFT holders in the form of prize.
                <br />
                There are five stages of this season: 32 into 16, 16 into 8, 8 into 4, 4 into 2, and the final.
                The NFT holders of each winning team of these five stages will be awarded 5%, 10%, 15%, 20% and 50% of the total prize pool, respectively.
              </Text>
              <Text
                color='#FCFBF9'
                sx={(theme) => ({
                  fontSize: '18px',
                  lineHeight: '30px',
                  fontFamily: 'Balthazar-Regular'
                })}
              >
                As a member of NFT holder you will receive:
                <br />
                <span style={{ color: '#F6DC70' }}>
                  NFT sales revenue awards, community access, airdrops, regular giveaways, metaverse ticket, and much more ...
                </span>
              </Text>
            </Stack>
            <BackgroundImage src='/pool-bg.png' radius={25}>
              <Stack
                spacing={25}
                align='center'
                sx={(theme) => ({
                  width: '500px',
                  padding: '45px 0 40px',
                  justifyContent: 'center',
                  margin: '0 auto',
                  [theme.fn.smallerThan('md')]: {
                    width: '100%',
                    padding: '25px 0 20px',
                  },
                })}
              >
                <Group spacing={40} sx={() => ({})}>
                  <Center
                    sx={(theme) => ({
                      width: '170px',
                      height: '46px',
                      backgroundColor: '#F8D648',
                      color: '#10106b',
                      fontSize: '17px',
                      boxShadow: '0px 3px 2px 0px rgba(61, 107, 195, 0.51)',
                      opacity: 0,
                      [theme.fn.smallerThan('xs')]: {
                        fontSize: '12px',
                        width: '100px',
                        height: '30px',
                        borderRadius: '8px',
                      }
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
                      sx={(theme) => ({
                        width: '102px',
                        height: '40px',
                        borderRadius: '14px',
                        fontSize: '17px',
                        background: '#F8D648',
                        color: '#10106b',
                        boxShadow: '1px 3px 2px 0px rgba(0, 0, 0, 0.51)',
                        [theme.fn.smallerThan('xs')]: {
                          fontSize: '14px',
                          width: '80px',
                          height: '30px',
                          borderRadius: '8px',
                        }
                      })}
                    >
                      32 teams
                    </Center>

                    <MImage
                      sx={(theme) => ({
                        position: 'absolute',
                        top: '48px',
                        [theme.fn.smallerThan('xs')]: {
                          top: '35px'
                        }
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
                          width: '170px',
                          height: '46px',
                          backgroundColor: '#F8D648',
                          color: '#10106b',
                          fontSize: '17px',
                          boxShadow: '1px 3px 2px 0px rgba(0, 0, 0, 0.51)',
                          [theme.fn.smallerThan('xs')]: {
                            fontSize: '14px',
                            width: '100px',
                            height: '30px',
                            borderRadius: '8px',
                          }
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
                          sx={(theme) => ({
                            width: '102px',
                            height: '40px',
                            borderRadius: '14px',
                            fontSize: '17px',
                            boxShadow: '1px 3px 2px 0px rgba(0, 0, 0, 0.51)',
                            background: !item.active
                              ? '#F8D648'
                              : 'linear-gradient(#f6a53d, #f13a25)',
                            color: item.active ? '#fff' : '#10106b',
                            [theme.fn.smallerThan('xs')]: {
                              fontSize: '14px',
                              width: '80px',
                              height: '30px',
                              borderRadius: '8px',
                            }
                          })}
                        >
                          {item.name}
                        </Center>
                        {item.name !== 'winner' && (
                          <MImage
                            sx={(theme) => ({
                              position: 'absolute',
                              top: '48px',
                              [theme.fn.smallerThan('xs')]: {
                                top: '35px'
                              }
                            })}
                            src='/icon/icon-down1.png'
                            width={8}
                            height={16}
                          ></MImage>
                        )}
                      </Stack>
                    </Group>
                  );
                })}
              </Stack>
            </BackgroundImage>
          </SimpleGrid>
        </Stack>
      </BackgroundImage>
    </div>
  );
};

export default Mechanism;
