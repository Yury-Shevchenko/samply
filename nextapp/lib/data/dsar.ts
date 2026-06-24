import mongoose from "mongoose";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import Result from "@/lib/models/result";
import ConsentRecord from "@/lib/models/consentRecord";
import Receipt from "@/lib/models/receipt";

/**
 * Assemble a complete machine-readable copy of one data subject's personal data
 * for a Subject Access / Data Portability request (GDPR Arts. 15 & 20).
 *
 * Returns the account profile (minus credentials and device secrets), all
 * survey/notification responses keyed by the user's Samply ID, the consent
 * audit trail, and any payment receipts. Returns null if the user is not found.
 */
export async function exportParticipantData(userId: string) {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(userId);

  // Exclude credentials, recovery tokens, and web-push subscription keys
  // (device secrets) — none of which belong in a data export.
  const user = (await User.findById(userId, {
    "local.password": 0,
    resetPasswordToken: 0,
    resetPasswordExpires: 0,
    confirmEmailToken: 0,
    confirmEmailExpires: 0,
    notifications: 0,
  }).lean()) as { samplyId?: string } | null;

  if (!user) return null;
  const samplyId = user.samplyId;

  const [responses, consent, receipts] = await Promise.all([
    samplyId ? Result.find({ samplyid: samplyId }).lean() : Promise.resolve([]),
    ConsentRecord.find({
      $or: [{ samplyId: samplyId ?? null }, { userId: oid }],
    }).lean(),
    Receipt.find({ $or: [{ payer: oid }, { payee: oid }] }).lean(),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    notice:
      "This file contains the personal data Samply holds about you. Credentials and device push keys are excluded for security.",
    account: user,
    responses,
    consent,
    receipts,
  };
}
