/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.example.com'], // À ajuster selon vos sources d'images
  },
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
}

module.exports = nextConfig