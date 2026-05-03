import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },

  async redirects() {
    return [
      // Old WordPress portfolio URLs → new work slugs
      { source: "/view/:slug", destination: "/work/:slug", permanent: true },
      { source: "/view/:slug/", destination: "/work/:slug", permanent: true },
      // Old blog URLs → homepage (2 posts, low value)
      { source: "/:year(\\d{4})/:month(\\d{2})/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
