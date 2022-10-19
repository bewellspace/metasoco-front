import { NextPageContext } from 'next'
import HomePage from 'src/components/home'

export const getServerSideProps = async ({ res }: NextPageContext) => {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {
      tweets: [],
      avatars: [],
      count: 0,
    },
  }
}

export default HomePage
