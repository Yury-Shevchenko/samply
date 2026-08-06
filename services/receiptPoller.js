const schedule = require("node-schedule");
const mongoose = require("mongoose");
const { Expo } = require("expo-server-sdk");

const expo = new Expo();

/**
 * Fetches Expo delivery receipts and acts on them.
 *
 * Sending a push returns a *ticket* immediately, which only says Expo accepted
 * the request. The real outcome arrives later in a *receipt*. Nothing in Samply
 * ever fetched them, so every delivery failure was invisible: a participant who
 * reinstalled the app, restored to a new phone, or revoked notification
 * permission had a dead token, and Samply went on sending to it — and counting
 * those sends as delivered — for the rest of the study. Researchers saw
 * participants who "stopped responding"; the notifications were never arriving.
 *
 * What this does with a receipt:
 *   - ok                  → record it, nothing else to do.
 *   - DeviceNotRegistered → the token is permanently dead. Deactivate that
 *                           participant's token so we stop sending, and leave a
 *                           marker the researcher can see.
 *   - any other error     → record it against the message. MessageRateExceeded
 *                           and MessageTooBig are actionable but not the
 *                           participant's fault, so the token is left alone.
 */

// Expo needs a little time before a receipt exists.
const MIN_AGE_MS = 15 * 60 * 1000;
// Expo discards receipts after about a day; past this we stop asking.
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
// Ceiling per run so a backlog cannot monopolise the event loop.
const MAX_PER_RUN = 1000;

let isRunning = false;

/**
 * Decides what a receipt means. Pure, so the policy is testable without a
 * database or a network.
 *
 * Returns the events to append and whether the participant's token is dead.
 */
function classifyReceipt(receipt) {
  if (receipt && receipt.status === "error") {
    const error = (receipt.details && receipt.details.error) || "unknown";
    return {
      events: [
        {
          status: "delivery-failed",
          created: Date.now(),
          data: { error, message: receipt.message },
        },
      ],
      // DeviceNotRegistered is the only receipt error that means the *token* is
      // finished. Rate limits and oversized payloads are our problem, not the
      // participant's, and must not disable their device.
      deactivate: error === "DeviceNotRegistered",
    };
  }

  // Accepted by the platform's push service. Deliberately not called
  // "delivered": neither APNs nor FCM tells us whether the device ever showed
  // it, so claiming delivery would repeat the overstatement the delivery funnel
  // already takes care to avoid.
  return { events: [{ status: "delivery-accepted", created: Date.now() }], deactivate: false };
}

/** Marks a participant's push token dead so no further sends are attempted. */
async function deactivateToken(projectId, samplyId) {
  const Project = mongoose.model("Project");
  await Project.updateOne(
    { _id: projectId },
    { $set: { "mobileUsers.$[u].deactivated": true } },
    { arrayFilters: [{ "u.id": samplyId }] }
  );
}

/**
 * Resolves one batch of outstanding receipts.
 * Returns the number of results examined, so the caller can tell when drained.
 */
async function pollOnce() {
  const Result = mongoose.model("Result");
  const now = Date.now();

  const pending = await Result.find(
    {
      "ticket.id": { $exists: true },
      receiptCheckedAt: { $exists: false },
      created: { $lte: new Date(now - MIN_AGE_MS), $gte: new Date(now - MAX_AGE_MS) },
    },
    { ticket: 1, project: 1, samplyid: 1, messageId: 1 }
  )
    .sort({ created: 1 })
    .limit(MAX_PER_RUN)
    .lean();

  if (pending.length === 0) {
    // Nothing to fetch. Separately, retire anything that aged out of Expo's
    // retention window so it stops being rescanned every run.
    await Result.updateMany(
      {
        "ticket.id": { $exists: true },
        receiptCheckedAt: { $exists: false },
        created: { $lt: new Date(now - MAX_AGE_MS) },
      },
      {
        $set: {
          receiptCheckedAt: new Date(),
          receipt: { status: "unavailable", message: "Receipt expired before it was fetched" },
        },
      }
    );
    return 0;
  }

  const byTicketId = new Map();
  for (const r of pending) byTicketId.set(r.ticket.id, r);

  const chunks = expo.chunkPushNotificationReceiptIds([...byTicketId.keys()]);

  for (const chunk of chunks) {
    let receipts;
    try {
      receipts = await expo.getPushNotificationReceiptsAsync(chunk);
    } catch (err) {
      // Leave receiptCheckedAt unset so this chunk is retried next run; if the
      // outage outlasts Expo's retention the sweep above retires it.
      console.error("receiptPoller: failed to fetch receipts", err.message);
      continue;
    }

    for (const [ticketId, receipt] of Object.entries(receipts || {})) {
      const row = byTicketId.get(ticketId);
      if (!row) continue;

      const { events, deactivate } = classifyReceipt(receipt);

      if (deactivate) {
        try {
          await deactivateToken(row.project, row.samplyid);
        } catch (err) {
          console.error("receiptPoller: failed to deactivate token", row.samplyid, err.message);
        }
      }

      await Result.updateOne(
        { _id: row._id },
        { $set: { receipt, receiptCheckedAt: new Date() }, $push: { events: { $each: events } } }
      );
    }

    // Any id Expo did not answer for in this chunk still counts as examined
    // only if it aged out; otherwise leave it for the next run.
    for (const id of chunk) {
      if (!receipts || !(id in receipts)) byTicketId.delete(id);
    }
  }

  return pending.length;
}

async function pollAll() {
  if (isRunning) return;
  isRunning = true;
  try {
    await pollOnce();
  } catch (err) {
    console.error("receiptPoller: unexpected error", err);
  } finally {
    isRunning = false;
  }
}

function start() {
  // Every five minutes. Receipts are not urgent — the value is catching a dead
  // token within the same day, not the same minute.
  schedule.scheduleJob("0 */5 * * * *", () => {
    pollAll().catch((err) => console.error("receiptPoller: unexpected error", err));
  });
  console.log("receiptPoller: started — polling Expo receipts every 5 minutes");
}

module.exports = { start, pollOnce, classifyReceipt, MIN_AGE_MS, MAX_AGE_MS };
