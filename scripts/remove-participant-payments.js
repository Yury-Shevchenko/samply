#!/usr/bin/env node
/**
 * One-off migration: purge the researcher→participant payment (Stripe Connect)
 * data left behind after the feature was removed from the code.
 *
 * It does three things:
 *   1. unsets `stripeAccountId` / `stripeInformation` on users
 *   2. unsets the per-participant `mobileUsers.$[].stripe` blob on projects
 *   3. drops the `receipts` collection
 *
 * Audit-log rows (`view_payout` / `view_receipts`) are intentionally KEPT — they
 * are access records, not payment data, and the admin audit page renders unknown
 * actions verbatim.
 *
 * Usage:
 *   node scripts/remove-participant-payments.js --dry-run   # report only
 *   node scripts/remove-participant-payments.js             # apply
 */

require("dotenv").config({ path: `${__dirname}/../variables.env` });
const mongoose = require("mongoose");

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  const uri = process.env.DATABASE;
  if (!uri) throw new Error("DATABASE is not set (expected in variables.env)");

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection.db;
  console.log(`connected to ${db.databaseName}${DRY_RUN ? "  [DRY RUN]" : ""}\n`);

  // ── 1. users ───────────────────────────────────────────────────────────────
  const userFilter = {
    $or: [
      { stripeAccountId: { $exists: true } },
      { stripeInformation: { $exists: true } },
    ],
  };
  const userCount = await db.collection("users").countDocuments(userFilter);
  console.log(`users with stripe fields: ${userCount}`);
  if (!DRY_RUN && userCount) {
    const r = await db.collection("users").updateMany(userFilter, {
      $unset: { stripeAccountId: "", stripeInformation: "" },
    });
    console.log(`  -> modified ${r.modifiedCount}`);
  }

  // ── 2. projects (per-participant stripe blob inside mobileUsers) ───────────
  const projFilter = { "mobileUsers.stripe": { $exists: true } };
  const projCount = await db.collection("projects").countDocuments(projFilter);
  console.log(`projects with mobileUsers.stripe: ${projCount}`);
  if (!DRY_RUN && projCount) {
    const r = await db
      .collection("projects")
      .updateMany(projFilter, { $unset: { "mobileUsers.$[].stripe": "" } });
    console.log(`  -> modified ${r.modifiedCount}`);
  }

  // ── 3. receipts collection ────────────────────────────────────────────────
  const names = await db.listCollections({ name: "receipts" }).toArray();
  if (names.length) {
    const n = await db.collection("receipts").countDocuments();
    console.log(`receipts collection: ${n} document(s)`);
    if (!DRY_RUN) {
      await db.collection("receipts").drop();
      console.log("  -> dropped");
    }
  } else {
    console.log("receipts collection: absent");
  }

  console.log(DRY_RUN ? "\ndry run complete — nothing written" : "\ndone");
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
