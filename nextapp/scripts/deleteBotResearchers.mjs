/**
 * Delete bot researcher signups by fingerprint.
 *
 * The May 24-26 2026 spam wave shares a distinctive pattern: name is exactly
 * 10 random lowercase letters, email never confirmed, no projects, no results.
 * Real researchers always have mixed-case names with spaces (e.g. "Julia Bobe",
 * "Hye Lin Kim"), so /^[a-z]{10}$/ is bot-specific.
 *
 * Dry run (default) — prints matches, makes no changes:
 *   node scripts/deleteBotResearchers.mjs
 *
 * Actually delete:
 *   node scripts/deleteBotResearchers.mjs --apply
 *
 * Each candidate is re-verified individually (level 11, unconfirmed,
 * zero projects as creator or member, zero results) before deletion.
 * Anything that fails any check is reported and skipped.
 */

import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load env ──────────────────────────────────────────────────────────────────

const __dir = dirname(fileURLToPath(import.meta.url));
const envCandidates = [".env.local", ".env.production", ".env"];
let envLoaded = null;
for (const name of envCandidates) {
  try {
    const path = resolve(__dir, "..", name);
    const text = readFileSync(path, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
    envLoaded = name;
    break;
  } catch {
    // try next candidate
  }
}

const uri = process.env.DATABASE || process.env.DATABASE_DEV;
if (!uri) {
  console.error(`DATABASE env var not set (tried ${envCandidates.join(", ")})`);
  process.exit(1);
}
console.log(`Loaded env from ${envLoaded ?? "process env"}`);

// ── Inline schemas (script has no TS/build dependency) ───────────────────────

const userSchema = new mongoose.Schema({}, { strict: false });
const projectSchema = new mongoose.Schema({}, { strict: false });
const resultSchema = new mongoose.Schema({}, { strict: false });

const User = mongoose.models.User || mongoose.model("User", userSchema, "users");
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema, "projects");
const Result = mongoose.models.Result || mongoose.model("Result", resultSchema, "results");

// ── Detection ─────────────────────────────────────────────────────────────────

const BOT_NAME = /^[a-z]{10}$/;

// ── Run ───────────────────────────────────────────────────────────────────────

const apply = process.argv.includes("--apply");
if (!apply) console.log("\n[dry run — pass --apply to actually delete]\n");

await mongoose.connect(uri);
console.log("Connected to MongoDB\n");

// Initial candidate set: researchers whose name matches the bot pattern and
// whose email is not confirmed. Per-user re-checks below catch anyone who
// slipped in despite the pattern (e.g. created a project after signup).
const candidates = await User.find({
  level: 11,
  name: { $regex: "^[a-z]{10}$" },
  $or: [{ emailIsConfirmed: { $ne: true } }, { emailIsConfirmed: { $exists: false } }],
})
  .select({ _id: 1, email: 1, name: 1, samplyId: 1, level: 1, emailIsConfirmed: 1, created: 1 })
  .lean();

console.log(`Found ${candidates.length} candidate(s) by name pattern.\n`);

let deleted = 0;
let skipped = 0;

for (const user of candidates) {
  const label = `${user.email}  (${user.samplyId}, name=${JSON.stringify(user.name)})`;

  if (user.level !== 11) {
    console.log(`  skip  ${label}  — level ${user.level}`);
    skipped++;
    continue;
  }
  if (user.emailIsConfirmed === true) {
    console.log(`  skip  ${label}  — email confirmed`);
    skipped++;
    continue;
  }
  if (!BOT_NAME.test(user.name ?? "")) {
    console.log(`  skip  ${label}  — name no longer matches`);
    skipped++;
    continue;
  }

  const createdProjects = await Project.countDocuments({ creator: user._id });
  const memberProjects = await Project.countDocuments({ members: user._id });
  const results = user.samplyId ? await Result.countDocuments({ samplyid: user.samplyId }) : 0;

  if (createdProjects > 0 || memberProjects > 0 || results > 0) {
    console.log(
      `  skip  ${label}  — created=${createdProjects} member=${memberProjects} results=${results}`,
    );
    skipped++;
    continue;
  }

  if (apply) {
    await User.deleteOne({ _id: user._id });
    console.log(`  del   ${label}`);
  } else {
    console.log(`  would ${label}`);
  }
  deleted++;
}

console.log(
  `\nDone — ${apply ? "deleted" : "would delete"} ${deleted}, skipped ${skipped}.`,
);
await mongoose.disconnect();
