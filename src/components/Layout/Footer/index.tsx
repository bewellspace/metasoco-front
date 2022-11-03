import { Box, Group, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';

const Footer = () => {
  const isPC = useMediaQuery('(min-width: 992px)');
  return (
    <Box style={{ backgroundColor: '#ccdaf6' }}>
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
            padding: '3rem 2rem',
            width: '100%',
            flexDirection: 'row',
          },
        })}
      >
        <Box
          sx={() => ({
            paddingRight: '40px',
            borderRight: '1px solid #2F57D9',
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
              <Image src='/icon/icon-os1.png' width={25} height={26}></Image>
            </UnstyledButton>
          </Group>
        </Box>
      </Group>
    </Box>
  );
};

export default Footer;
