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
  //   data: boradData,
  //   data: { result },
  // } = await axios.get(process.env.BOARD_API);
  // const boardList = result;

  let { data: whiteListData } = await axios.get(process.env.WHITE_LIST);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      boardList: [], //boardList || [],
      fifaInfo: fifaInfo || [],
      serviceDate: date || new Date(),
      whiteListData: whiteListData,
    },
  };
};

export default HomePage;
