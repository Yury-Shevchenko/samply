/**
 * Versions of the legal documents participants/researchers consent to.
 *
 * Bump the relevant constant whenever the corresponding document changes in a
 * way that requires re-consent. Consent records store the version that was
 * accepted; when a subject's latest accepted version is older than the current
 * one, they should be asked to re-consent.
 *
 * IMPORTANT: keep these in sync with the Express copy in
 * Website/config/consent.js (the two codebases share the consentrecords
 * collection but cannot import across each other).
 */
export const TERMS_VERSION = "2024-12-03";
export const POLICY_VERSION = "2026-06-18";

export type ConsentType = "terms" | "privacy" | "study" | "geolocation";
