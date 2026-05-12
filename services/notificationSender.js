const mongoose = require("mongoose");
const Result = mongoose.model("Result");
const PendingNotification = mongoose.model("PendingNotification");
const { Expo } = require("expo-server-sdk");
const { customAlphabet } = require("nanoid");
const uniqid = require("uniqid");

const expo = new Expo();
const nanoid = customAlphabet(
  "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
  10
);

function makeRandomCodeForMessageID() {
  return nanoid(15);
}

// Sends push notifications to the given list of resolved tokens.
// Each token object: { id, token, username, group, deactivated }
// Reminder PendingNotification docs are inserted at send time if reminders are configured.
async function sendMobileNotification({
  done = () => {},
  content,
  tokens,
  project_id,
  project_name,
  notificationConfigId,
  reminders,
  finishid,
  openStudyScreenFallback,
}) {
  const { title, message, url, expireIn } = content;
  const timestampSent = Date.now();

  const messages = await Promise.all(
    tokens.map(async (pushToken) => {
      if (
        pushToken.deactivated ||
        !pushToken.token ||
        pushToken.token === "User left the study" ||
        pushToken.token === "miss" ||
        !Expo.isExpoPushToken(pushToken.token)
      ) {
        return { error: "Token is missing or it is invalid" };
      }

      const countRecords = await Result.where({
        project: project_id,
        samplyid: pushToken.id,
      }).countDocuments();
      const batch = countRecords + 1;

      const messageId = makeRandomCodeForMessageID();
      let updatedUrl = url;
      if (url && url.includes("%")) {
        if (url.includes("%MESSAGE_ID%"))
          updatedUrl = updatedUrl.replace("%MESSAGE_ID%", messageId);
        if (url.includes("%SAMPLY_ID%"))
          updatedUrl = updatedUrl.replace("%SAMPLY_ID%", pushToken.id);
        if (url.includes("%PARTICIPANT_CODE%") && pushToken.username)
          updatedUrl = updatedUrl.replace("%PARTICIPANT_CODE%", pushToken.username);
        if (url.includes("%GROUP_ID%") && pushToken.group)
          updatedUrl = updatedUrl.replace("%GROUP_ID%", pushToken.group);
        if (url.includes("%TIMESTAMP_SENT%"))
          updatedUrl = updatedUrl.replace("%TIMESTAMP_SENT%", timestampSent);
        if (url.includes("%BATCH%"))
          updatedUrl = updatedUrl.replace("%BATCH%", batch);
      }

      let finid = finishid;
      if (reminders && reminders.length) {
        finid = nanoid(15);

        const reminderDocs = reminders.map((reminder) => ({
          projectId: project_id,
          notificationConfigId: notificationConfigId || uniqid(),
          scheduledFor: new Date(Date.now() + reminder.time),
          status: "pending",
          recipientUserIds: [pushToken.id],
          title: reminder.title,
          message: reminder.message,
          url: updatedUrl,
          expireIn: content.expireIn,
          isReminder: true,
          finid,
        }));

        await PendingNotification.insertMany(reminderDocs);
      }

      const expireAt = expireIn ? timestampSent + parseInt(expireIn) : null;

      return {
        to: pushToken.token,
        sound: "default",
        title,
        body: message,
        data: {
          title,
          body: message,
          message,
          url: updatedUrl,
          messageId,
          expireAt,
          openStudyScreenFallback,
        },
        id: pushToken.id,
        priority: "high",
        channelId: "default",
        _displayInForeground: true,
        batch,
        finid,
        categoryId: project_id,
      };
    })
  );

  const validMessages = messages.filter((m) => !m.error);
  const chunks = expo.chunkPushNotifications(validMessages);

  await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        await Promise.all(
          ticketChunk.map(async (ticket, i) => {
            const result = new Result({
              project: project_id,
              project_name,
              samplyid: chunk[i].id,
              data: chunk[i].data,
              ticket,
              messageId: chunk[i].data.messageId,
              events: [{ status: "sent", created: timestampSent }],
              batch: chunk[i].batch,
              finid: chunk[i].finid,
            });
            await result.save();
          })
        );
      } catch (error) {
        console.error("notificationSender: Expo error", error);
      }
    })
  );

  done();
}

module.exports = { sendMobileNotification };
