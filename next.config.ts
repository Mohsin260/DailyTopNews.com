import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "NewsPrk.quomodosoft.com",
      },
    ],
  },
};

export default nextConfig;
