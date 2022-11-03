import { NextPageContext } from "next";
import axios from "axios";
import HomePage from "src/components/home";
import { FifaInfo } from "src/types";

export const getServerSideProps = async ({ res }: NextPageContext) => {
  const {
    headers: { date },
    data,
  } = await axios.get(process.env.JSON_HOST);

  let fifaInfo: FifaInfo[] = [];
  if (!data?.length) {
    fifaInfo = require("../assets/fifa.json");
  } else {
    fifaInfo = data;
  }

  const {
    data: { result },
  } = await axios.get(process.env.BOARD_API);
  let boardList = [];
  if (result?.length) {
    boardList = result.splice(0, 6);
  }

  let { data: whiteListData } = await axios.get(process.env.WHITE_LIST)
  let wl = whiteListData.split('\n')
  wl = wl.filter(item => item !== '')

  res.setHeader('Cache-Control', 'no-cache');

  return {
    props: {
      boardList: boardList || [],
      fifaInfo: fifaInfo || [],
      serviceDate: date || new Date(),
      whiteListData: wl
    },
  };
};

export default HomePage;
