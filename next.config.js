// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/ExchangeCampus' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/ExchangeCampus/' : '',
    images: {
      domains: ['images.unsplash.com'],
    },
    trailingSlash: true,
  }
  
  module.exports = nextConfig