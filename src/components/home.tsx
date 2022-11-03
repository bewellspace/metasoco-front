import {
  Stack,
  Text,
  UnstyledButton,
  Image as MImage,
  Center,
  SimpleGrid,
  BackgroundImage,
} from '@mantine/core';
import { NextPage } from 'next';
import { FifaInfo } from 'src/types';
import React, { useState, useEffect } from 'react';
import { useSiteStyles } from 'src/theme';
import { useMediaQuery } from '@mantine/hooks';
import Mint from './Mint';
import Hero from './Hero';
import Mechanism from './Mechanism';
import Claim from './Claim';
import Invite from './Invite'
import LearderBoard from './LearderBoard'

const voteList = [1, 2, 3, 4];

const Vote = () => {
  const { classes } = useSiteStyles();
  const isBreakpointXs = useMediaQuery('(max-width: 576px)');
  const isBreakpointLg = useMediaQuery('(min-width: 1201px)');
  return (
    <BackgroundImage src='/vote/vote-bg.jpg'>
      <Stack
        id='vote'
        align='center'
        spacing={30}
        sx={(theme) => ({
          padding: '60px 110px 100px',
          [theme.fn.smallerThan('md')]: {
            padding: '60px 10px',
          },
        })}
      >
        <Text align='center' className={classes.heroTitle}>
          Vote
        </Text>
        <Text color='#FDFBFB' align='center' className={classes.modelTips}>
          Top 4 hot team
        </Text>

        <Stack
          align='center'
          mt={10}
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
                    }
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
              color='#FCF9F9'
              sx={(theme) => ({
                fontSize: '12px',
                fontFamily: 'Balthazar-Regular',
                [theme.fn.largerThan('md')]: {
                  fontSize: '14px',
                },
                [theme.fn.largerThan('lg')]: {
                  fontSize: '16px'
                }
              })}
            >
              Vote from our commutity
            </Text>
            <UnstyledButton
              onClick={() => window.open('http://t.me/theaetherofficial')}
              sx={(theme) => ({
                background: 'linear-gradient(#f7c943, #ea6222, #e46a24)',
                padding: '14px 40px',
                fontSize: '20px',
                position: 'relative',
                textAlign: 'center',
                color: '#f8f9fa',
                fontFamily: 'Balthazar-Regular',
                borderRadius: '8px',
                lineHeight: 1,
                boxShadow: '2px 6px 2px rgba(9, 2, 4, 0.5)',
                '&:hover': {
                  background: 'linear-gradient(#f58e30, #f22319)',
                },
              })}
            >
              Join to vote!
              <MImage
                style={{ position: 'absolute', bottom: '-14px', right: '-7px' }}
                src='/icon/icon-mouse.png'
                width={30}
                height={26}
              ></MImage>
            </UnstyledButton>
          </Stack>
        </Stack>
      </Stack>
    </BackgroundImage>

  );
};

const About = () => {
  const { classes } = useSiteStyles();
  return (
    <div id="about">
      <BackgroundImage src='/about-bg.jpg'>
        <Stack
          id='about'
          align='center'
          spacing={40}
          sx={(theme) => ({
            padding: '80px 130px',
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
              fontSize: '18px',
              lineHeight: '30px',
              color: '#FEFDFA',
              fontFamily: 'Balthazar-Regular',
              width: '70%',
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
            <br />
            Metasoco, a metaverse platform for football fans under the Aether,
            provides a web3 metaverse platform for global football fans to socialize
            and play games. Metasoco is the bridge between soccer lovers and crypto
            users. There will also be more games and crypto-related features that
            engage our users. We are building a full-stack Metaverse that enables
            players to enter our ecosystem and be rewarded from their NFTs with
            play-to-earn games.
          </Text>
        </Stack>
        <Stack
          id='partner'
          align='center'
          spacing={60}
          sx={(theme) => ({
            padding: '80px 130px 120px',
            [theme.fn.smallerThan('xs')]: {
              padding: '60px 0px 60px 10px',
            },
          })}
        >
          <Text align='center' className={classes.heroTitle}>
            Partners ＆Supporters
          </Text>
          <SimpleGrid cols={3}
            spacing={20}
            sx={(theme) => ({
              width: '70%',
              [theme.fn.smallerThan('xs')]: {
                width: '100%'
              }
            })}>
            <MImage src='/partner-1.png'></MImage>
            <MImage src='/partner-2.png'></MImage>
            <MImage src='/partner-3.png' sx={() => ({
              cursor: 'pointer'
            })} onClick={() => window.open('https://www.aether.place/')}></MImage>

          </SimpleGrid>

        </Stack>
      </BackgroundImage>
    </div>

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
      <Invite contract={contract} />
      <LearderBoard boardList={boardList} />
      <Vote />
      <About />
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
