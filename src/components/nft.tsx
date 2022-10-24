import {
  Stack,
  Text,
  UnstyledButton,
  Box,
  SimpleGrid,
  Image as MImage,
  Skeleton,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSiteStyles } from "../theme";
export default function AboutPage({ contract }) {
  const [nftNumber, setNftNumber] = useState(0);
  const [userTotalReward, setUserTotalReward] = useState(0);
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (contract.signer) {
  //     init();
  //   }
  // }, [contract]);

  const init = async () => {
    setNftList([]);
    const myNft = await contract.userTokenIds();
    setNftNumber(myNft.length);
    const calculateReward = await contract.calculateReward();
    setUserTotalReward(calculateReward.userTotalReward.toString());
    myNft.forEach((item) => {
      getTokenDetail(item);
    });
    setLoading(false);
  };

  const getTokenDetail = async (id) => {
    const newNftList = [...nftList];
    const nftDetailURI = await contract.tokenURI(id);
    const { data } = await axios.get(nftDetailURI);
    newNftList.push(data.image);
    setNftList(newNftList);
  };

  const { classes } = useSiteStyles();
  return (
    <Stack
      align="center"
      spacing={30}
      sx={(theme) => ({
        padding: "150px 80px 80px",
        background: "url('/nft-bg.png') no-repeat #d8e2f7",
        backgroundPositionX: 'right',
        backgroundPositionY: "bottom",
        backgroundSize: "370px 410px",
        [theme.fn.smallerThan("md")]: {
          padding: "120px 10px"
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
      <UnstyledButton
        sx={() => ({
          width: "150px",
          height: "45px",
          borderRadius: "45px",
          textAlign: "center",
          color: "#ffffff",
          fontSize: "20px",
          background: "linear-gradient(#f68898, #f3546a)",
          "&:hover": {
            boxShadow: "6px 6px 10px #9ab4e5",
          },
        })}
      >
        Claim
      </UnstyledButton>

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
          <SimpleGrid cols={3} spacing={50}>
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
