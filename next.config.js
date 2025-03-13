/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/arthurpopa',
  assetPrefix: '/arthurpopa/',
}

module.exports = nextConfig 
