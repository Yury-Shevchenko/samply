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
// Canonical file first; legacy variables.env loaded second to fill gaps during
// the migration. dotenv does not override values already in process.env.
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
function isExpressPath(url) {
  const p = (url || "/").split("?")[0];
  if (p.startsWith("/api/auth/")) return false;
  if (p.startsWith("/api/stripe/")) return false;
  if (p.startsWith("/api/analytics/")) return false;
  if (p.startsWith("/api/")) return true;
  if (p.startsWith("/webapi/")) return true;
  if (p === "/save") return true;
  return false;
}

// ── Boot ─────────────────────────────────────────────────────────────────────
async function main() {
  await nextApp.prepare();

  const server = http.createServer((req, res) => {
    if (isExpressPath(req.url)) {
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
      await schedule.gracefulShutdown();
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
