import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://172.17.0.8:5001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
