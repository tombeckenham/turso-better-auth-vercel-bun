import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ws"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore ws module during bundling
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...config.resolve.alias,
        ws: false,
      };
    }
    return config;
  },
};

export default nextConfig;
