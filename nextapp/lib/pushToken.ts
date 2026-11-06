/**
 * Whether a participant's stored token can actually receive a push.
 *
 * Mirrors `Expo.isExpoPushToken` from expo-server-sdk 3.10, which the Express
 * sender uses to decide whom to skip — nextapp does not depend on the SDK. The
 * participant table used to treat any non-empty value as a token, so "miss"
 * (what the app sends when a participant joins without allowing notifications)
 * was shown as "miss…", indistinguishable from a truncated real token.
 */
export function isPushToken(token: unknown): token is string {
  return (
    typeof token === "string" &&
    (((token.startsWith("ExponentPushToken[") || token.startsWith("ExpoPushToken[")) && token.endsWith("]")) ||
      /^[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}$/i.test(token))
  );
}
