import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@react-pdf/renderer'],
  /* config options here */
};

export default nextConfig;
