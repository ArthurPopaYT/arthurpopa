/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/arthurpopa.com',
  assetPrefix: '/arthurpopa.com/',
}

module.exports = nextConfig 
