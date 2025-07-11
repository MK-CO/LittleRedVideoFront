import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    // 根据环境区分API代理目标
    const apiBaseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5001'
      : 'http://172.245.62.112:5001';
    
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
