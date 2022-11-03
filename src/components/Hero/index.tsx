import {
  Box,
  Group,
  Stack,
  Text,
  Image as MImage,
  BackgroundImage,
} from '@mantine/core';
import { Parallax } from 'rc-scroll-anim';
import React from 'react';
import { useMediaQuery } from '@mantine/hooks';

const Hero = () => {
  const isBreakpointLg = useMediaQuery('(min-width: 1201px)');
  return (
    <div id='home'>
      <BackgroundImage src='/hero-bg.png'>
        <Stack
          align='center'
          spacing={0}
          sx={(theme) => ({
            width: '100%',
            paddingTop: '100px',
            [theme.fn.smallerThan('xs')]: {
              paddingTop: '160px'
            }
          })}
        >
          <Box
            sx={(theme) => ({
              width: '55vw',
              [theme.fn.smallerThan('md')]: {
                width: '70vw',
              },
              [theme.fn.smallerThan('xs')]: {
                width: '90vw',
              },
              [theme.fn.largerThan('lg')]: {
                width: '45vw'
              }
            })}
          >
            <MImage src='/hero.png'></MImage>
          </Box>
          <Stack
            sx={(theme) => ({
              width: '100%',
              minHeight: '700px',
              position: 'relative',
            })}
          >
            <Text
              align='center'
              color='#F8D648'
              size={26}
              sx={() => ({
                padding: '0 20px',
                lineHeight: 1,
                fontFamily: 'BalooBhaina',
                textShadow: '0px 5px 5px #000000',
              })}
            >
              Get your NFT team, win the final prize pool!
            </Text>
            <Text
              align='center'
              color='#FCFAFA'
              size={18}
              sx={() => ({
                padding: '0 20px',
                fontFamily: 'Balthazar-Regular',
                lineHeight: 1
              })}
            >
              Metasoco is a bridge between football fans and crypto users.
              Metasoco produces NFTs for 32 World Cup teams
            </Text>
            <Box
              sx={(theme) => ({
                height: '650px',
                padding: '70px 0',
                width: '100%',
                overflow: 'hidden',
                marginTop: '-40px',
                [theme.fn.smallerThan('md')]: {
                  padding: '20px 0',
                  height: '550px',
                  marginTop: '0',
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
                        sx={() => ({
                          boxShadow: '7px 6px 6px rgba(0, 0, 0, 0.17)',
                        })}
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
                        sx={() => ({
                          boxShadow: '7px 6px 6px rgba(0, 0, 0, 0.17)',
                        })}
                      ></MImage>
                    );
                  })}
                </Group>
              </Parallax>
            </Box>
          </Stack>
        </Stack>
      </BackgroundImage>
    </div >
  );
};

export default Hero;
