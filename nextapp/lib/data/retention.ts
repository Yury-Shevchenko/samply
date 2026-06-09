import connectDB from "@/lib/db";

export const PENDING_TTL_SECONDS = 2_592_000;   // 30 days
export const RESULTS_TTL_SECONDS = 31_536_000;  // 365 days

// When disabled: ~68 years — MongoDB TTL index exists but never fires
const DISABLED_TTL = 2_147_483_647;

export async function getRetentionCounts(): Promise<{ pendingEligible: number; resultsEligible: number }> {
  await connectDB();
  const [PendingNotification, Result] = await Promise.all([
    import("@/lib/models/pendingNotification").then((m) => m.default),
    import("@/lib/models/result").then((m) => m.default),
  ]);

  const now = Date.now();
  const [pendingEligible, resultsEligible] = await Promise.all([
    PendingNotification.countDocuments({ created: { $lt: new Date(now - PENDING_TTL_SECONDS * 1000) } }),
    Result.countDocuments({ created: { $lt: new Date(now - RESULTS_TTL_SECONDS * 1000) } }),
  ]);

  return { pendingEligible, resultsEligible };
}

export async function applyTTLIndexes(enabled: boolean): Promise<void> {
  await connectDB();
  const mongoose = (await import("mongoose")).default;
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB not connected");

  const pendingTTL = enabled ? PENDING_TTL_SECONDS : DISABLED_TTL;
  const resultsTTL = enabled ? RESULTS_TTL_SECONDS : DISABLED_TTL;

  await Promise.all([
    applyOneCollection(db, "pendingnotifications", pendingTTL),
    applyOneCollection(db, "results", resultsTTL),
  ]);
}

async function applyOneCollection(
  db: import("mongoose").mongo.Db,
  collection: string,
  expireAfterSeconds: number
): Promise<void> {
  // We deliberately avoid the `collMod` command here: it requires the `dbAdmin`
  // role, whereas a typical application user only has `readWrite`. Both
  // `createIndex` and `dropIndex` are granted by `readWrite`, so to change an
  // existing TTL value we drop the index and recreate it.
  const coll = db.collection(collection);

  const indexes = await coll.indexes();
  const existing = indexes.find(
    (ix) =>
      ix.key &&
      Object.keys(ix.key).length === 1 &&
      (ix.key as Record<string, unknown>).created === 1
  );

  if (existing) {
    // Already the desired TTL — nothing to do.
    if (existing.expireAfterSeconds === expireAfterSeconds) return;
    // Different TTL (or a non-TTL index on `created`): drop and recreate, since
    // MongoDB won't let you redefine an existing index with different options.
    await coll.dropIndex(existing.name as string);
  }

  await coll.createIndex({ created: 1 }, { expireAfterSeconds });
}
