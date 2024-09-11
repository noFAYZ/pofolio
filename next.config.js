/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: '',
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: '',
        pathname: '/**'
      }
    ],
  },
}

module.exports = nextConfig
