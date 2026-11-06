// Run with: node --experimental-strip-types lib/pushToken.test.ts  (from nextapp/)
import { createRequire } from "node:module";
import { isPushToken } from "./pushToken.ts";

const require_ = createRequire(import.meta.url);

let pass = 0, fail = 0;
function eq(name: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got :", JSON.stringify(got)); console.log("   want:", JSON.stringify(want)); fail++; } else pass++;
}

// ── What the dashboard must flag ─────────────────────────────────────────────
eq('"miss" is not a token', isPushToken("miss"), false);
eq("the legacy leaver marker is not a token", isPushToken("User left the study"), false);
eq("an empty value is not a token", isPushToken(""), false);
eq("a missing value is not a token", isPushToken(undefined), false);
eq("a truncated token is not a token", isPushToken("ExponentPushToken[abc"), false);

// ── What it must not flag ────────────────────────────────────────────────────
eq("an Exponent token is a token", isPushToken("ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"), true);
eq("an Expo token is a token", isPushToken("ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]"), true);
eq("the UUID form is a token", isPushToken("12345678-abcd-ef01-2345-6789abcdef01"), true);

// ── Agrees with the SDK the sender uses ──────────────────────────────────────
// The Express sender skips exactly the tokens Expo.isExpoPushToken rejects; if
// the two drifted, the dashboard would show reachable participants as broken
// or the reverse.
let Expo: { isExpoPushToken(t: unknown): boolean } | null = null;
try {
  Expo = require_("../../node_modules/expo-server-sdk").Expo;
} catch {
  console.log("SKIP SDK comparison: Website/node_modules/expo-server-sdk not installed");
}
if (Expo) {
  const samples = [
    "miss", "User left the study", "", "ExponentPushToken[", "ExponentPushToken[]", "ExponentPushToken[a]",
    "ExpoPushToken[a]", "exponentpushtoken[a]", "ExponentPushToken[a] ", "12345678-abcd-ef01-2345-6789abcdef01",
    "12345678-abcd-ef01-2345-6789abcdef0", "1234567g-abcd-ef01-2345-6789abcdef01", "null",
  ];
  eq("matches Expo.isExpoPushToken on every sample",
    samples.filter((t) => isPushToken(t) !== Expo!.isExpoPushToken(t)), []);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
