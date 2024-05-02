/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cocogo.mizi.fr',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
