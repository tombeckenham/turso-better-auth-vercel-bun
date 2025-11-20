import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@libsql/isomorphic-ws"],
};

export default nextConfig;
