/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable TypeScript type checking during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
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
