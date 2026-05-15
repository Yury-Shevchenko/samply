import type { NextConfig } from "next";

const EXPRESS_URL = process.env.EXPRESS_URL ?? "http://localhost";
const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,    // unsafe-inline needed for Next.js inline scripts; unsafe-eval dev-only for Turbopack/React call-stack reconstruction
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.postmarkapp.com https://exp.host https://api.stripe.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  transpilePackages: ["recharts"],
  turbopack: {
    // Prevent Next.js from mistaking the parent Website/ lockfile as the root.
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
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
