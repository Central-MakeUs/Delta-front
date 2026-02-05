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
        hostname: "delta-semo.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default withVanillaExtract(nextConfig);
