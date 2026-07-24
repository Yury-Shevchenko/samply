// Combined Express + Next.js entry point.
//
// Single Node process hosts both apps:
//   - Express: /api/* (mobile), /webapi/*, /save
//   - Next.js: everything else (incl. /api/auth, /api/stripe, /api/analytics, /uploads)
//
// Path dispatch happens BEFORE any Express middleware runs, so Express
// body-parsers never consume the request stream for Next.js-owned paths.
//
// In-process workers:
//   - notificationCron
//   - Agenda (started inside ./app via require("./controllers/jobController"))

const path = require("path");
const http = require("http");
const dotenv = require("dotenv");

// ── Env loading ───────────────────────────────────────────────────────────────
// Canonical file is nextapp/.env.{production,local}. The legacy variables.env
// is loaded second only as a fallback for any value not yet migrated; dotenv
// no-ops if the file is absent and never overrides values already set. Once
// every var lives in the canonical file, variables.env can be deleted safely.
const isProd = process.env.NODE_ENV === "production";
const canonicalEnv = isProd ? "nextapp/.env.production" : "nextapp/.env.local";
dotenv.config({ path: path.join(__dirname, canonicalEnv) });
dotenv.config({ path: path.join(__dirname, "variables.env") });

// ── Node version guard (preserved from start.js) ─────────────────────────────
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major <= 7 && minor <= 5) {
  console.error(
    "Node 7.6+ required. Please upgrade from nodejs.org."
  );
  process.exit(1);
}

// ── Database ─────────────────────────────────────────────────────────────────
const mongoose = require("mongoose");
const databaseUrl = isProd ? process.env.DATABASE : process.env.DATABASE_DEV;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});

// Models — must be registered before app.js loads
require("./models/User");
require("./models/Result");
require("./models/Project");
require("./models/Job");
require("./models/Receipt");
require("./models/PendingNotification");
require("./models/ConsentRecord");

// Background notification poller
require("./services/notificationCron").start();

// ── Express app ──────────────────────────────────────────────────────────────
const expressApp = require("./app");
// Capture the Agenda instance for graceful shutdown.
const { agenda } = require("./controllers/jobController");

// ── Next.js app ──────────────────────────────────────────────────────────────
const next = require("./nextapp/node_modules/next");
const nextApp = next({
  dev: !isProd,
  dir: path.join(__dirname, "nextapp"),
});
const nextHandle = nextApp.getRequestHandler();

// ── Path dispatch ────────────────────────────────────────────────────────────
// Returns true iff the request should be served by Express (not Next.js).
// Carve-outs for Next.js-owned /api/* sub-prefixes MUST come first.
function isExpressPath(url, method, headers) {
  const p = (url || "/").split("?")[0];
  if (p.startsWith("/api/auth/")) return false;
  if (p.startsWith("/api/stripe/")) return false;
  if (p.startsWith("/api/analytics/")) return false;
  if (p.startsWith("/api/")) return true;
  if (p.startsWith("/webapi/")) return true;
  if (p === "/save") return true;
  // Legacy Stripe webhook for participant payouts (Connect account.updated,
  // charge.succeeded → Receipt). Distinct from Next.js /api/stripe/webhook,
  // which handles donations. Must stay on Express.
  if (p === "/payment/webhook") return true;
  // Survey-tool completion webhook: POST /studies/:slug/done/:messageid. The
  // matching GET renders the Next.js confirmation page, so only the POST is
  // handed to Express. External webhooks never carry a next-action header, and
  // the Next.js done page has no Server Action, so no collision to guard.
  if (method === "POST" && /^\/studies\/[^/]+\/done\/[^/]+\/?$/.test(p)) return true;
  // Auth/account backends the Next.js app POSTs to server-side (register,
  // password reset, email confirmation). The matching GET pages (reset/confirm
  // forms) live in Next.js, so only POSTs are routed to Express here.
  //
  // A Next.js Server Action submits from the browser as a POST to the SAME URL
  // as its page, tagged with a `next-action` header. The reset page lives at
  // /account/reset/[token], so its action POST collides with the Express
  // backend path below. Such action POSTs MUST stay on Next.js — only the plain
  // server-to-server form POSTs the Next action makes (no `next-action` header)
  // belong to Express. Without this guard the browser's action submission is
  // handed to Express, which redirects with HTML and the client throws
  // "An unexpected response was received from the server." (Next error E394).
  if (method === "POST" && !(headers && headers["next-action"])) {
    if (p === "/auth/researcher/email/register") return true;
    if (p === "/account/forgot") return true;
    if (p === "/account/confirm") return true;
    if (p.startsWith("/account/reset/")) return true;
  }
  return false;
}

// ── Boot ─────────────────────────────────────────────────────────────────────
async function main() {
  await nextApp.prepare();

  const server = http.createServer((req, res) => {
    if (isExpressPath(req.url, req.method, req.headers)) {
      return expressApp(req, res);
    }
    return nextHandle(req, res);
  });

  const port = parseInt(process.env.PORT, 10) || 3000;
  server.listen(port, () => {
    console.log(
      `samply: combined server listening on :${port} (${isProd ? "production" : "development"})`
    );
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`samply: ${signal} received — shutting down`);
    server.close(() => console.log("samply: HTTP server closed"));
    try {
      if (agenda && typeof agenda.stop === "function") {
        await agenda.stop();
        console.log("samply: agenda stopped");
      }
    } catch (err) {
      console.error("samply: agenda stop failed", err);
    }
    try {
      const schedule = require("node-schedule");
      // The installed node-schedule version does not export gracefulShutdown();
      // cancel every scheduled job directly instead (supported API).
      if (typeof schedule.gracefulShutdown === "function") {
        await schedule.gracefulShutdown();
      } else {
        Object.values(schedule.scheduledJobs || {}).forEach((job) => job.cancel());
      }
      console.log("samply: node-schedule jobs cancelled");
    } catch (err) {
      console.error("samply: node-schedule shutdown failed", err);
    }
    try {
      await mongoose.disconnect();
      console.log("samply: mongoose disconnected");
    } catch (err) {
      console.error("samply: mongoose disconnect failed", err);
    }
    process.exit(0);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((err) => {
  console.error("samply: fatal startup error", err);
  process.exit(1);
});
