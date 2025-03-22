/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode for better Three.js compatibility
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
  },
  // Properly handle WebGL in production
  webpack: (config) => {
    // This is needed for three.js to work properly on the web
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
}

module.exports = nextConfig 
