import type { NextConfig } from "next";

const nextConfig: NextConfig = (module.exports = {
  images: {
    domains: ["cdn.shopify.com"],
  },
});

export default nextConfig;
