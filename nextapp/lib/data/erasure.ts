import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import PendingNotification from "@/lib/models/pendingNotification";
import AgendaJob from "@/lib/models/agendaJob";
import ConsentRecord from "@/lib/models/consentRecord";
import User from "@/lib/models/user";

export interface PurgeProjectResult {
  results: number;
  pending: number;
  jobs: number;
  consent: number;
}

/**
 * Delete every record that references a project (GDPR Art. 17), for use when a
 * study is deleted. Without this, deleting a Project leaves orphaned responses,
 * queued notifications, Agenda jobs, and consent records behind indefinitely.
 *
 * Note: `data.projectid` on Agenda jobs has been stored as both a string and an
 * ObjectId over the project's history, so both forms are matched.
 */
export async function purgeProjectData(projectId: string): Promise<PurgeProjectResult> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  const [results, pending, jobs, consent] = await Promise.all([
    Result.deleteMany({ project: oid }),
    PendingNotification.deleteMany({ projectId: oid }),
    AgendaJob.deleteMany({ "data.projectid": { $in: [projectId, oid] } }),
    ConsentRecord.deleteMany({ projectId: oid }),
  ]);

  // Remove now-dangling references to this project from participant accounts.
  await User.updateMany(
    { "participant_projects._id": { $in: [oid, projectId] } },
    { $pull: { participant_projects: { _id: { $in: [oid, projectId] } } } },
  );

  return {
    results: (results as { deletedCount?: number }).deletedCount ?? 0,
    pending: (pending as { deletedCount?: number }).deletedCount ?? 0,
    jobs: (jobs as { deletedCount?: number }).deletedCount ?? 0,
    consent: (consent as { deletedCount?: number }).deletedCount ?? 0,
  };
}

/**
 * Stop all future notifications for one participant in one study and withdraw
 * their consent for it — used when a researcher unenrolls a participant. This
 * deliberately does NOT delete already-collected responses (Result documents):
 * removing someone from active enrolment is not the same as erasing the data the
 * study has lawfully collected, and researchers expect to keep it. Full erasure
 * of a participant's responses happens on participant-initiated account deletion
 * (handled in the Express mobile API).
 */
export async function purgeParticipantSchedules(samplyId: string, projectId: string): Promise<void> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);

  await Promise.all([
    PendingNotification.deleteMany({ projectId: oid, recipientUserIds: samplyId }),
    AgendaJob.deleteMany({
      "data.projectid": { $in: [projectId, oid] },
      "data.userid": { $in: [samplyId, [samplyId]] },
    }),
    ConsentRecord.updateMany(
      { samplyId, projectId: oid, type: { $in: ["study", "geolocation"] }, withdrawnAt: null },
      { $set: { withdrawnAt: new Date() } },
    ),
  ]);
}
