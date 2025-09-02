/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  experimental: {
    appDir: true, // asegúrate que Next usa tu src/app
  },
};

module.exports = nextConfig;
