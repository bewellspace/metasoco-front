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
  Image as MImage,
  Center,
  SimpleGrid,
  Table,
} from '@mantine/core';
import Web3 from 'web3';
import Image from 'next/image';
import { NextPage } from 'next';
import { FifaInfo } from 'src/types';
import React, { useState, useEffect } from 'react';
import { useSiteStyles } from 'src/theme';
import { useMediaQuery } from '@mantine/hooks';
import Mint from './Mint';
import Hero from './Hero';
import Mechanism from './Mechanism';
import Claim from './Claim';

const voteList = [1, 2, 3, 4];

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

      <Stack
        align='center'
        sx={() => ({
          width: '100%',
          justifyContent: 'center',
        })}
      >
        <SimpleGrid
          cols={isBreakpointXs ? 2 : 4}
          spacing={isBreakpointXs ? 10 : isBreakpointLg ? 60 : 30}
          sx={(theme) => ({
            width: '100%',
          })}
        >
          {voteList.map((item, index) => {
            return (
              <Center
                key={`team_${index}`}
                sx={(theme) => ({
                  cursor: 'pointer',
                  transform: 'scale(1)',
                  transition: 'transform 0.1s linear 0s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.1s linear 0s',
                  },
                })}
              >
                <MImage src={`/vote/vote-${item}.png`}></MImage>
              </Center>
            );
          })}
        </SimpleGrid>
        <Stack
          align='center'
          spacing={8}
          sx={(theme) => ({
            marginTop: '40px',
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
              borderRadius: '2px',
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
      </Stack>
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
      <Mechanism fifaInfo={recentFifa} />
      <Claim contract={contract} fifaInfo={recentFifa} boardList={boardList} />
      {/* <Vote /> */}
      {/* <About /> */}
      {/* <Partner /> */}
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          line-height: 24px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
