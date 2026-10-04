import type { NextConfig } from "next";

// GitHub Pages віддає сайт з підшляху /<repo>/, локально — з кореня.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
