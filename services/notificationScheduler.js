const mongoose = require("mongoose");
const PendingNotification = mongoose.model("PendingNotification");

const MAX_DOCS_PER_BATCH = 5_000;

class BatchLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = "BatchLimitError";
  }
}

// Insert an array of pre-computed notification documents.
// Each item should have: projectId, notificationConfigId, scheduledFor,
// recipientUserIds, recipientGroupIds, title, message, url, expireIn,
// timezone, useParticipantTimezone.
async function scheduleBatch(docs) {
  if (!docs || docs.length === 0) return { inserted: 0, skipped: 0 };
  const now = new Date();
  const future = docs.filter((d) => new Date(d.scheduledFor) > now);
  const skipped = docs.length - future.length;
  if (skipped > 0) {
    console.warn(`scheduleBatch: dropped ${skipped} past-dated doc(s) out of ${docs.length}`);
  }
  if (future.length === 0) return { inserted: 0, skipped };
  if (future.length > MAX_DOCS_PER_BATCH) {
    throw new BatchLimitError(
      `This operation would insert ${future.length.toLocaleString()} notifications at once (limit: ${MAX_DOCS_PER_BATCH.toLocaleString()}). Reduce the date range, participant count, or notification frequency.`
    );
  }
  await PendingNotification.insertMany(future);
  return { inserted: future.length, skipped };
}

// Cancel all pending notifications for a specific notification config.
// Called when a researcher deletes or recreates a notification.
async function cancelByNotificationId(projectId, notificationConfigId) {
  await PendingNotification.updateMany(
    { projectId, notificationConfigId, status: "pending" },
    { $set: { status: "cancelled" } }
  );
}

// Cancel pending notifications targeted at a specific participant.
// Only cancels docs where recipientUserIds contains that participant —
// "all participants" docs (recipientUserIds: []) are left alone and will
// skip the deactivated user at send time.
async function cancelByParticipantId(projectId, participantId) {
  await PendingNotification.updateMany(
    { projectId, recipientUserIds: participantId, status: "pending" },
    { $set: { status: "cancelled" } }
  );
}

// Cancel a group of reminder notifications sharing the same finid.
// Called when a participant completes the associated survey.
async function cancelByFinid(projectId, finid) {
  await PendingNotification.updateMany(
    { projectId, finid, status: "pending" },
    { $set: { status: "cancelled" } }
  );
}

// Cancel all pending notifications for an entire project.
// Called when a project is deleted.
async function cancelByProjectId(projectId) {
  await PendingNotification.updateMany(
    { projectId, status: "pending" },
    { $set: { status: "cancelled" } }
  );
}

// Hard-delete all notifications for a specific notification config.
// Called when the config itself is deleted — no reason to keep any docs.
async function deleteByNotificationId(projectId, notificationConfigId) {
  await PendingNotification.deleteMany({ projectId, notificationConfigId });
}

// Hard-delete all notifications of a given status, optionally scoped to a project.
// Only "sent" and "cancelled" are permitted — protects active docs.
const DELETABLE_STATUSES = ["sent", "cancelled"];
async function deleteByStatus(status, projectId) {
  if (!DELETABLE_STATUSES.includes(status)) {
    throw new Error(`Deleting status "${status}" is not permitted`);
  }
  const filter = { status };
  if (projectId) filter.projectId = projectId;
  const result = await PendingNotification.deleteMany(filter);
  return result.deletedCount;
}

module.exports = {
  scheduleBatch,
  cancelByNotificationId,
  cancelByParticipantId,
  cancelByFinid,
  cancelByProjectId,
  deleteByNotificationId,
  deleteByStatus,
  BatchLimitError,
};
