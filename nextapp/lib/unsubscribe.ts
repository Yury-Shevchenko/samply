import { createHmac, timingSafeEqual } from "crypto";

// Signed, non-guessable unsubscribe tokens so a recipient can opt out of
// marketing email from a link without logging in, while nobody can unsubscribe
// someone else by guessing their user id.
function secret(): string {
  return process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "";
}

export function unsubscribeToken(userId: string): string {
  return createHmac("sha256", secret()).update(userId).digest("hex");
}

export function verifyUnsubscribeToken(userId: string, token: string): boolean {
  if (!userId || !token || !secret()) return false;
  const expected = unsubscribeToken(userId);
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

// Absolute unsubscribe URL for a given user, used in email footers.
export function unsubscribeUrl(userId: string): string {
  const base = (process.env.NEXTAUTH_URL ?? "").replace(/\/$/, "");
  const token = unsubscribeToken(userId);
  return `${base}/unsubscribe?u=${encodeURIComponent(userId)}&sig=${token}`;
}
