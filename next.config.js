/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.example.com', 'static.example.com'],
  },
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
}