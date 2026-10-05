import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",
      },
      {
        protocol: "https",
        hostname: "news-api-v2.vercel.app",
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
