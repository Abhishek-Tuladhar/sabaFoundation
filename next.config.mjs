/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sabafamilyfoundation.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;