import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    // Allow production builds even if TypeScript reports type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;