/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Remove all console logs
    //removeConsole: process.env.NODE_ENV === "production"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api.cocogo.local',
        port: '8082',
      },
      {
        protocol: 'http',
        hostname: 'api.cocogo.cloud',
        port: '8082',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8082',
      },
      {
        protocol: 'https',
        hostname: 'cocogo.mizi.fr',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
