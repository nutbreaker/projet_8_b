import fs from "node:fs";
import path from "node:path";

const rootEnv = path.resolve(process.cwd(), "../.env");

if (fs.existsSync(rootEnv)) {
  process.loadEnvFile(rootEnv);
}

const backendPort = process.env.BACKEND_PORT || "8000";

process.env.API_BASE_URL =
  process.env.API_BASE_URL?.replace(/\$\{BACKEND_PORT\}/g, backendPort) ||
  `http://127.0.0.1:${backendPort}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 65, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
        pathname: "/course.oc-static.com/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
