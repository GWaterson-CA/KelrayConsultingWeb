import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: currentDir,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kelrayheating.ca",
      },
      {
        protocol: "https",
        hostname: "www.frothmonkey.com",
      },
      {
        protocol: "https",
        hostname: "static1.squarespace.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
