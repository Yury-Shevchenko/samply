import type { NextConfig } from "next";

const EXPRESS_URL = process.env.EXPRESS_URL ?? "http://localhost";

const nextConfig: NextConfig = {
  turbopack: {
    // Prevent Next.js from mistaking the parent Website/ lockfile as the root.
    root: __dirname,
  },
  async redirects() {
    return [
      // Old project list → new dashboard
      { source: "/projects", destination: "/dashboard", permanent: false },
      // /docs/intro → /docs/home (slug rename)
      { source: "/docs/intro", destination: "/docs/home", permanent: true },
      // Bare /docs → welcome page
      { source: "/docs", destination: "/docs/home", permanent: false },
    ];
  },
  async rewrites() {
    return {
      // Next.js handles its own /api/auth/* (Auth.js) and any future
      // /api/* Route Handlers. Everything else falls through to Express.
      fallback: [
        {
          source: "/:path*",
          destination: `${EXPRESS_URL}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
