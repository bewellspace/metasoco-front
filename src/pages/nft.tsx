import { NextPageContext } from 'next'
import NFT from 'src/components/nft'

export const getServerSideProps = async ({ res }: NextPageContext) => {
  return {
    props: {},
  }
}

export default NFT
