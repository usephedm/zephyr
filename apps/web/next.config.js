/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@zephyr/config', '@zephyr/core', '@zephyr/ui', '@zephyr/telemetry'],
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

module.exports = nextConfig