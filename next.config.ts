import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

let userConfig = undefined;

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async rewrites() {
    return [
      {
        source: "/ads.txt",
        destination: "/ads.txt",
        locale: false,
      },
    ];
  },
};

mergeConfig(nextConfig, userConfig);

function mergeConfig(nextConfig: NextConfig, userConfig: any) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
