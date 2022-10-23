import {
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
import Image from "next/image";
import { NextPage } from "next";
import { FifaInfo } from "src/types";
import { Parallax } from "rc-scroll-anim";
import { useState, useRef, useEffect } from "react";
import { useSiteStyles } from "src/theme";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus, IconMinus } from "@tabler/icons";
import {
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "src/abi/abi.json";
import { ethers } from "ethers";

const Hero = () => {
  const { classes } = useSiteStyles();
  const [windowWidth, setWidth] = useState(0);
  useEffect(() => {
    setWidth(document.body.clientWidth);
  }, []);

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
          position: "relative",
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
        <div
          style={{
            height: "650px",
            padding: "70px 0",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Parallax
            animation={{ x: 0, rotate: -5 }}
            style={{
              transform: "translateX(-100px) rotate(-5deg)",
              margin: "30px auto",
            }}
            className="code-box-left"
          >
            <Group
              sx={() => ({
                flexWrap: "nowrap",
              })}
            >
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
            </Group>
          </Parallax>
          <Parallax
            animation={{ x: -100, rotate: -5 }}
            style={{
              transform: "translateX(0) rotate(-5deg)",
              margin: "30px auto",
            }}
            className="code-box-right"
          >
            <Group
              sx={() => ({
                flexWrap: "nowrap",
              })}
            >
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
              <MImage width={150} src="/1.png"></MImage>
            </Group>
          </Parallax>
        </div>
      </Stack>
    </Stack>
  );
};

const Mint = ({ contract }) => {
  const { address } = useAccount();
  const { classes } = useSiteStyles();
  const [value, setValue] = useState(1);
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalNumber, setTotalNumber] = useState("0");
  const handlers = useRef<NumberInputHandlers>();

  useEffect(() => {
    if (contract.signer) {
      init();
    }
  }, [contract]);

  const init = async () => {
    const nftPrice = await contract.PRICE();
    setPrice(nftPrice.toString() / Math.pow(10, 18));
    checkActive();
  };

  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "totalSupply",
    watch: true,
    onSuccess: (data) => {
      setTotalNumber(data.toString());
    },
  });

  const checkActive = async () => {
    const isActive = await contract.saleIsActive();
    setIsActive(isActive);
    return isActive;
  };

  const mintBox = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "mintFifaNftBox",
    enabled: !!value && !!price && isActive,
    args: [value, "0x0000000000000000000000000000000000000000"],
    overrides: {
      from: address,
      value: ethers.utils.parseEther((value * price).toString()),
    },
  });
  const mintWrite = useContractWrite(mintBox.config);

  useWaitForTransaction({
    hash: mintWrite.data?.hash,
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  const triggerMint = async () => {
    if (isActive) {
      mintWrite?.write();
    } else {
      const active = await checkActive();
      if (active) {
        mintWrite?.write();
      } else {
      }
    }
  };

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
            <span>{totalNumber}/3200</span>
          </Group>
          <Group>
            <span>PRICE</span>
            <span>{price}ETH</span>
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
              onClick={() => triggerMint()}
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

const Mechanism = ({ contract, fifaInfo }) => {
  const { classes } = useSiteStyles();
  const isBreakpointMd = useMediaQuery("(min-width: 992px)");

  const [totalRewardPool, setTotalRewardPool] = useState(0);

  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "totalRewardPool",
    watch: true,
    onSuccess: (data) => {
      setTotalRewardPool(Number(data.toString()) / Math.pow(10, 18));
    },
  });

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
          Current pool: {totalRewardPool}ETH
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
let timer: any = null;
const Claim = ({ contract, fifaInfo }) => {
  const { address } = useAccount();

  const [nftNumber, setNftNumber] = useState(0);
  const [userTotalReward, setUserTotalReward] = useState(0);
  const [recommenderReward, setRecommenderReward] = useState(0);
  const [countDownString, setCountDown] = useState([0, 0, 0]);

  const isPC = useMediaQuery("(min-width: 992px)");
  const { classes } = useSiteStyles();

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td style={{ borderColor: "#ccdaf6" }}>{element.position}</td>
      <td style={{ borderColor: "#ccdaf6" }}>{element.name}</td>
      <td style={{ borderColor: "#ccdaf6" }}>{element.symbol}</td>
    </tr>
  ));

  useEffect(() => {
    if (contract.signer) {
      init();
    }
  }, [contract]);

  const init = async () => {
    const myNft = await contract.userTokenIds();
    setNftNumber(myNft.length);
    const calculateReward = await contract.calculateReward();
    setUserTotalReward(
      calculateReward.userTotalReward.toString() / Math.pow(10, 18)
    );
    setRecommenderReward(
      calculateReward.recommenderReward.toString() / Math.pow(10, 18)
    );
  };

  useEffect(() => {
    if (fifaInfo.id) {
      let endDay = new Date(`${fifaInfo.time}.000Z`);
      countDown(endDay);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [fifaInfo]);

  const countDown = (eventTime) => {
    clearTimeout(timer);
    timer = null;
    const now = new Date().getTime();
    const diffTime = eventTime - now;
    let a = 6e4,
      o = 36e5,
      s = 24 * o;

    if (diffTime > 0) {
      // console.log('diffTime', diffTime);
      const day = Math.floor(diffTime / s),
        hours = Math.floor((diffTime % s) / o),
        minite = Math.floor((diffTime % o) / a);

      setCountDown([day, hours, minite]);
      timer = setTimeout(() => {
        countDown(eventTime);
      }, 1000);
    } else {
      clearTimeout(timer);
      timer = null;
    }
  };

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
        <Anchor
          href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022/countdown-to-qatar-2022"
          target="_blank"
        >
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
              {countDownString[0]}day
            </Center>
            <Center
              sx={() => ({
                width: "160px",
                height: "160px",
                background: "url('/countdown.png') no-repeat",
                backgroundSize: "contain",
              })}
            >
              {countDownString[1]}h
            </Center>
            <Center
              sx={() => ({
                width: "160px",
                height: "160px",
                background: "url('/countdown.png') no-repeat",
                backgroundSize: "contain",
              })}
            >
              {countDownString[2]}min
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
              <Text className={classes.underLine}>
                My NFT Team Amount: {nftNumber}
              </Text>
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
              <Text className={classes.underLine}>
                My NFT reward: {userTotalReward}ETH
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
              padding: "0 28px",
              color: "#fff",
              background: "url('/card-bg.png') no-repeat",
              backgroundSize: "contain",
            })}
          >
            <Text align="center" className={classes.modelTips}>
              Invite friends,
            </Text>
            <Text align="center" className={classes.modelTips}>
              get rewards together!
            </Text>
            <Stack
              spacing={10}
              pt={10}
              sx={() => ({
                width: "100%",
                borderTop: "1px solid #bfbfbf",
              })}
            >
              <Text align="center" className={classes.modelTips}>
                Your invite link:
              </Text>
              <Group position="center" spacing={8}>
                <Box
                  sx={() => ({
                    width: "280px",
                    wordBreak: "break-all",
                    padding: "4px 20px",
                    lineHeight: "16px",
                    fontSize: "12px",
                    textAlign: "center",
                    border: "1px solid #555555",
                  })}
                >
                  {address ? (
                    <>
                      {nftNumber > 0
                        ? `${window.location.href}${address}`
                        : "There is no token in your wallet"}
                    </>
                  ) : (
                    <UnstyledButton>connect wallect</UnstyledButton>
                  )}
                </Box>
                {!!address && nftNumber > 0 && (
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
                )}
              </Group>
            </Stack>
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
        <Stack align="center" spacing={14}>
          <Text
            size={13}
            color="#010101"
            style={{
              lineHeight: "25px",
              fontFamily: "ale-general",
              borderBottom: "1px solid #010101",
            }}
          >
            Awards for invitations already received : {recommenderReward} ETH
          </Text>
          <Text
            size={12}
            color="#8e8e8d"
            style={{
              lineHeight: 1,
              fontFamily: "ale-general",
            }}
          >
            Automatically transferred to wallet, check on{" "}
            <UnstyledButton
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_BROWSER_DOMAIN}/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`
                );
              }}
              sx={() => ({
                fontSize: "12px",
                color: "#0e32b6",
                fontFamily: "ale-general",
              })}
            >
              ETHSCAN
            </UnstyledButton>
          </Text>
        </Stack>
      </Stack>
      <Stack
        align="center"
        spacing={20}
        sx={() => ({
          background: "url('/board-bg.png') no-repeat #ccdaf6",
          backgroundPosition: "left bottom",
          padding: "50px 0",
        })}
      >
        <Text className={classes.heroTitle}>LEARDERBOARD</Text>
        <Box
          sx={() => ({
            padding: "20px",
            borderRadius: "25px",
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
                    width: "25%",
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

const Vote = () => {
  const { classes } = useSiteStyles();
  return (
    <Stack
      id="vote"
      align="center"
      spacing={25}
      sx={() => ({
        padding: "60px 110px 100px",
        background: "#e3e9f5",
      })}
    >
      <Text align="center" className={classes.heroTitle}>
        Vote
      </Text>
      <Text color="#555555" align="center" className={classes.modelTips}>
        Top 4 hot team
      </Text>
      <Group
        align="center"
        sx={() => ({
          width: "100%",
          justifyContent: "center",
        })}
      >
        <SimpleGrid
          cols={2}
          spacing={30}
          sx={() => ({
            width: "50%",
          })}
        >
          <Group spacing={10}>
            <Box
              sx={() => ({
                border: "2px solid #f7b04d",
                padding: "2px",
              })}
            >
              <Box
                sx={() => ({
                  border: "2px solid #f3546a",
                  padding: "2px",
                })}
              >
                <MImage
                  width={200}
                  height={260}
                  src="https://cloudinary.fifa.com/transform/89f905e3-ebcd-439b-a99f-0c8a9288c50d/Japan-v-Ecuador-International-Friendly"
                ></MImage>
              </Box>
            </Box>
            <Image src="/icon/icon-top1.png" width={45} height={58}></Image>
          </Group>
          <Group spacing={10} style={{ position: "relative", top: "40px" }}>
            <Box
              sx={() => ({
                border: "2px solid #f7b04d",
                padding: "2px",
              })}
            >
              <Box
                sx={() => ({
                  border: "2px solid #f3546a",
                  padding: "2px",
                })}
              >
                <MImage
                  width={200}
                  height={260}
                  src="https://cloudinary.fifa.com/transform/89f905e3-ebcd-439b-a99f-0c8a9288c50d/Japan-v-Ecuador-International-Friendly"
                ></MImage>
              </Box>
            </Box>
            <Image src="/icon/icon-top1.png" width={45} height={58}></Image>
          </Group>
          <Group spacing={10}>
            <Box
              sx={() => ({
                border: "2px solid #f7b04d",
                padding: "2px",
              })}
            >
              <Box
                sx={() => ({
                  border: "2px solid #f3546a",
                  padding: "2px",
                })}
              >
                <MImage
                  width={200}
                  height={260}
                  src="https://cloudinary.fifa.com/transform/89f905e3-ebcd-439b-a99f-0c8a9288c50d/Japan-v-Ecuador-International-Friendly"
                ></MImage>
              </Box>
            </Box>
            <Image src="/icon/icon-top1.png" width={45} height={58}></Image>
          </Group>
          <Group spacing={10} style={{ position: "relative", top: "40px" }}>
            <Box
              sx={() => ({
                border: "2px solid #f7b04d",
                padding: "2px",
              })}
            >
              <Box
                sx={() => ({
                  border: "2px solid #f3546a",
                  padding: "2px",
                })}
              >
                <MImage
                  width={200}
                  height={260}
                  src="https://cloudinary.fifa.com/transform/89f905e3-ebcd-439b-a99f-0c8a9288c50d/Japan-v-Ecuador-International-Friendly"
                ></MImage>
              </Box>
            </Box>
            <Image src="/icon/icon-top1.png" width={45} height={58}></Image>
          </Group>
        </SimpleGrid>
        <Stack align="center" spacing={8}>
          <Text size={12} style={{ fontFamily: "ale-general" }}>
            Vote from our commutity
          </Text>
          <UnstyledButton
            sx={(theme) => ({
              backgroundColor: "#f3546a",
              width: "164px",
              height: "50px",
              fontSize: "1rem",
              position: "relative",
              textAlign: "center",
              color: "#fdfafa",
              fontFamily: "ale-general",
              "&:hover": {
                boxShadow: "5px 5px 2px rgba(9, 2, 4, 0.5)",
              },
            })}
          >
            Join to vote!
            <MImage
              style={{ position: "absolute", bottom: "-9px", right: "-7px" }}
              src="/icon/icon-mouse.png"
              width={30}
              height={26}
            ></MImage>
          </UnstyledButton>
        </Stack>
      </Group>
    </Stack>
  );
};

const About = () => {
  const { classes } = useSiteStyles();
  return (
    <Stack
      id="about"
      align="center"
      spacing={60}
      sx={() => ({
        padding: "60px 130px",
        background: "url('/about-bg.png') no-repeat #d9e2f5",
        backgroundPosition: "center bottom",
      })}
    >
      <Text align="center" className={classes.heroTitle}>
        About
      </Text>
      <SimpleGrid cols={2} spacing={25}>
        <Stack align="center" spacing={30}>
          <Text className={classes.heroTitle}>Aether</Text>
          <div
            style={{
              width: "335px",
              height: "210px",
              border: "1px solid #94acda",
              boxShadow: "2px 2px 2px rgba(191, 205, 235, 0.75)",
            }}
          ></div>
        </Stack>
        <Stack align="center" spacing={30}>
          <Text className={classes.heroTitle}>Metasoco</Text>
          <div
            style={{
              width: "335px",
              height: "210px",
              border: "1px solid #94acda",
              boxShadow: "2px 2px 2px rgba(191, 205, 235, 0.75)",
            }}
          ></div>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
};

const Partner = () => {
  const { classes } = useSiteStyles();
  return (
    <Stack
      id="partner"
      align="center"
      spacing={60}
      sx={() => ({
        padding: "60px 130px",
        backgroundColor: "#e3e9f5",
      })}
    >
      <Text align="center" className={classes.heroTitle}>
        Partners ＆Supporters
      </Text>
      <SimpleGrid cols={3} spacing={25}>
        <MImage src="/1.png"></MImage>
        <MImage src="/1.png"></MImage>
        <MImage src="/1.png"></MImage>
      </SimpleGrid>
      <Stack
        spacing={33}
        align="center"
        justify="center"
        sx={() => ({
          borderRadius: "20px",
          width: "500px",
          height: "170px",
          background: "linear-gradient(62deg, #761D67 0%, #F45268 81%)",
        })}
      >
        <Text color="#fdfbfd" align="center" className={classes.heroTitle}>
          Join our Community
        </Text>
        <Group spacing={50}>
          <UnstyledButton>
            <Image src="/icon/icon-twitter.png" width={37} height={30}></Image>
          </UnstyledButton>
          <UnstyledButton>
            <Image src="/icon/icon-discord.png" width={42} height={40}></Image>
          </UnstyledButton>
          <UnstyledButton>
            <Image src="/icon/icon-telegram.png" width={40} height={39}></Image>
          </UnstyledButton>
        </Group>
      </Stack>
    </Stack>
  );
};

const HomePage: NextPage<{
  fifaInfo: FifaInfo[];
  contract: any;
}> = ({ fifaInfo, contract }) => {
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
    <div className="container">
      <Hero />
      <Mint contract={contract} />
      <Mechanism contract={contract} fifaInfo={recentFifa} />
      <Claim contract={contract} fifaInfo={recentFifa} />
      <Vote />
      <About />
      <Partner />
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
