import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imageapi.bpsgameserver.com',
        port: '',
        pathname: '/v3/**',
        search: '',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/games",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
