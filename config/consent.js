/**
 * Versions of the legal documents participants/researchers consent to (Express
 * side). Keep in sync with Website/nextapp/lib/consent.ts — the two codebases
 * share the consentrecords collection but cannot import across each other.
 *
 * Bump a version when the corresponding document changes in a way that requires
 * re-consent; consent records store the accepted version so re-consent can be
 * detected.
 */
module.exports = {
  TERMS_VERSION: "2024-12-03",
  POLICY_VERSION: "2026-06-18",
};
