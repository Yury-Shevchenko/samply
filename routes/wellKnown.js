const express = require("express");
const router = express.Router();

/**
 * Association files for iOS Universal Links and Android App Links.
 *
 * These are what let a tapped `https://samply.uni-konstanz.de/studies/<code>`
 * link open the app directly instead of the browser. Without them the app
 * declares only the `samply://` custom scheme, which nothing outside the app can
 * produce — so study invitations pasted into WhatsApp always landed on the web
 * page, and participants had to install the app and then hunt for the study by
 * typing its code. Several groups reported that friction; two named it as a
 * plausible source of sampling bias.
 *
 * Both files are generated from configuration rather than committed, because
 * each embeds a credential-ish identifier that differs per signing setup:
 *
 *   IOS_TEAM_ID          Apple Developer Team ID, e.g. "A1B2C3D4E5".
 *                        Membership → Team ID in the developer portal.
 *   ANDROID_CERT_SHA256  SHA-256 fingerprint(s) of the *signing* certificate,
 *                        colon-separated hex. Comma-separate several.
 *                        With Play App Signing there are normally TWO — the
 *                        upload key and the Play-managed app signing key — and
 *                        BOTH must appear here or verification fails for some
 *                        install sources. Play Console → Setup → App integrity.
 *
 * When a value is missing the route returns 404 rather than an incomplete file.
 * That is deliberate: Apple caches these aggressively via its CDN, so serving a
 * malformed association is worse and longer-lived than serving none.
 */

const IOS_BUNDLE_ID = process.env.IOS_BUNDLE_ID || "org.js.samply";
const ANDROID_PACKAGE = process.env.ANDROID_PACKAGE || "org.js.samply";

// Paths the app should claim. Everything else on the domain stays in the
// browser — notably the docs and the researcher dashboard, which have no
// in-app equivalent.
const CLAIMED_PATHS = ["/studies/*"];

router.get("/.well-known/apple-app-site-association", (req, res) => {
  const teamId = process.env.IOS_TEAM_ID;
  if (!teamId) {
    return res
      .status(404)
      .type("application/json")
      .send(JSON.stringify({ error: "IOS_TEAM_ID is not configured on this server" }));
  }

  // Served with the legacy `appID` + `paths` shape, which every iOS version
  // that supports Universal Links understands. Must be application/json, must
  // not redirect, and must not sit behind authentication.
  const body = {
    applinks: {
      apps: [],
      details: [{ appID: `${teamId}.${IOS_BUNDLE_ID}`, paths: CLAIMED_PATHS }],
    },
  };

  res.type("application/json").send(JSON.stringify(body));
});

router.get("/.well-known/assetlinks.json", (req, res) => {
  const raw = process.env.ANDROID_CERT_SHA256;
  if (!raw) {
    return res
      .status(404)
      .type("application/json")
      .send(JSON.stringify({ error: "ANDROID_CERT_SHA256 is not configured on this server" }));
  }

  const fingerprints = raw
    .split(",")
    .map((f) => f.trim().toUpperCase())
    .filter(Boolean);

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: ANDROID_PACKAGE,
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ];

  res.type("application/json").send(JSON.stringify(body));
});

module.exports = router;
