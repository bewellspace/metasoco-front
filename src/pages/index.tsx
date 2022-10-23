import supabase from "src/common/db";
import { NextPageContext } from "next";
import axios from "axios";
import HomePage from "src/components/home";
import { FifaInfo } from "src/types";

export const getServerSideProps = async ({ res }: NextPageContext) => {
  const {
    headers: { date },
    data,
  } = await axios.get(process.env.JSON_HOST);
  console.log("data", data);
  console.log("=================================");
  console.log("date", date);

  // const data = await Promise.all([
  //   await supabase.from("fifa_info").select("*"),
  // ]);

  let fifaInfo: FifaInfo[] = [];
  if (!data?.length) {
    fifaInfo = require("../assets/fifa.json");
  } else {
    fifaInfo = data;
  }

  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );

  return {
    props: {
      fifaInfo: fifaInfo || [],
      serviceDate: date || new Date()
    },
  };
};

export default HomePage;
