// Next.js 16 renamed middleware.ts → proxy.ts and `middleware` export → `proxy`.
// Auth.js's `auth` function is used here: it reads the JWT session cookie and,
// if `authorized` returns false, redirects the user to the `pages.signIn` URL.
export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files.
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|dist).*)",
  ],
};
