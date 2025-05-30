// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/ExchangeCampus' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/ExchangeCampus/' : '',
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
  }
  
  module.exports = nextConfig