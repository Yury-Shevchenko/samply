"use strict";

/**
 * Reading a completion message id out of a survey tool's callback.
 *
 * Samply's canonical completion endpoint carries the message id as a path
 * segment — /studies/<study-code>/done/<message-id>. Tools that can only append
 * their captured variables to a static base URL (SurveyMonkey, Nettskjema) send
 * it as a query parameter instead, and a relay built around one of those tools
 * naturally POSTs the same shape. This module is what the Express webhook uses
 * to accept that form.
 *
 * The authoring-side twin is nextapp/lib/completion.ts, which serves the GET
 * redirect page. nextapp is a separate package with its own bundler, so the two
 * are deliberate copies rather than a shared import — the same arrangement as
 * placeholders.js. nextapp/lib/completion.test.ts asserts they agree.
 */

/**
 * Query/body keys accepted as the message id, matched case-insensitively and
 * tried in this order so a request carrying more than one resolves the same way
 * regardless of the order they arrived in. Keep in sync with the TS twin.
 */
const MESSAGE_ID_QUERY_KEYS = ["messageid", "message_id", "msgid", "msg"];

/**
 * Live ids are `nanoid(15)` over an alphanumeric alphabet, but rows written by a
 * long-retired generator are shaped `mes-3f4-a1b-...`, so hyphens must pass.
 * A hygiene bound on an untrusted value, not a format assertion.
 */
const MESSAGE_ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

function isValidMessageId(value) {
  return typeof value === "string" && MESSAGE_ID_RE.test(value);
}

/**
 * Finds the message id among a set of request parameters, or null when none of
 * the accepted keys carries a usable value. Unrecognised keys are ignored — the
 * tool's own bookkeeping rides along with these callbacks as a matter of course.
 */
function messageIdFromParams(params) {
  if (!params || typeof params !== "object") return null;

  const byLowerKey = new Map();
  for (const key of Object.keys(params)) {
    const lower = key.toLowerCase();
    if (!byLowerKey.has(lower)) byLowerKey.set(lower, params[key]);
  }

  for (const key of MESSAGE_ID_QUERY_KEYS) {
    const raw = byLowerKey.get(key);
    const value = Array.isArray(raw) ? raw[0] : raw;
    const trimmed = typeof value === "string" ? value.trim() : value;
    if (isValidMessageId(trimmed)) return trimmed;
  }
  return null;
}

module.exports = {
  MESSAGE_ID_QUERY_KEYS,
  MESSAGE_ID_RE,
  isValidMessageId,
  messageIdFromParams,
};
