/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
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
