import { Box, Group, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';

const Footer = () => {
  const isPC = useMediaQuery('(min-width: 992px)');
  return (
    <Box style={{ backgroundColor: '#12250b' }}>
      <Group
        sx={(theme) => ({
          padding: '3rem 0rem',
          marginTop: '10rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '80vw',
          margin: '0 auto',
          [theme.fn.smallerThan('md')]: {
            padding: '3rem 1rem',
            width: '100%',
            flexDirection: 'row',
          },
        })}
      >
        <Box
          onClick={() => window.open('https://www.aether.place/')}
          sx={(theme) => ({
            cursor: 'pointer',
            paddingRight: '40px',
            borderRight: '1px solid rgba(255, 255, 255, 0.5)',
            [theme.fn.smallerThan('xs')]: {
              paddingRight: '20px'
            }
          })}
        >
          <Image
            src='/logo2.png'
            height={isPC ? 86 : 56}
            width={isPC ? 140 : 100}
          />
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            [theme.fn.smallerThan('md')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '1.25rem',
            },
          })}
        >
          <Group spacing={10}>
            <UnstyledButton
              onClick={() => window.open('https://twitter.com/TheAether_io')}
            >
              <Image
                src='/icon/icon-twitter.png'
                width={27}
                height={22}
              ></Image>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => window.open('https://discord.gg/JqVbvfwmre')}
            >
              <Image
                src='/icon/icon-discord.png'
                width={30}
                height={28}
              ></Image>
            </UnstyledButton>
            <UnstyledButton
              onClick={() => window.open('http://t.me/theaetherofficial')}
            >
              <Image
                src='/icon/icon-telegram.png'
                width={30}
                height={28}
              ></Image>
            </UnstyledButton>
            <UnstyledButton
              onClick={() =>
                window.open('https://opensea.io/collection/metasoco')
              }
            >
              <Image src='/icon/icon-os2.png' width={30} height={30}></Image>
            </UnstyledButton>
            <UnstyledButton onClick={() => window.open('https://medium.com/@theaetherccee')}>
              <svg viewBox="0 0 1043.63 592.71" fill='#fff' height={20}><g data-name="Layer 2"><g data-name="Layer 1"><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path></g></g></svg>
            </UnstyledButton>
          </Group>
        </Box>
      </Group>
    </Box>
  );
};

export default Footer;
