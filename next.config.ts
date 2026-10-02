import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk", // BBC images domain
      },
      {
        protocol: "https",
        hostname: "news-api-v2.vercel.app", // API domain
      },
      // Onyo kono domain thakle ekhane add korun
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
