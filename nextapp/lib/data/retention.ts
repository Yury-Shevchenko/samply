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
  try {
    await db.command({
      collMod: collection,
      index: { keyPattern: { created: 1 }, expireAfterSeconds },
    });
  } catch (err: unknown) {
    const isNotFound =
      (err instanceof Error && err.message.includes("not found")) ||
      // MongoDB error code 27 = IndexNotFound
      (typeof err === "object" && err !== null && "code" in err && (err as { code: number }).code === 27);

    if (isNotFound) {
      // Index doesn't exist yet — create it
      const coll = db.collection(collection);
      await coll.createIndex({ created: 1 }, { expireAfterSeconds, background: true });
    } else {
      throw err;
    }
  }
}
