#!/usr/bin/env node
/**
 * Removes `results` rows that have no `project`.
 *
 * Where they came from: /api/updatestatus used to run findOneAndUpdate with
 * `upsert: true`, so a status POST quoting a message id that did not exist
 * created a brand-new Result containing nothing but that message id and an
 * events array — no project, no samplyid, no `created` date. They are invisible
 * to every project-scoped analytics view and to every date-windowed query, so
 * they are pure noise. The upsert was removed in Tier 4 Phase 1; this clears
 * what accumulated before that.
 *
 * Safety:
 *   - Dry run by DEFAULT. Deleting needs an explicit --apply.
 *   - --backup writes the full documents to a JSON file before anything is
 *     removed, so the operation is reversible.
 *   - Only rows matching the upsert signature (no project AND no created) are
 *     removed unless --include-dated is given. A row with no project but a real
 *     `created` date came from somewhere else and deserves a look first.
 *
 * Usage, from Website/:
 *   node scripts/remove-orphan-results.js                          # report only
 *   node scripts/remove-orphan-results.js --backup=orphans.json    # report + save
 *   node scripts/remove-orphan-results.js --backup=orphans.json --apply
 */

const path = require("path");
const fs = require("fs");

// Same precedence the server uses: nextapp/.env.production wins.
const ENV_CANDIDATES = [
  path.join(__dirname, "../nextapp/.env.production"),
  path.join(__dirname, "../nextapp/.env.local"),
  path.join(__dirname, "../variables.env"),
];
for (const file of ENV_CANDIDATES) {
  if (fs.existsSync(file) && !process.env.DATABASE) {
    require("dotenv").config({ path: file });
  }
}

const argv = process.argv.slice(2);
const has = (f) => argv.includes(`--${f}`);
const val = (f) => {
  const hit = argv.find((a) => a.startsWith(`--${f}=`));
  return hit ? hit.slice(f.length + 3) : null;
};

const APPLY = has("apply");
const INCLUDE_DATED = has("include-dated");
const BACKUP = val("backup");
const uri = val("uri") || process.env.DATABASE;

if (!uri) {
  console.error("No database URI. Set DATABASE in the environment or pass --uri=...");
  process.exit(2);
}

const n = (x) => Number(x || 0).toLocaleString("en-US");

(async () => {
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const results = mongoose.connection.db.collection("results");

  console.log(`database : ${mongoose.connection.db.databaseName}`);
  console.log(`mode     : ${APPLY ? "APPLY (will delete)" : "dry run (no changes)"}\n`);

  const noProject = { project: { $exists: false } };
  const upsertArtifact = { project: { $exists: false }, created: { $exists: false } };

  const [totalOrphans, artifacts] = await Promise.all([
    results.countDocuments(noProject),
    results.countDocuments(upsertArtifact),
  ]);
  const dated = totalOrphans - artifacts;

  console.log(`rows with no project        : ${n(totalOrphans)}`);
  console.log(`  ...and no 'created' date  : ${n(artifacts)}   (upsert artifacts)`);
  console.log(`  ...but WITH a date        : ${n(dated)}   (different origin — inspect first)`);

  if (totalOrphans === 0) {
    console.log("\nNothing to do.");
    await mongoose.disconnect();
    return;
  }

  // Show what these rows actually contain, so the operator is not deleting blind.
  const fieldCounts = new Map();
  const sample = await results.find(noProject).limit(2000).toArray();
  for (const doc of sample) {
    for (const k of Object.keys(doc)) fieldCounts.set(k, (fieldCounts.get(k) || 0) + 1);
  }
  console.log(`\nfields present (from ${n(sample.length)} sampled rows):`);
  for (const [k, c] of [...fieldCounts].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k.padEnd(22)} ${n(c)}`);
  }

  console.log("\nfirst 3 rows:");
  for (const doc of sample.slice(0, 3)) {
    const events = (doc.events || []).map((e) => e.status).join(",");
    console.log(`  _id=${doc._id}  messageId=${doc.messageId ?? "-"}  events=[${events}]`);
  }

  const filter = INCLUDE_DATED ? noProject : upsertArtifact;
  const target = INCLUDE_DATED ? totalOrphans : artifacts;

  if (dated > 0 && !INCLUDE_DATED) {
    console.log(`\nNote: ${n(dated)} dated orphan(s) will be LEFT ALONE. Pass --include-dated to remove them too.`);
  }

  if (target === 0) {
    console.log("\nNothing matches the deletion filter.");
    await mongoose.disconnect();
    return;
  }

  if (BACKUP) {
    const docs = await results.find(filter).toArray();
    fs.writeFileSync(BACKUP, JSON.stringify(docs, null, 2));
    console.log(`\nbacked up ${n(docs.length)} document(s) → ${BACKUP}`);
  }

  if (!APPLY) {
    console.log(`\nDry run: would delete ${n(target)} row(s).`);
    console.log("Re-run with --apply to delete." + (BACKUP ? "" : " Consider --backup=orphans.json first."));
    await mongoose.disconnect();
    return;
  }

  if (!BACKUP) {
    console.log("\nRefusing to delete without a backup. Re-run with --backup=<file>.");
    await mongoose.disconnect();
    process.exit(2);
  }

  const res = await results.deleteMany(filter);
  console.log(`\ndeleted ${n(res.deletedCount)} row(s).`);

  const remaining = await results.countDocuments(noProject);
  console.log(`rows with no project remaining: ${n(remaining)}`);

  await mongoose.disconnect();
})().catch((err) => {
  console.error("remove-orphan-results failed:", err.message);
  process.exit(2);
});
