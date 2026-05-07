const schedule = require("node-schedule");
const mongoose = require("mongoose");
const PendingNotification = mongoose.model("PendingNotification");
const Project = mongoose.model("Project");
const { sendMobileNotification } = require("./notificationSender");
const { cancelByProjectId } = require("./notificationScheduler");

let isRunning = false;

async function processOneNotification() {
  // Atomically claim one pending notification to prevent double-sends.
  const notification = await PendingNotification.findOneAndUpdate(
    { scheduledFor: { $lte: new Date() }, status: "pending" },
    { $set: { status: "processing" } },
    { new: true }
  );

  if (!notification) return false;

  try {
    const project = await Project.findOne(
      { _id: notification.projectId },
      { mobileUsers: 1, name: 1, settings: 1, notifications: 1 }
    );

    if (!project) {
      console.log(
        `notificationCron: project ${notification.projectId} not found — cancelling all its pending notifications`
      );
      await notification.updateOne({ status: "cancelled" });
      await cancelByProjectId(notification.projectId);
      return true;
    }

    // Resolve recipients from project.mobileUsers
    let userPool = project.mobileUsers || [];
    if (notification.recipientGroupIds.length > 0) {
      userPool = userPool.filter(
        (u) =>
          u.group && notification.recipientGroupIds.includes(u.group.id)
      );
    } else if (notification.recipientUserIds.length > 0) {
      userPool = userPool.filter((u) =>
        notification.recipientUserIds.includes(u.id)
      );
    }
    // empty recipientUserIds + empty recipientGroupIds = all participants

    const tokens = userPool.map((u) => ({
      id: u.id,
      token: u.token,
      username: u.username,
      group: u.group && u.group.id,
      deactivated: u.deactivated,
    }));

    // Look up reminder config from the notification definition (only for non-reminders)
    let reminders;
    if (!notification.isReminder) {
      const notifConfig = (project.notifications || []).find(
        (n) => n.id === notification.notificationConfigId
      );
      reminders = notifConfig && notifConfig.reminders;
    }

    await sendMobileNotification({
      content: {
        title: notification.title,
        message: notification.message,
        url: notification.url,
        expireIn: notification.expireIn,
      },
      tokens,
      project_id: notification.projectId,
      project_name: project.name,
      reminders,
      finishid: notification.finid,
      openStudyScreenFallback:
        project.settings && project.settings.enableActions,
    });

    await notification.updateOne({ status: "sent" });
  } catch (err) {
    console.error(
      "notificationCron: failed to process notification",
      notification._id,
      err
    );
    await notification.updateOne({ status: "failed" });
  }

  return true;
}

async function processAllDue() {
  if (isRunning) return;
  isRunning = true;
  try {
    // Keep processing until no more due notifications remain.
    // eslint-disable-next-line no-await-in-loop
    while (await processOneNotification()) {}
  } finally {
    isRunning = false;
  }
}

async function recoverStuckProcessing() {
  const result = await PendingNotification.updateMany(
    { status: "processing" },
    { $set: { status: "pending" } }
  );
  if (result.modifiedCount > 0) {
    console.warn(
      `notificationCron: recovered ${result.modifiedCount} stuck processing record(s) from previous session`
    );
  }
}

function start() {
  // Reset any records left in "processing" by a previous crashed session.
  recoverStuckProcessing().catch((err) =>
    console.error("notificationCron: recovery failed", err)
  );

  // Run every minute at second :00
  schedule.scheduleJob("0 * * * * *", () => {
    processAllDue().catch((err) =>
      console.error("notificationCron: unexpected error", err)
    );
  });
  console.log("notificationCron: started — polling every minute");
}

module.exports = { start };
