"use strict";

/**
 * Canonical placeholder vocabulary and URL substitution.
 *
 * Every server-side send path routes through here. Before this module existed
 * there were three independent implementations (notificationSender,
 * jobController, hookController) plus a fourth in the mobile app, each
 * supporting a different set of names, and all of them broken in the same three
 * ways:
 *
 *  1. They used String.replace() with a *string* pattern, which replaces only
 *     the first occurrence. A researcher who wrote the placeholder twice got one
 *     substitution and one literal `%SAMPLY_ID%` handed to their survey tool.
 *  2. They never URL-encoded the value. A participant code containing `&`, `#`
 *     or a space silently corrupted every parameter after it.
 *  3. When a value was missing they left the raw placeholder in the URL. Groups
 *     are optional, so `group=%GROUP_ID%` shipped literally for every ungrouped
 *     participant — and `%GR` is not a valid percent-escape, so strict decoders
 *     could reject the whole query string and take the participant ID with it.
 *
 * The mobile app carries a deliberate copy of this vocabulary in
 * App/utils/placeholders.js — it is a separate package with its own bundler, so
 * the list is duplicated rather than shared. nextapp/lib/placeholders.ts holds
 * the authoring-time validator and mirrors the same names; a test asserts all
 * three agree.
 */

/** Placeholders the send paths know how to fill. */
const CANONICAL = [
  "SAMPLY_ID",
  "PARTICIPANT_CODE",
  "MESSAGE_ID",
  "GROUP_ID",
  "TIMESTAMP_SENT",
  "BATCH",
];

/**
 * Older or path-specific spellings that must keep working. `%GROUP_CODE%` was
 * only ever implemented on the hook path but was advertised by the schedule
 * editor's own help text; `%TIMESTAMP%` was only ever implemented in the mobile
 * app but appears throughout the docs. Studies configured against either
 * spelling must not break.
 */
const ALIAS_TO_CANONICAL = {
  GROUP_CODE: "GROUP_ID",
  TIMESTAMP: "TIMESTAMP_SENT",
};

/** Matches a `%NAME%` token. Deliberately also matches things like `%20%`. */
const TOKEN_RE = /%([A-Z0-9_]+)%/g;

/**
 * Resolves a token's inner name to its canonical form, or null if we do not
 * recognise it. Unknown names are left untouched at send time — they may be
 * another system's syntax, or a literal — and are flagged at authoring time
 * instead, where there is a human to ask.
 */
function canonicalName(name) {
  if (CANONICAL.indexOf(name) !== -1) return name;
  return Object.prototype.hasOwnProperty.call(ALIAS_TO_CANONICAL, name)
    ? ALIAS_TO_CANONICAL[name]
    : null;
}

/** Every recognised `%TOKEN%` in the string, in order, with duplicates. */
function findTokens(url) {
  if (typeof url !== "string") return [];
  const found = [];
  TOKEN_RE.lastIndex = 0;
  let m;
  while ((m = TOKEN_RE.exec(url)) !== null) {
    const canonical = canonicalName(m[1]);
    if (canonical) found.push({ token: m[0], name: m[1], canonical, index: m.index });
  }
  return found;
}

/** Literal, global replace. Avoids regex escaping and old-engine replaceAll. */
function replaceAllLiteral(haystack, needle, replacement) {
  return haystack.split(needle).join(replacement);
}

/**
 * Removes any `key=value` pair from the query string whose value still contains
 * `token`. Dropping the parameter is better than sending it empty: the survey
 * tool sees a parameter that simply is not there, rather than an embedded-data
 * field silently set to "" that looks like a real (blank) answer.
 */
function dropParamsContaining(url, token) {
  const q = url.indexOf("?");
  if (q === -1) return url;

  const hashAt = url.indexOf("#", q);
  const query = hashAt === -1 ? url.slice(q + 1) : url.slice(q + 1, hashAt);
  const tail = hashAt === -1 ? "" : url.slice(hashAt);

  const kept = query.split("&").filter((pair) => pair !== "" && pair.indexOf(token) === -1);
  return kept.length ? url.slice(0, q + 1) + kept.join("&") + tail : url.slice(0, q) + tail;
}

/**
 * Fills every recognised placeholder in `url`.
 *
 * `values` is keyed by canonical name. A value that is undefined, null or empty
 * counts as unavailable: its query parameter is dropped, and any occurrence
 * outside the query string is removed. Available values are URL-encoded.
 *
 * Returns "" for a missing/non-string url so callers never hand `undefined` to
 * the push payload.
 */
function substitutePlaceholders(url, values) {
  if (typeof url !== "string" || url === "") return "";
  if (url.indexOf("%") === -1) return url;

  const vals = values || {};
  const resolved = new Map();
  const unresolved = new Set();

  for (const { token, canonical } of findTokens(url)) {
    if (resolved.has(token) || unresolved.has(token)) continue;
    const raw = vals[canonical];
    if (raw === undefined || raw === null || raw === "") unresolved.add(token);
    else resolved.set(token, encodeURIComponent(String(raw)));
  }

  let out = url;

  // Drop dependent parameters first, so we do not encode a value into a pair we
  // are about to delete anyway.
  for (const token of unresolved) out = dropParamsContaining(out, token);
  for (const [token, encoded] of resolved) out = replaceAllLiteral(out, token, encoded);
  // Anything left is outside the query string (path or fragment): strip it
  // rather than emit a broken percent-escape.
  for (const token of unresolved) out = replaceAllLiteral(out, token, "");

  return out;
}

module.exports = {
  CANONICAL,
  ALIAS_TO_CANONICAL,
  canonicalName,
  findTokens,
  substitutePlaceholders,
  dropParamsContaining,
};
