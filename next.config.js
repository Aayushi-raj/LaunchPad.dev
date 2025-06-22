/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    domains: [
      "img.clerk.com",
      "images.clerk.dev",
      "uploadthing.com",
      "utfs.io",
=======
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
<<<<<<< HEAD
=======

>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
