import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
