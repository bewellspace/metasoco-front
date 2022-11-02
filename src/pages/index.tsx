import { NextPageContext } from 'next';
import axios from 'axios';
import HomePage from 'src/components/home';
import { FifaInfo } from 'src/types';

export const getServerSideProps = async ({ res }: NextPageContext) => {
  const {
    headers: { date },
    data,
  } = await axios.get(process.env.JSON_HOST);

  let fifaInfo: FifaInfo[] = [];
  if (!data?.length) {
    fifaInfo = require('../assets/fifa.json');
  } else {
    fifaInfo = data;
  }

  // const {
  //   data: { result },
  // } = await axios.get(process.env.BOARD_API);
  // const boardList = result;

  res.setHeader('Cache-Control', 'no-cache');

  return {
    props: {
      boardList: [], //boardList || [],
      fifaInfo: fifaInfo || [],
      serviceDate: date || new Date(),
      whiteListData: [
        '0x83c43c0972045bd040ef97afe9720d5d0d6aed12',
        '0xfa7699f68bd75bf37cee65dd8c511c3a26e059f5',
        '0x128Da32E5070A40b5ecD97D3ECa80DC8Fcb17508',
        '0x3e703222e223f5bdd6132a6b1f7a772e669c44a2',
        '0xe89adb39c56d8dbf672150b42adfacb039256c95',
        '0x2e440eb42ba088bfe1c78ff4067e1927ac412d20',
        '0x0fad11f35ffdb5a0360e75a11437b421f34bcbb8',
        '0x90900d6fae81fca45347a8e2dfc8cd93db28451d',
        '0x287a197d576e19c435d48a34e1595e602b0bc289',
        '0x7477c14a6e57cb6db8ddd85f4d14af3b251ff442',
        '0x65e304Cb62B297E457BC061d73184387E59911C1',
        '0xfeda2dcb016567deb02c3b59724cf09dbc41a64d',
        '0x4c615e48c2f9ea725f5f16ec7367d3fd383b097e',
        '0x68a0eb5240a6dbd55c08b174050e790c3fb385a6',
        '0x6dd7e3db23a2ab2aa2dfa5d34fe161674102b182',
        '0x79224edb33738f1577812b453099e0ef10412468',
        '0xc6f2ca8652abc36374a67b5fdcec63498fe67867',
        '0xdc810b73f0e0b688bcd51659fdf89fcc09f2636d',
        '0x213f3aa02c6d3dd734941d2a88893404ebf0b358',
        '0x1776adb775bd51f81d3aec8b24d1f82c32e99c26',
        '0x7d4507b6dd568846beae236732e1c3499fe05417',
        '0x9b4901508f1913beb805b313c172ea51c225005e',
        '0x0e056b86f71abb5f6e2f9469d62655efba900c8a',
        '0x461384a7ef3688347637731a77b0a5202d1614d4',
        '0xecfa469583346630280087f6673fe6f37b52a4e2',
        '0x8a9b13ec74ec18a439a0ca29180efcda42d9c3ab',
        '0xe7c57881c29317f84775142b7ae8a93359c58ff5',
        '0x7d4507b6dd568846beae236732e1c3499fe05417',
        '0x1aed1a2cbb6f7b21adf9a8bba3c3c4e71db24126',
        '0x4a7266924fa23b99E72F7A9e70308736e5E06626',
        '0xfD971f976B294738693Cf70FFD6fDf77E639FF30',
        '0x5a9C449488421a007D1aB0df298f23250E774BFb',
        '0x2E440eB42bA088bfE1c78fF4067e1927AC412D20',
        '0x63b42BFD3c802ef9944C92523eAE9A4E62860686',
        '0x683EA51c3FdCF92BeeAF6159F21A6a6bdc8F345B',
        '0xe4aa9A4Ea1cBfA2Cf2034B40cb4B3a7d2d2Ade8E',
        '0x213F3aA02c6d3DD734941d2a88893404EBf0B358 ',
        '0x438df4570AacfF55ae3cD5Ab83EAbCF73824f630',
        '0x9A3cFB77E29A1cEfc23F1041a5b8Be838c04E657',
        '0x5Be9BCb573BF2C3b4f06454A0dA8e992aD35d58C',
      ],
    },
  };
};

export default HomePage;
