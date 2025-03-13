/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Dacă vrei să publici într-un repo numit altfel decât username.github.io,
  // decomentează și actualizează linia de mai jos
  // basePath: '/arthurpopa.com',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 