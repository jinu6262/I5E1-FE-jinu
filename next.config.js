/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://3.34.59.206:8080/:path*'
      }
    ]
  }
}

module.exports = nextConfig
