import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

// Extend the built-in session/token types with Samply-specific fields.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      level: number;
      samplyId: string;
      emailIsConfirmed: boolean;
    };
  }
  interface User {
    level: number;
    samplyId: string;
    emailIsConfirmed: boolean;
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    level: number;
    samplyId: string;
    emailIsConfirmed: boolean;
  }
}

const config: NextAuthConfig = {
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase().trim(),
        }).select("+local.password");

        if (!user || !user.local?.password) return null;
        if (!user.validPassword(credentials.password as string)) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          level: user.level,
          samplyId: user.samplyId,
          emailIsConfirmed: user.emailIsConfirmed ?? false,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Initial sign-in: bake fields from the authorize() return value.
        token.level = user.level;
        token.samplyId = user.samplyId;
        token.emailIsConfirmed = user.emailIsConfirmed;
      } else if (token.sub) {
        // Subsequent requests: re-read critical permission fields from DB so that
        // admin level changes and email confirmations take effect without logout.
        try {
          await connectDB();
          const fresh = await User.findById(token.sub, {
            level: 1,
            emailIsConfirmed: 1,
            samplyId: 1,
          }).lean() as { level?: number; emailIsConfirmed?: boolean; samplyId?: string } | null;
          if (fresh) {
            token.level = fresh.level ?? token.level;
            token.emailIsConfirmed = fresh.emailIsConfirmed ?? token.emailIsConfirmed;
            token.samplyId = fresh.samplyId ?? token.samplyId;
          }
        } catch {
          // DB unavailable — keep stale token values rather than crashing.
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub!;
      session.user.level = token.level;
      session.user.samplyId = token.samplyId;
      session.user.emailIsConfirmed = token.emailIsConfirmed ?? false;
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const level = auth?.user?.level ?? 0;
      const isParticipant = isLoggedIn && level < 11;
      const isResearcher = isLoggedIn && level >= 11;
      const isAdmin = level > 100;

      // Researcher/admin-only routes.
      const researcherPrefixes = [
        "/dashboard",
        "/projects",
        "/notifications",
        "/scheduled",
        "/participants",
        "/groups",
        "/invitations",
        "/messages",
        "/receipts",
        "/payout",
        "/help",
      ];
      const isResearcherRoute = researcherPrefixes.some((p) => pathname.startsWith(p));
      if (isResearcherRoute) {
        if (!isLoggedIn) return false;
        if (isParticipant) {
          return Response.redirect(new URL("/participant/home", request.nextUrl));
        }
      }

      // Participant-only routes.
      if (pathname.startsWith("/participant")) {
        // Allow the unauthenticated login/forgot pages.
        const publicParticipantPaths = ["/participant/login", "/participant/forgot"];
        if (publicParticipantPaths.some((p) => pathname.startsWith(p))) {
          if (isParticipant) {
            return Response.redirect(new URL("/participant/home", request.nextUrl));
          }
          if (isResearcher) {
            return Response.redirect(new URL("/dashboard", request.nextUrl));
          }
          return true;
        }
        if (!isLoggedIn) {
          return Response.redirect(new URL("/participant/login", request.nextUrl));
        }
        if (isResearcher) {
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        }
      }

      // /account is shared but requires login.
      if (pathname.startsWith("/account") && !isLoggedIn) return false;

      // Admin-only routes.
      if (pathname.startsWith("/admin") && !isAdmin) return false;

      return true;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
