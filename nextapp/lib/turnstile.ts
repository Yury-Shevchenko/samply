// Server-side verification for Cloudflare Turnstile tokens.
//
// If TURNSTILE_SECRET_KEY is not set, verification is skipped and a warning is
// logged — this keeps dev environments working without setup. In production,
// always set the secret so registration is actually protected.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

let warned = false;

export async function verifyTurnstile(token: string | null | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (!warned) {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — bot protection disabled");
      warned = true;
    }
    return true;
  }

  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verification request failed:", err);
    return false;
  }
}
