import { useState, useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
  Accordion,
  Anchor,
  Box,
  CopyButton,
  Group,
  Stack,
  Text,
  UnstyledButton,
  Image as MImage,
  Center,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  SimpleGrid,
  Table,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons";
import ArtAlbum from "./photo-album/index";
import {
  becomeSponsorUrl,
  FAQ_CONTENT,
  joinTwitterUrl,
} from "../common/constants";
import { useSiteStyles } from "src/theme";
import { NextPage } from "next";
import { Tweet } from "src/types";
import Image from "next/image";

const Hero = () => {
  const { classes } = useSiteStyles();

  return (
    <Stack
      align="center"
      spacing={0}
      sx={(theme) => ({
        padding: "0",
        width: "100%",
        backgroundColor: "#fff",
      })}
    >
      <MImage src="/banner.png"></MImage>
      <Stack
        pt={22}
        pb={65}
        sx={(theme) => ({
          width: "100%",
          background: "url('/hero-bg.png') no-repeat #f3f7ff",
          backgroundSize: "60%",
          minHeight: "700px",
          backgroundPosition: "bottom right",
        })}
      >
        <Stack align="center">
          <Text align="center" className={classes.heroTitle}>
            Get your NFT team，
          </Text>
          <Text align="center" className={classes.heroTitle}>
            win the final prize pool!
          </Text>
        </Stack>
        <Stack align="center" pt={10} pb={25}>
          <Text align="center" className={classes.modelTips}>
            Meta-soco is a bridge between football fans and crypto users，
          </Text>
          <Text align="center" className={classes.modelTips}>
            win the final prize pool!
          </Text>
        </Stack>
        {/* TODO NFT滚动展示*/}
      </Stack>
    </Stack>
  );
};

const Mint = () => {
  const { classes } = useSiteStyles();
  const [value, setValue] = useState(1);
  const handlers = useRef<NumberInputHandlers>();
  return (
    <Stack
      id="mint"
      align="center"
      sx={(theme) => ({
        padding: "70px 0",
        width: "100%",
        backgroundColor: "#e3e9f5",
        fontFamily: "ale-general",
        position: "relative",
        [theme.fn.smallerThan("lg")]: {
          // padding: "30px",
        },
      })}
    >
      <Group
        spacing={40}
        position="center"
        sx={() => ({
          alignItems: "flex-start",
        })}
      >
        <Stack align="center" spacing={30}>
          <Center
            sx={() => ({
              borderRadius: "40px",
              boxShadow: "6px 6px 9px rgba(9, 2, 4, 0.5)",
            })}
          >
            <Image src="/blind-box-bg.png" width={300} height={470}></Image>
          </Center>
          <Text size={12} style={{ fontFamily: "ale-general" }}>
            NETWORK ETHEREUM
          </Text>
        </Stack>
        <Stack
          align="center"
          pt={30}
          sx={() => ({
            maxWidth: "360px",
          })}
        >
          <Text className={classes.heroTitle}>META SOCO MYSTERYBOX</Text>
          <Group>
            <span>MINTED</span>
            <span>100/3200</span>
          </Group>
          <Group>
            <span>PRICE</span>
            <span>0.05ETH</span>
          </Group>
          <Group>
            <span>AMOUNT</span>
            <Group spacing={0}>
              <ActionIcon
                size={25}
                radius="xs"
                variant="outline"
                sx={() => ({
                  borderColor: "#000",
                  borderWidth: "2px",
                })}
                onClick={() => handlers.current.decrement()}
              >
                <IconMinus color="black" size={16} />
              </ActionIcon>

              <NumberInput
                hideControls
                value={value}
                onChange={(val) => setValue(val)}
                handlersRef={handlers}
                max={5}
                min={1}
                step={1}
                styles={{
                  input: {
                    width: 30,
                    textAlign: "center",
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    color: "#000",
                    fontSize: "18px",
                    fontFamily: "ale-general",
                  },
                }}
              />

              <ActionIcon
                size={25}
                radius="xs"
                variant="outline"
                sx={() => ({
                  borderColor: "#000",
                  borderWidth: "2px",
                })}
                onClick={() => handlers.current.increment()}
              >
                <IconPlus color="black" size={16} />
              </ActionIcon>
            </Group>
          </Group>
          <Stack spacing={10}>
            <UnstyledButton
              sx={() => ({
                background: "linear-gradient(180deg, #F67C8D, #f3556B 100%)",
                width: "180px",
                height: "50px",
                textAlign: "center",
                color: "white",
                borderRadius: "50px",
                boxShadow: "4px 4px 4px rgba(107, 109, 110, 0.5)",
                transform: "scale(1)",
                transition: "transform 0.1s linear 0s",
                "&:hover": {
                  transform: "scale(0.98)",
                  transition: "transform 0.1s linear 0s",
                },
              })}
            >
              Mint Your Team
            </UnstyledButton>
            <Text align="center" style={{ fontFamily: "ale-general" }}>
              (Max mint 5x per wallet)
            </Text>
          </Stack>
          <Text align="center" size={12} style={{ fontFamily: "ale-general" }}>
            The NFTS of 32 teams will appear with equal probability, 100 for
            each team, for a total of 3200 issued.
          </Text>
          <Text align="center" size={12} style={{ fontFamily: "ale-general" }}>
            The holders of NFTS are rewarded according to the actual performance
            of each team during the World Cup 2022. The NFT values of all
            players and teams will fluctuate in real time with each game's
            performance, and the value of players and teams will directly affect
            the payoffs to holders, including holding incentives and secondary
            market trading prices.
          </Text>
        </Stack>
      </Group>
      <UnstyledButton
        sx={() => ({
          position: "absolute",
          right: "60px",
          bottom: "60px",
          transform: "scale(1)",
          transition: "transform 0.1s linear 0s",
          "&:hover": {
            transform: "scale(1.06)",
            transition: "transform 0.1s linear 0s",
          },
        })}
      >
        <Image src="/icon/icon-os.png" width={33} height={41}></Image>
      </UnstyledButton>
    </Stack>
  );
};

const mechanismList = [
  {
    name: "16 teams",
    pool: 5,
    iconScale: 1,
    active: 0,
  },
  {
    name: "8 teams",
    pool: 10,
    iconScale: 1.15,
    active: 0,
  },
  {
    name: "1/4",
    pool: 15,
    iconScale: 1.35,
    active: 0,
  },
  {
    name: "1/2",
    pool: 20,
    iconScale: 1.45,
    active: 0,
  },
  {
    name: "winner",
    pool: 50,
    iconScale: 1.65,
    active: 0,
  },
];

const Mechanism = () => {
  const { classes } = useSiteStyles();
  const isBreakpointMd = useMediaQuery("(min-width: 992px)");
  return (
    <Stack
      id="mechanism"
      align="center"
      spacing={isBreakpointMd ? 50 : "sm"}
      sx={(theme) => ({
        padding: "60px 70px 40px",
        position: "relative",
        overflow: "hidden",
        background: "url('/mechanism-bg.png') no-repeat #d8e2f7",
        backgroundPosition: "left bottom",
        [theme.fn.largerThan("md")]: {
          // padding: "50px 0px 80px",
        },
      })}
    >
      <Stack align="center" spacing={25}>
        <Text align="center" className={classes.heroTitle}>
          THE MECHANISM
        </Text>
        <Text align="center" className={classes.heroTitle}>
          NFTS are the core of meta-universe props and entertainment
        </Text>
        <Center
          sx={(theme) => ({
            width: "235px",
            height: "50px",
            backgroundColor: "#f3546a",
            color: "#fbf9f9",
            boxShadow: "3px 3px 2px rgba(3, 127, 204, 0.5)",
          })}
        >
          Current pool: 30ETH
        </Center>
      </Stack>
      <SimpleGrid cols={2} spacing={45}>
        <Stack align={"center"} spacing={25} px={35}>
          <Text align="center" className={classes.heroTitle}>
            How to play?
          </Text>
          <Text align="center" size={12}>
            The project party retains 20% of the sales revenue as
            <br />
            operating expenses, and 80% of the total revenue is
            <br /> returned to NFT holders in the form of rewards.
          </Text>
          <Text align="center" size={12}>
            There are five stages of the season: 32 into 16,
            <br />
            16 into 8,8 into 4,4 into 2, the finals. <br />
            Each winning team NFT will enter the next
            <br />
            round of the rewards pool, which will be awarded
            <br /> 5%, 10%, 15%, and 20% of the total bonus pool, respectively.
            <Text color={"#eb3f3f"}>
              The champion team NFT will receive 50% of the total sales revenue.
            </Text>
          </Text>
          <Text size={12} align="center">
            <Text color="#f6b35c">As a member of NFT holder you recieve:</Text>
            NFT sales revenue awards
            <br />
            Community access
            <br />
            Airdrops
            <br />
            Regular Giveaways
            <br />
            metaverse ticket
            <br />
            Much more ...
          </Text>
        </Stack>
        <Stack
          spacing={25}
          align="center"
          sx={() => ({
            width: "450px",
            padding: "25px 0 30px",
            backgroundColor: "#c3d2ef",
            borderRadius: "25px",
          })}
        >
          <Group spacing={40} sx={() => ({})}>
            <Center
              sx={() => ({
                width: "120px",
                height: "33px",
                opacity: 0,
              })}
            >
              0% in the pool
            </Center>
            <Group
              sx={() => ({
                opacity: 0,
              })}
            >
              <Center
                sx={() => ({
                  width: "26px",
                  height: "20px",
                })}
              >
                <MImage src="/icon/icon-bag.png"></MImage>
              </Center>

              <Image src="/icon/icon-right.png" width={22} height={18}></Image>
            </Group>
            <Stack
              align={"center"}
              justify="flex-start"
              spacing={0}
              sx={() => ({
                position: "relative",
              })}
            >
              <Center
                sx={() => ({
                  width: "72px",
                  height: "28px",
                  borderRadius: "28px",
                  fontSize: "13px",
                  color: "#fdfcfc",
                  backgroundColor: "#f7b04d",
                  border: "1px solid #ad8edc",
                  boxShadow: "2px 2px 2px rgba(161, 181, 226, 0.75)",
                })}
              >
                32 teams
              </Center>

              <MImage
                sx={() => ({
                  position: "absolute",
                  top: "34px",
                })}
                src="/icon/icon-down1.png"
                width={8}
                height={16}
              ></MImage>
            </Stack>
          </Group>

          {mechanismList.map((item, index) => {
            return (
              <Group spacing={40} key={`item_${index}`} sx={() => ({})}>
                <Center
                  sx={() => ({
                    width: "120px",
                    height: "33px",
                    backgroundColor: "#bb9ce9",
                    color: "#fdfcfc",
                    fontSize: "13px",
                    boxShadow: "2px 2px 2px rgba(161, 181, 226, 0.75)",
                  })}
                >
                  {item.pool}% in the pool
                </Center>
                <Group>
                  <Center
                    sx={() => ({
                      width: "26px",
                      height: "20px",
                      transform: `scale(${item.iconScale})`,
                    })}
                  >
                    <MImage src="/icon/icon-bag.png"></MImage>
                  </Center>

                  <Image
                    src="/icon/icon-right.png"
                    width={22}
                    height={18}
                  ></Image>
                </Group>
                <Stack
                  align={"center"}
                  justify="flex-start"
                  spacing={0}
                  sx={() => ({
                    position: "relative",
                  })}
                >
                  <Center
                    sx={() => ({
                      width: "72px",
                      height: "28px",
                      borderRadius: "28px",
                      fontSize: "13px",
                      color: "#fdfcfc",
                      backgroundColor:
                        item.active === 0 ? "#bb9ce9" : "#f7b04d",
                      border: "1px solid #ad8edc",
                      boxShadow: "2px 2px 2px rgba(161, 181, 226, 0.75)",
                    })}
                  >
                    {item.name}
                  </Center>
                  {item.name !== "winner" && (
                    <MImage
                      sx={() => ({
                        position: "absolute",
                        top: "34px",
                      })}
                      src={
                        item.active === 0
                          ? "/icon/icon-down2.png"
                          : "/icon/icon-down1.png"
                      }
                      width={8}
                      height={16}
                    ></MImage>
                  )}
                </Stack>
              </Group>
            );
          })}
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];
const Claim = ({ avatars = [], count }) => {
  const isPC = useMediaQuery("(min-width: 992px)");
  const { classes } = useSiteStyles();
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td style={{ borderColor: "#ccdaf6" }}>{element.position}</td>
      <td style={{ borderColor: "#ccdaf6" }}>{element.name}</td>
      <td style={{ borderColor: "#ccdaf6" }}>{element.symbol}</td>
    </tr>
  ));
  return (
    <div id="claim">
      <Stack
        align={"center"}
        spacing={40}
        sx={(theme) => ({
          padding: "65px 0",
          background: "url('/claim-bg.png') no-repeat #e3e9f5",
          backgroundPositionY: "60px",
        })}
      >
        <Stack align="center">
          <Text className={classes.heroTitle}>GET YOUR REWARD</Text>
          <Text className={classes.heroTitle}>
            If your team wins the match, you can claim the reward from pool
          </Text>
        </Stack>
        <Anchor href="https://mantine.dev/" target="_blank">
          <Text underline color="#9d9d9d" style={{ fontFamily: "ale-general" }}>
            Click here to check the match information
          </Text>
        </Anchor>
        <Stack align="center" spacing={35}>
          <Text
            align="center"
            color="#de3e3e"
            style={{ fontFamily: "ale-general" }}
          >
            Countdown to next reward
          </Text>
          <Group
            spacing={50}
            sx={() => ({
              fontSize: "24px",
            })}
          >
            <Center
              sx={() => ({
                width: "160px",
                height: "160px",
                background: "url('/countdown.png') no-repeat",
                backgroundSize: "contain",
              })}
            >
              3day
            </Center>
            <Center
              sx={() => ({
                width: "160px",
                height: "160px",
                background: "url('/countdown.png') no-repeat",
                backgroundSize: "contain",
              })}
            >
              6h
            </Center>
            <Center
              sx={() => ({
                width: "160px",
                height: "160px",
                background: "url('/countdown.png') no-repeat",
                backgroundSize: "contain",
              })}
            >
              3min
            </Center>
          </Group>
        </Stack>

        <Stack
          align="center"
          spacing={15}
          sx={() => ({
            position: "relative",
            left: "40px",
          })}
        >
          <Group>
            <Center>
              <Text className={classes.underLine}>My NFT Team Amount: 3</Text>
            </Center>
            <UnstyledButton
              className={classes.claimButton}
              style={{ opacity: 0 }}
            >
              Claim
            </UnstyledButton>
          </Group>
          <Group>
            <Center>
              <Text className={classes.underLine}>My NFT Reward: 0.5ETH</Text>
            </Center>
            <UnstyledButton className={classes.claimButton}>
              Claim
            </UnstyledButton>
          </Group>
          <Group>
            <Center>
              <Text className={classes.underLine}>
                My Invite Reward: 0.5ETH
              </Text>
            </Center>
            <UnstyledButton className={classes.claimButton}>
              Claim
            </UnstyledButton>
          </Group>
        </Stack>

        <Group spacing={0} mt={30}>
          <Stack
            align="center"
            justify="center"
            sx={() => ({
              zIndex: 2,
              width: "440px",
              height: "175px",
              borderRadius: "30px",
              padding: "0 28px",
              color: "#fff",
              background:
                "linear-gradient(90deg, #d11d55 5%, #ff044f 20%, #2d0a59)",
            })}
          >
            <Text align="center">
              Invite friends, <br />
              get rewards together!
              <br />
              Your invite link:
            </Text>
            <Group
              position="center"
              pt={10}
              spacing={8}
              sx={() => ({
                width: "100%",
                borderTop: "1px solid #bfbfbf",
              })}
            >
              <Box
                sx={() => ({
                  width: "280px",
                  padding: "4px 20px",
                  lineHeight: "16px",
                  fontSize: "12px",
                  textAlign: "center",
                  border: "1px solid #555555",
                })}
              >
                https://www.minecraft.net/zh-
                hans/realms/invite-using-share-links
              </Box>
              <CopyButton value="https://mantine.dev">
                {({ copied, copy }) => (
                  <UnstyledButton
                    onClick={copy}
                    sx={() => ({
                      transition: "transform 0.1s linear 0s",
                      fontFamily: "ale-general",
                      "&:hover": {
                        transform: "scale(0.96)",
                        transition: "transform 0.1s linear 0s",
                      },
                    })}
                  >
                    <Image
                      src="/icon/icon-copy.png"
                      width={24}
                      height={24}
                    ></Image>
                  </UnstyledButton>
                )}
              </CopyButton>
            </Group>
          </Stack>
          <Center
            sx={() => ({
              width: "390px",
              height: "160px",
              backgroundColor: "#becbe6",
              position: "relative",
              left: "-20px",
              zIndex: 1,
            })}
          >
            <Text
              align="center"
              size={13}
              style={{ lineHeight: "28px", fontFamily: "ale-general" }}
            >
              If the invitee's NFT team wins, the inviter
              <br />
              receives <span style={{ color: "#f3261f" }}>10%</span> of the
              invitee's income.
              <br />
              Users who make a purchase through an
              <br />
              invitation link get <span style={{ color: "#f3261f" }}>
                20%
              </span>{" "}
              off Mint prices.
            </Text>
          </Center>
        </Group>
      </Stack>
      <Stack
        align="center"
        spacing={20}
        sx={() => ({
          background: "url('/board-bg.png') no-repeat #ccdaf6",
          backgroundPosition: 'left bottom',
          padding: "50px 0",
        })}
      >
        <Text className={classes.heroTitle}>LEARDERBOARD</Text>
        <Box
          sx={() => ({
            padding: "20px",
            borderRadius: '25px',
            minWidth: "735px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          })}
        >
          <Table
            horizontalSpacing="xl"
            verticalSpacing="sm"
            sx={() => ({
              color: "#000",
              fontFamily: "ale-general",
            })}
          >
            <thead>
              <tr>
                <th
                  style={{
                    color: "#000",
                    borderColor: "#ccdaf6",
                  }}
                >
                  Address
                </th>
                <th
                  style={{
                    color: "#000",
                    borderColor: "#ccdaf6",
                  }}
                >
                  NFT Number
                </th>
                <th
                  style={{
                    width: '25%',
                    color: "#000",
                    borderColor: "#ccdaf6",
                  }}
                >
                  Rewards Claimed
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Box>
      </Stack>
    </div>
  );
};

const FAQs = () => {
  const { classes } = useSiteStyles();
  return (
    <Stack>
      <Text color="white" align="center" className={classes.heroTitle}>
        FAQs
      </Text>
      <Box
        sx={(theme) => ({
          padding: "0 1rem",
          [theme.fn.largerThan("md")]: {
            width: "70vw",
            margin: "0 auto",
          },
        })}
      >
        <Accordion>
          {Object.keys(FAQ_CONTENT).map((faqKey, index) => (
            <Accordion.Item
              value={String(index)}
              className="faq-item"
              key={`${faqKey}_${String(index)}`}
            >
              <Accordion.Control>
                <Text weight={600} color="white">
                  {String(faqKey)}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text weight={400}>{FAQ_CONTENT[faqKey]}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Box>
    </Stack>
  );
};

const HomePage: NextPage<{
  tweets: Tweet[];
  avatars: Array<{ avatar: string }>;
  count: number;
}> = ({ tweets, avatars, count }) => {
  return (
    <div className="container">
      <Hero />
      <Mint />
      <Mechanism />
      <Claim avatars={avatars} count={count} />
      <FAQs />
      <style jsx>{`
        .container {
          padding-top: 60px;
          width: 100%;
          height: 100%;
          line-height: 24px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
