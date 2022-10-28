import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import {
  Stack,
  Text,
  UnstyledButton,
  Button,
  Box,
  SimpleGrid,
  Image as MImage,
  Skeleton,
} from "@mantine/core";
import axios from "axios";
import abi from "src/abi/abi.json";
import { useEffect, useState } from "react";
import { useSiteStyles } from "../theme";
import Blindbox from "./Blindbox";
import { useMediaQuery } from "@mantine/hooks";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function AboutPage({ contract }) {
  const { chain } = useNetwork();
  const { classes } = useSiteStyles();
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const [nftNumber, setNftNumber] = useState(0);
  const [userTotalReward, setUserTotalReward] = useState(0);
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [boxNumber, setBoxNumber] = useState(0);
  const [claimLoading, setClaimLoading] = useState(false);

  const isBreakpointXs = useMediaQuery("(max-width: 576px)");

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
    setLoading(true);
    const newNftList = [...nftList];
    for (let i = 1; i < myNft.length; i++) {
      const data = await getTokenDetail(myNft[i]);
      newNftList.push(data);
    }
    setNftList(newNftList);
    setLoading(false);
  };

  const getTokenDetail = async (id) => {
    let nftDetailURI = await contract.tokenURI(id);
    nftDetailURI = "/api" + nftDetailURI.substring(28, nftDetailURI.length);
    const { data } = await axios.get(nftDetailURI);
    return data.image;
  };

  useEffect(() => {
    getBoxNumber();
  }, []);

  const getBoxNumber = async () => {
    const data = await contract.minterQueueInfo();
    setBoxNumber(data[0]);
    console.log("boxNumber", data);
  };

  const claimPre = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "claimReward",
    enabled:
      isConnected &&
      chain.network === process.env.NEXT_PUBLIC_CHAIN &&
      contract.signer &&
      userTotalReward > 0,
    overrides: {
      from: address,
      value: 0,
    },
    onError: (err) => {
      console.log("claimWrite===", err);
      // if (err.message.indexOf(MESSAGE[0])) {
      // }
    },
  });

  const claimWrite = useContractWrite(claimPre.config);

  useWaitForTransaction({
    hash: claimWrite.data?.hash,
    onSuccess: (data) => {
      setClaimLoading(false);
    },
    onSettled: () => setClaimLoading(false),
  });

  const handleClaim = () => {
    if (isConnected) {
      if (userTotalReward > 0) {
        setClaimLoading(true);
        claimWrite?.write();
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <Stack
      align="center"
      spacing={30}
      sx={(theme) => ({
        padding: "150px 80px 80px",
        background: "url('/nft-bg.png') no-repeat #d8e2f7",
        backgroundPositionX: "right",
        backgroundPositionY: "bottom",
        backgroundSize: "370px 410px",
        [theme.fn.smallerThan("md")]: {
          padding: "120px 10px",
        },
      })}
    >
      <Stack align="center" spacing={45}>
        <Text className={classes.heroTitle}>
          YOU OWNED {nftNumber} TEAM NFTS
        </Text>
        <Text className={classes.modelTips} underline>
          My NFT reward：{userTotalReward} ETH
        </Text>
      </Stack>
      <Button
        loading={claimLoading}
        disabled={!isConnected || userTotalReward <= 0}
        onClick={() => handleClaim()}
        sx={() => ({
          width: "150px",
          height: "45px",
          borderRadius: "45px",
          textAlign: "center",
          color: "#ffffff !important",
          fontSize: "20px",
          background: "linear-gradient(#f68898, #f3546a)",
          "&:hover": {
            boxShadow: "6px 6px 10px #9ab4e5",
          },
          "&:before": {
            borderRadius: "45px !important",
          },
        })}
      >
        Claim
      </Button>

      <Box
        sx={(theme) => ({
          width: "86vw",
          minHeight: "500px",
          borderRadius: "4px",
          marginTop: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        })}
      >
        <Skeleton
          visible={loading}
          style={{
            opacity: loading ? 0.5 : 1,
            minHeight: "500px",
            padding: "50px 70px",
          }}
        >
          <SimpleGrid
            cols={isBreakpointXs ? 1 : 4}
            spacing={isBreakpointXs ? 10 : 40}
          >
            {boxNumber > 0 &&
              new Array(Number(boxNumber)).fill(null).map((item, index) => {
                return (
                  <div key={`box_item_${index}`}>
                    <Blindbox />
                  </div>
                );
              })}

            {nftList.map((item, index) => {
              return (
                <Box
                  key={`nft_${index}`}
                  style={{
                    border: "1px solid #535353",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <MImage width="100%" withPlaceholder src={item}></MImage>
                </Box>
              );
            })}
          </SimpleGrid>
        </Skeleton>
      </Box>
    </Stack>
  );
}
