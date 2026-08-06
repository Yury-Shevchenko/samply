"use strict";

/**
 * The canonical vocabulary for `Result.events[].status`.
 *
 * This field was an unconstrained string, and the drift that allowed is what
 * caused the worst reporting bug in the platform: the mobile app recorded
 * `opened-in-app` when a participant opened a survey from their history, the
 * analytics only ever counted `tapped`, and nothing connected the two. Studies
 * published compliance rates roughly half of what their participants had
 * actually done — 31,096 `opened-in-app` and 12,730 `completed` events sat in
 * the database uncounted.
 *
 * A mirror of this list lives in nextapp/lib/data/analytics.ts for the
 * dashboard; lib/eventStatuses.test.js fails if the two disagree.
 *
 * The ladder, in order:
 *
 *   sent               a push was handed to Expo
 *   delivery-accepted  the platform's push service accepted it (from the
 *                      receipt). NOT proof the device displayed it — neither
 *                      APNs nor FCM tells us that.
 *   delivery-failed    the push service rejected it; it never arrived
 *   send-failed        Expo itself refused the send
 *   received-in-app    arrived while the app was open in the foreground
 *   tapped             the participant tapped the notification
 *   opened-in-app      the participant opened the survey from their history,
 *                      the documented path when a push is missed
 *   completed          the survey tool reported the response finished
 *   archived           the participant dismissed/deleted the notification
 *   geofencing-event   a location trigger fired
 */

/**
 * Every status the platform may write.
 *
 * Enforced in three places, because no single one covers everything: the schema
 * enum rejects bad values on `.save()` (the send paths); `isClientReportable`
 * guards the unauthenticated endpoint; and lib/eventStatuses.test.js scans the
 * source so a status written by an `updateOne`/`$push` — which does not run
 * Mongoose validators — still cannot be introduced unnoticed.
 */
const EVENT_STATUSES = [
  "sent",
  "delivery-accepted",
  "delivery-failed",
  "send-failed",
  "received-in-app",
  "tapped",
  "opened-in-app",
  "completed",
  "archived",
  "geofencing-event",
];

/**
 * Statuses a participant's own device may report via /api/updatestatus.
 *
 * Deliberately narrower than the full list: that endpoint is unauthenticated,
 * so a client must not be able to forge a delivery receipt or a completion.
 * Completion arrives only from the survey tool's callback, and delivery
 * outcomes only from Expo.
 */
const CLIENT_REPORTABLE_STATUSES = [
  "received-in-app",
  "tapped",
  "opened-in-app",
  "archived",
];

/**
 * Statuses that count as the participant having responded.
 *
 * `tapped` is the push tap; `opened-in-app` is opening it from history — a real
 * response, and the documented fallback when a push is missed; `completed` is
 * the survey tool's own confirmation. Counting only `tapped` reported 0%
 * compliance for participants who demonstrably finished the survey.
 */
const RESPONDED_STATUSES = ["tapped", "opened-in-app", "completed"];

/** Statuses meaning the participant opened the link, for the delivery funnel. */
const OPENED_STATUSES = ["tapped", "opened-in-app"];

const isKnownStatus = (s) => EVENT_STATUSES.indexOf(s) !== -1;
const isClientReportable = (s) => CLIENT_REPORTABLE_STATUSES.indexOf(s) !== -1;

module.exports = {
  EVENT_STATUSES,
  CLIENT_REPORTABLE_STATUSES,
  RESPONDED_STATUSES,
  OPENED_STATUSES,
  isKnownStatus,
  isClientReportable,
};
