// Next.js 16 proxy (replaces middleware.ts) — runs on every matched request.
// Auth.js's `auth` function reads the JWT session cookie and, if `authorized`
// returns false, redirects the user to the `pages.signIn` URL.

import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter — suitable for single-server deployments.
// For multi-instance deployments, replace the store with Redis/Upstash.
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

function rateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count++;
  return true;
}

// Purge expired entries periodically to avoid unbounded memory growth.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 60_000);
}

const RATE_LIMIT_RULES: Array<{
  test: (pathname: string, method: string) => boolean;
  maxRequests: number;
  windowMs: number;
  prefix: string;
  scope?: "ip" | "global";
}> = [
  // Credential login — 20 attempts per IP per 15 min
  {
    test: (p, m) => m === "POST" && (p === "/api/auth/callback/credentials" || p === "/login"),
    maxRequests: 20,
    windowMs: 15 * 60 * 1000,
    prefix: "auth",
  },
  // Password reset — 5 per IP per 15 min to prevent email flooding
  {
    test: (p, m) => m === "POST" && (p.startsWith("/account/forgot") || p.startsWith("/forgot")),
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    prefix: "reset",
  },
  // Registration — 3 per IP per hour, plus a global cap so a botnet rotating
  // IPs can't flood the signup queue (Turnstile + honeypot are the primary
  // defenses; these limits are a backstop).
  {
    test: (p, m) => m === "POST" && p === "/register",
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
    prefix: "register",
  },
  {
    test: (p, m) => m === "POST" && p === "/register",
    maxRequests: 60,
    windowMs: 60 * 60 * 1000,
    prefix: "register-global",
    scope: "global",
  },
  // Donation session — 30 per IP per hour
  {
    test: (p, m) => m === "POST" && p === "/donate",
    maxRequests: 30,
    windowMs: 60 * 60 * 1000,
    prefix: "donate",
  },
];

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  for (const rule of RATE_LIMIT_RULES) {
    if (rule.test(pathname, method)) {
      const key = rule.scope === "global" ? rule.prefix : `${rule.prefix}:${getClientIp(req)}`;
      if (!rateLimit(key, rule.maxRequests, rule.windowMs)) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429, headers: { "Retry-After": String(Math.ceil(rule.windowMs / 1000)) } },
        );
      }
    }
  }

  // Auth.js session check — handles protected route redirects defined in auth.ts.
  return (auth as unknown as (req: NextRequest) => Promise<NextResponse>)(req);
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files.
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|dist|uploads/).*)",
  ],
};
