/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Disable optimizer to avoid ResponseAborted issues for local assets
    unoptimized: true,
  },
  webpack: (config) => {
    // Fix for three.js ESM module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    
    // Ensure three.js modules are handled correctly
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    })
    
    return config
  },
}

module.exports = nextConfig

