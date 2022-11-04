/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

const nextConfig = {
  images: {
    domains: [
      'pbs.twimg.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.woff2$/,
      use: ['url-loader'],
    })
    return config
  }
}

// module.exports = withBundleAnalyzer(nextConfig)
module.exports = nextConfig
