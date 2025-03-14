import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm3k63pjotp.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
