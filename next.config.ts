import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
