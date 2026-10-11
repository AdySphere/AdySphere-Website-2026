import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // MDX content and brand files are read from disk at build time and by the OG image routes.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*", "./public/brand/**/*"],
  },
};

export default nextConfig;
