import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // MDX content and brand files are read from disk at build time and by the OG image routes.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*", "./public/brand/**/*"],
  },
  // Insights was renamed to Blog.
  async redirects() {
    return [
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:path*", destination: "/blog/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
