import { Logo } from "../../Logo/Logo";
import { useRouter } from "next/router";
import useStyles from "./HeaderMobile.styles";
import { IconArrowRight } from "@tabler/icons";
import { scrollToAnchor } from "src/common/utils";
import React, { useState, useEffect } from "react";
import { Burger, Drawer, Group, Divider, UnstyledButton } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface HeaderProps {
  navbarOpened: boolean;
  toggleNavbar(): void;
}

export function HeaderMobile({ navbarOpened, toggleNavbar }: HeaderProps) {
  const { classes } = useStyles();
  const [drawerStatus, setDrawerStatus] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState("");

  useEffect(() => {
    const customLink = () => {
      if (router.pathname === "/") {
        scrollToAnchor(active, true);
      } else {
        router.push("/");
      }
    };
    if (active) {
      customLink();
    }
  }, [active]);

  const drawerListEnum = {
    Mint: "mint",
    Mechanism: "mechanism",
    Claim: "claim",
    Vote: "vote",
  };
  const generateDrawerListItem = () => {
    return (
      <div className={classes.drawerList}>
        {Object.keys(drawerListEnum).map((listKey: string) => (
          <div key={listKey}>
            <div
              className={classes.drawerListItem}
              onClick={() => {
                setActive(drawerListEnum[listKey]);
                setDrawerStatus(false);
              }}
            >
              <UnstyledButton>
                <span className={classes.drawerListItemText}>{listKey}</span>
              </UnstyledButton>
              <IconArrowRight color="#555" size={24} />
            </div>
            <Divider />
          </div>
        ))}
        <div>
          <div
            className={classes.drawerListItem}
            onClick={() => {
              setActive("");
              setDrawerStatus(false);
              router.push("/nft");
            }}
          >
            <UnstyledButton>
              <span className={classes.drawerListItemText}>My NFT</span>
            </UnstyledButton>
            <IconArrowRight color="#555" size={24} />
          </div>
          <Divider />
        </div>
      </div>
    );
  };
  return (
    <div className={classes.header} id="MobileNav">
      <div className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <Group spacing="lg">
          <ConnectButton
            accountStatus="address"
            chainStatus="icon"
            showBalance={false}
          />
          <Burger
            opened={navbarOpened}
            size="sm"
            onClick={() => {
              toggleNavbar();
              setDrawerStatus(true);
            }}
            aria-label="Toggle navbar"
          />
        </Group>
      </div>
      <Drawer
        opened={drawerStatus}
        onClose={() => {
          setDrawerStatus(false);
        }}
        title={<Logo />}
        padding="xl"
        size="lg"
        position="right"
        styles={{ drawer: { backgroundColor: "#f3f7ff" } }}
      >
        {generateDrawerListItem()}
      </Drawer>
    </div>
  );
}
