/* eslint-disable import/no-relative-packages */
import React, { useEffect, useState } from "react";
import { Group, Button } from "@mantine/core";
import { Logo } from "../../Logo/Logo";
import useStyles from "./HeaderDesktop.styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { scrollToAnchor } from "src/common/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function HeaderDesktop() {
  const { classes } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState("");

  useEffect(() => {
    const customLink = () => {
      if (router.pathname === "/") {
        scrollToAnchor(active);
      } else {
        router.push("/");
      }
    };
    customLink();
  }, [active]);

  return (
    <div className={classes.header} id="nav">
      <div className={classes.mainSection}>
        <div className={classes.logoWrapper}>
          <div className={classes.logo}>
            <Logo />
          </div>
        </div>
      </div>

      <Group spacing="xl">
        <Button
          onClick={() => {
            setActive("mint");
          }}
          className={
            router.pathname === "/" && active === "mint"
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Mint
        </Button>

        <Button
          onClick={() => setActive("mechanism")}
          className={
            router.pathname === "/" && active === "mechanism"
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Mechanism
        </Button>
        <Button
          onClick={() => setActive("claim")}
          className={
            router.pathname === "/" && active === "claim"
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Claim
        </Button>
        <Button
          onClick={() => setActive("vote")}
          className={
            router.pathname === "/" && active === "vote"
              ? classes.menuItemSelected
              : classes.menuItem
          }
        >
          Vote
        </Button>
        <Link href="/about">
          <Button
            onClick={() => setActive('')}
            className={
              router.pathname === "/about"
                ? classes.menuItemSelected
                : classes.menuItem
            }
          >
            My NFT
          </Button>
        </Link>
      </Group>

      <Group spacing="lg">
        <ConnectButton
          accountStatus="address"
          chainStatus="icon"
          showBalance={false}
        ></ConnectButton>
      </Group>
    </div>
  );
}
