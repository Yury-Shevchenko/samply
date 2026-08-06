/**
 * Versions surfaced to researchers, chiefly for citation.
 *
 * Kept here rather than read from package.json at request time so the values are
 * explicit and reviewable: `nextapp/package.json` still says 0.1.0 and the
 * Express package says 1.0.0, neither of which is the number anyone would want
 * in a reference list. The releases people actually run are tagged in the
 * Website repository (2.0.x) and in the mobile app's own config.
 *
 * Update APP_VERSION when a new build reaches the stores, and PLATFORM_VERSION
 * on each web release. As of 2.1.0 the two are deliberately kept in sync, so a
 * citation names one version rather than two.
 */

/** Mobile app version, mirroring App/app.json → expo.version. */
export const APP_VERSION = "2.1.0";

/** Web platform version, mirroring the Website release tag. */
export const PLATFORM_VERSION = "2.1.0";
