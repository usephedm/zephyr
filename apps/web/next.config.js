/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sawaliq/config', '@sawaliq/core', '@sawaliq/ui', '@sawaliq/telemetry'],
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

module.exports = nextConfig