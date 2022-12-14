import {
  useNetwork,
  useSwitchNetwork,
  useContractRead,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import {
  Group,
  Stack,
  Text,
  UnstyledButton,
  Button,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  Image as MImage,
  Box,
  BackgroundImage,
  Center,
  Grid,
} from '@mantine/core';
import Image from 'next/image';
import { ethers } from 'ethers';
import keccak256 from 'keccak256';
import Blindbox from '../Blindbox';
import { Decimal } from 'decimal.js';
import { useRouter } from 'next/router';
import { useSiteStyles } from 'src/theme';
import { MerkleTree } from 'merkletreejs';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlus, IconMinus } from '@tabler/icons';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useState, useRef, useEffect } from 'react';

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
const abi: any = process.env.NEXT_PUBLIC_ABI;

const Mint = ({ contract, whiteListData }) => {
  const router = useRouter();
  const { classes } = useSiteStyles();
  const [value, setValue] = useState(1);
  const [price, setPrice] = useState(0);
  const [supply, setSupply] = useState('0');
  const [soldOut, setSoldOut] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { address, isConnected } = useAccount();
  const [totalNumber, setTotalNumber] = useState('3200');
  const [mintLoading, setMintLoading] = useState(false);
  const [proof, setProof] = useState([]);
  const [proofEnd, setProofEnd] = useState(false);
  const [recommenderAddress, setAddress] = useState(NULL_ADDRESS);
  const handlers = useRef<NumberInputHandlers>();
  const { openConnectModal } = useConnectModal();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const isBreakpointXs = useMediaQuery('(max-width: 576px)');

  let shareAddress: any = NULL_ADDRESS;
  const routerAddr: any = router.query?.addr;
  if (routerAddr && ethers.utils.isAddress(routerAddr)) {
    shareAddress = routerAddr;
  }

  useEffect(() => {
    if (Number(totalNumber) === Number(supply)) {
      setSoldOut(true);
    } else {
      setSoldOut(false);
    }
  }, [totalNumber, supply]);

  // PRICE
  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'PRICE',
    enabled: !isConnected,
    onSuccess: (data: any) => {
      setPrice(data.toString() / Math.pow(10, 18));
    },
  });

  //totalSupply
  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'totalSupply',
    watch: true,
    onSuccess: (data) => {
      setSupply(data.toString());
    },
  });

  //MAX_ISSUE
  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'MAX_ISSUE',
    onSuccess: (data: any) => {
      setTotalNumber(data.toString());
    },
  });

  //saleIsActive
  useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'saleIsActive',
    watch: true,
    onSuccess: (data: boolean) => {
      setIsActive(data);
    },
  });

  useEffect(() => {
    if (
      whiteListData &&
      whiteListData.length &&
      isConnected &&
      contract.signer
    ) {
      const leafNodes = whiteListData.map((addr) => keccak256(addr.trim()));
      const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      const proof = tree.getHexProof(keccak256(address));
      console.log(proof);
      getPrice(proof);
      setProof(proof);
      setProofEnd(true);
    }
  }, [whiteListData, isConnected, contract]);

  const getPrice = async (proof) => {
    const data = await contract.mintInfo(shareAddress, proof);
    setPrice(data.mintPrice.toString() / Math.pow(10, 18));
    data[0] && setAddress(shareAddress);
  };

  const mintBox = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'mint',
    enabled:
      isActive &&
      isConnected &&
      // chain.network === process.env.NEXT_PUBLIC_CHAIN &&
      !soldOut &&
      contract.signer &&
      !!price &&
      proofEnd,
    args: [value, recommenderAddress, proof],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(new Decimal(price).mul(value).toFixed()),
    },
    onError: (err) => {
      // console.log('mintBoxError===', err);
      // if (err.message.indexOf(MESSAGE[0])) {
      // }
    },
  });

  const mintWrite = useContractWrite(mintBox.config);

  useEffect(() => {
    if (mintWrite.isError) {
      setMintLoading(false);
    }
  }, [mintWrite]);

  useWaitForTransaction({
    hash: mintWrite.data?.hash,
    onSuccess: (data) => {
      setMintLoading(false);
      router.push('/nft');
    },
    onSettled: () => setMintLoading(false),
  });

  const triggerMint = () => {
    const agreedChainId = process.env.NEXT_PUBLIC_CHAIN === 'goerli' ? 5 : 1;
    if (isConnected) {
      if (chain.id !== agreedChainId) {
        switchNetwork?.(agreedChainId);
      } else if (isActive && !soldOut && mintWrite?.write) {
        mintWrite?.write();
        setMintLoading(true);
      }
    } else {
      openConnectModal();
    }
  };

  return (
    <div id='mint'>
      <BackgroundImage src='/mint-bg.jpg'>
        <Stack
          align='center'
          sx={(theme) => ({
            padding: '40px 0 100px',
            width: '100%',
            fontFamily: 'Balthazar-Regular',
            position: 'relative',
            color: '#FBFAFA',
            [theme.fn.smallerThan('lg')]: {
              // padding: "30px",
            },
          })}
        >
          <Group
            spacing={48}
            mb={20}
            position='center'
            sx={() => ({
              width: '100%',
            })}
          >
            <Stack align='center' spacing={20}>
              <Box
                sx={(theme) => ({
                  width: '280px',
                  boxShadow: '5px 6px 6px rgba(9, 2, 4, 0.5)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  [theme.fn.smallerThan('xs')]: {
                    width: '200px',
                  },
                })}
              >
                <MImage src='/box-card.png'></MImage>
              </Box>

              <Text
                size={12}
                color='#FCF9F9'
                style={{ fontFamily: 'Balthazar-Regular', lineHeight: 1 }}
              >
                NETWORK ETHEREUM
              </Text>
            </Stack>
            <Stack
              spacing={14}
              align='center'
              sx={(theme) => ({
                maxWidth: '50vw',
                [theme.fn.smallerThan('xs')]: {
                  maxWidth: '90vw',
                },
              })}
            >
              <Text className={classes.heroTitle} pb={36}>
                METASOCO MYSTERYBOX
              </Text>
              <Grid
                justify='center'
                align='center'
                gutter={10}
                sx={() => ({
                  width: '320px',
                  position: 'relative',
                  left: '70px',
                  marginBottom: '15px',
                })}
              >
                <Grid.Col span={3}>MINTED</Grid.Col>
                <Grid.Col
                  span={9}
                  style={{ fontFamily: 'BalooBhaina', position: 'relative' }}
                >
                  {supply}/{totalNumber}
                  <span
                    style={{
                      fontFamily: 'Balthazar-Regular',
                      paddingLeft: '12px',
                    }}
                  >
                    (<span style={{ fontFamily: 'BalooBhaina' }}>100</span>{' '}
                    limited this round)
                  </span>
                </Grid.Col>
                <Grid.Col span={3} style={{ textShadow: '2px 2px 6px #000' }}>
                  PRICE
                </Grid.Col>
                <Grid.Col span={9}>
                  <Group spacing={2} style={{ textShadow: '2px 2px 6px #000' }}>
                    <Text
                      sx={() => ({
                        color: '#f3261f',
                        fontSize: '30px',
                        textShadow: '2px 2px 6px #000',
                        paddingRight: '5px',
                        position: 'relative',
                        top: '-4px',
                        fontFamily: 'BalooBhaina',
                      })}
                    >
                      {new Decimal(price).mul(value).toFixed()}
                    </Text>{' '}
                    ETH
                  </Group>
                </Grid.Col>
                <Grid.Col span={3}>AMOUNT</Grid.Col>
                <Grid.Col span={9}>
                  <Group spacing={0}>
                    <ActionIcon
                      size={25}
                      radius='xs'
                      variant='outline'
                      sx={() => ({
                        borderColor: '#000',
                        borderWidth: '2px',
                      })}
                      onClick={() => handlers.current.decrement()}
                    >
                      <IconMinus color='#FBF9F9' size={16} />
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
                          textAlign: 'center',
                          padding: 0,
                          background: 'transparent',
                          border: 'none',
                          color: '#FBF9F9',
                          fontSize: '20px',
                          fontFamily: 'BalooBhaina',
                        },
                      }}
                    />

                    <ActionIcon
                      size={25}
                      radius='xs'
                      variant='outline'
                      sx={() => ({
                        borderColor: '#000',
                        borderWidth: '2px',
                      })}
                      onClick={() => handlers.current.increment()}
                    >
                      <IconPlus color='#FBF9F9' size={16} />
                    </ActionIcon>
                  </Group>
                </Grid.Col>
              </Grid>

              <Stack spacing={10}>
                <Button
                  disabled={!isActive || soldOut}
                  onClick={() => triggerMint()}
                  loading={mintLoading}
                  sx={() => ({
                    background: 'linear-gradient(#f59e32, #f22819)',
                    textAlign: 'center',
                    color: 'white !important',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.66)',
                    transform: 'scale(1)',
                    transition: 'transform 0.1s linear 0s',
                    fontFamily: 'Balthazar-Regular',
                    fontSize: '18px',
                    border: 'none',
                    '&:hover': {
                      background: 'linear-gradient(#f36d23, #f22919)',
                    },
                    '&:before': {
                      borderRadius: '10px !important',
                    },
                  })}
                >
                  {soldOut ? 'Sold Out' : 'Mint Your Team'}
                </Button>
                <Text
                  align='center'
                  style={{ fontFamily: 'Balthazar-Regular' }}
                >
                  (Max mint{' '}
                  <span style={{ fontFamily: 'BalooBhaina' }}>10</span>x per
                  wallet)
                </Text>
              </Stack>
            </Stack>
          </Group>
          <Stack
            spacing={14}
            sx={(theme) => ({
              maxWidth: '800px',
              padding: '0 20px',
            })}
          >
            <Text
              size={18}
              sx={(theme) => ({
                fontFamily: 'Balthazar-Regular',
                lineHeight: 1.5,
                [theme.fn.smallerThan('xs')]: {
                  lineHeight: 1.2,
                },
              })}
            >
              3200 NFTs in total according to 32 teams of FIFA World Cup 2022.
              <br />
              100 for each team.
            </Text>
            <Text
              size={18}
              sx={(theme) => ({
                fontFamily: 'Balthazar-Regular',
                lineHeight: 1.5,
                [theme.fn.smallerThan('xs')]: {
                  lineHeight: 1.2,
                },
              })}
            >
              The holders of NFTs are rewarded according to the actual
              performance of each team during the FIFA World Cup 2022. The NFT
              values of all teams will fluctuate in real time with each game's
              performance, and the value of teams will directly affect the
              payoffs to holders, including holding incentives and secondary
              market trading prices.
            </Text>
          </Stack>

          <UnstyledButton
            onClick={() =>
              window.open('https://opensea.io/collection/metasoco')
            }
            sx={(theme) => ({
              position: 'absolute',
              right: '60px',
              bottom: '60px',
              transform: 'scale(1)',
              transition: 'transform 0.1s linear 0s',
              '&:hover': {
                transform: 'scale(1.06)',
                transition: 'transform 0.1s linear 0s',
              },
              [theme.fn.smallerThan('md')]: {
                bottom: '20px',
                right: '20px',
              },
            })}
          >
            <Image
              src='/icon/icon-os.png'
              width={isBreakpointXs ? 30 : 45}
              height={isBreakpointXs ? 28 : 42}
            ></Image>
          </UnstyledButton>
        </Stack>
      </BackgroundImage>
    </div>
  );
};

export default Mint;
