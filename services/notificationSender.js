const mongoose = require("mongoose");
const Result = mongoose.model("Result");
const PendingNotification = mongoose.model("PendingNotification");
const { Expo } = require("expo-server-sdk");
const { customAlphabet } = require("nanoid");
const uniqid = require("uniqid");
const { substitutePlaceholders } = require("../lib/placeholders");
const { resolveReminders } = require("../lib/reminders");

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
//
// Resolves to delivery counts — { recipients, sent, failed, noToken, deactivated }
// — so the caller can record what actually happened. A queued notification
// whose every recipient was skipped used to be marked "sent" with nothing to
// show for it, and researchers could not tell why a participant got nothing.
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
  isTest = false,
}) {
  const { title, message, url, expireIn } = content;
  const timestampSent = Date.now();
  // Blank reminder text falls back to this ping's — see lib/reminders.js.
  reminders = resolveReminders(reminders, { title, message });

  const delivery = { recipients: tokens.length, sent: 0, failed: 0, noToken: 0, deactivated: 0 };

  const messages = await Promise.all(
    tokens.map(async (pushToken) => {
      if (pushToken.deactivated) {
        delivery.deactivated++;
        return { error: "Participant is deactivated" };
      }
      // "miss" is what the app sends when a participant joins without allowing
      // notifications; "User left the study" is a legacy leaver.
      if (
        !pushToken.token ||
        pushToken.token === "User left the study" ||
        pushToken.token === "miss" ||
        !Expo.isExpoPushToken(pushToken.token)
      ) {
        delivery.noToken++;
        return { error: "Token is missing or it is invalid" };
      }

      const countRecords = await Result.where({
        project: project_id,
        samplyid: pushToken.id,
      }).countDocuments();
      const batch = countRecords + 1;

      const messageId = makeRandomCodeForMessageID();
      const updatedUrl = substitutePlaceholders(url, {
        MESSAGE_ID: messageId,
        SAMPLY_ID: pushToken.id,
        PARTICIPANT_CODE: pushToken.username,
        GROUP_ID: pushToken.group,
        TIMESTAMP_SENT: timestampSent,
        BATCH: batch,
      });

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

  // Builds the Result row for one message. `extraEvents` carries whatever the
  // send outcome adds beyond "sent".
  const saveResult = (msg, ticket, extraEvents) =>
    new Result({
      project: project_id,
      project_name,
      samplyid: msg.id,
      data: msg.data,
      ticket,
      messageId: msg.data.messageId,
      notificationConfigId,
      isTest: isTest || undefined,
      events: [{ status: "sent", created: timestampSent }, ...extraEvents],
      batch: msg.batch,
      finid: msg.finid,
    }).save();

  await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        for (const ticket of ticketChunk) {
          if (ticket && ticket.status === "error") delivery.failed++;
          else delivery.sent++;
        }
        await Promise.all(
          ticketChunk.map((ticket, i) =>
            saveResult(
              chunk[i],
              ticket,
              // A per-message ticket error (an invalid token, say) is a delivery
              // failure Expo reports up front. Record it as one rather than
              // storing the ticket and hoping someone reads it later — the
              // receipt poller will never see these, since there is no ticket id.
              ticket && ticket.status === "error"
                ? [{
                    status: "delivery-failed",
                    created: Date.now(),
                    data: { error: ticket.details?.error || "unknown", message: ticket.message },
                  }]
                : []
            )
          )
        );
      } catch (error) {
        // The whole chunk failed — network trouble, or Expo returning 5xx.
        // Previously this logged and returned, so the messages vanished: no
        // Result row meant analytics never counted them as sent, while their
        // reminder rows had already been written and would still fire. Record
        // them as attempted-and-failed so the numbers stay honest.
        console.error("notificationSender: Expo error", error);
        delivery.failed += chunk.length;
        await Promise.all(
          chunk.map((msg) =>
            saveResult(msg, { status: "error", message: error.message }, [
              { status: "send-failed", created: Date.now(), data: { message: error.message } },
            ]).catch((e) =>
              console.error("notificationSender: could not record failed send", e.message)
            )
          )
        );
      }
    })
  );

  done();
  return delivery;
}

module.exports = { sendMobileNotification };
