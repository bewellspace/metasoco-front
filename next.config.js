/** @type {import('next').NextConfig} */
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
  },
  async rewrites() {
    return [
      //接口请求 前缀带上/api-text/
      { source: '/api/:path*', destination: `https://gateway.pinata.cloud/:path*` },
    ]
  },
}

module.exports = nextConfig
