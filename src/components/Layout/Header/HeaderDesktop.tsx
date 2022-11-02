/* eslint-disable import/no-relative-packages */
import React, { useEffect, useState } from 'react';
import { Group, Button, UnstyledButton } from '@mantine/core';
import { Logo } from '../../Logo/Logo';
import useStyles from './HeaderDesktop.styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { scrollToAnchor } from 'src/common/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function HeaderDesktop() {
  const { classes } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState('');

  useEffect(() => {
    const customLink = () => {
      if (router.pathname === '/') {
        scrollToAnchor(active);
      } else {
        router.push('/');
      }
    };
    if (active) {
      customLink();
    }
  }, [active]);

  return (
    <div className={classes.header} id='nav'>
      <div className={classes.mainSection}>
        <div className={classes.logoWrapper}>
          <div className={classes.logo}>
            <Logo />
          </div>
        </div>
      </div>

      <Group spacing={70}>
        <UnstyledButton
          onClick={() => {
            setActive('mint');
          }}
          className={
            router.pathname === '/' && active === 'mint'
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Mint
        </UnstyledButton>

        <UnstyledButton
          onClick={() => setActive('mechanism')}
          className={
            router.pathname === '/' && active === 'mechanism'
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Mechanism
        </UnstyledButton>
        <UnstyledButton
          onClick={() => setActive('claim')}
          className={
            router.pathname === '/' && active === 'claim'
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Claim
        </UnstyledButton>
        <UnstyledButton
          onClick={() => setActive('vote')}
          className={
            router.pathname === '/' && active === 'vote'
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Vote
        </UnstyledButton>
        <Link href='/nft'>
          <a>
            <UnstyledButton
              onClick={() => setActive('')}
              className={
                router.pathname === '/nft'
                  ? classes.menuItemSelected
                  : classes.menuItem
              }
            >
              My NFT
            </UnstyledButton>
          </a>
        </Link>
      </Group>

      <Group spacing='lg'>
        <ConnectButton
          accountStatus='address'
          chainStatus='icon'
          showBalance={false}
        ></ConnectButton>
      </Group>
    </div>
  );
}
