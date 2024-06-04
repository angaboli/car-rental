/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api.cocogo.local',
        port: '8082',
      },
    ],
    /* remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cocogo.mizi.fr',
        port: '',
      },
    ], */
  },
}

module.exports = nextConfig
