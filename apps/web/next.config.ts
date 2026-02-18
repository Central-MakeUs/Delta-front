import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "delta-semo-dev.s3.ap-northeast-2.amazonaws.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "delta-semo-prod.s3.ap-northeast-2.amazonaws.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default withVanillaExtract(nextConfig);
