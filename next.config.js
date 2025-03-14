/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // We'll let GitHub Pages handle the base path
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig 
