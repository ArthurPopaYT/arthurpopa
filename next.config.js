/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['arthurpopa.com'], // Add your domain for image optimization
  },
  // No need for basePath and assetPrefix for Render
  // Explicitly configure for app directory
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig 
