import axios from 'axios';
import { NextPageContext } from 'next';
import NFT from 'src/components/nft';

export const getServerSideProps = async ({ res }: NextPageContext) => {
  let { data: whiteListData } = await axios.get(process.env.WHITE_LIST);
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      whiteListData: whiteListData,
    },
  };
};

export default NFT;
