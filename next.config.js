/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Use assetPrefix and basePath for GitHub Pages
  basePath: process.env.GITHUB_ACTIONS ? '/arthurpopa.com' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/arthurpopa.com/' : '',
  // Explicitly configure for app directory
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig 
