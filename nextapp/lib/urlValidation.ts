// Shared URL validation utilities

const PRIVATE_IP_RE =
  /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|169\.254\.|0\.|::1|fc00:|fd[0-9a-f]{2}:)/i;

export function isSafeWebhookUrl(raw: string): boolean {
  if (!raw) return false;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    const host = parsed.hostname;
    if (host === "localhost" || PRIVATE_IP_RE.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

export function isSafeSurveyUrl(raw: string | undefined | null): boolean {
  if (!raw) return true; // empty/missing URL is allowed (optional field)
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function sanitizeSurveyUrl(raw: string | undefined | null): string {
  if (!raw) return "";
  return isSafeSurveyUrl(raw) ? raw : "";
}
