const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const pendingNotificationSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true,
    index: true,
  },
  notificationConfigId: {
    type: String,
    required: true,
  },
  scheduledFor: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "sent", "failed", "cancelled"],
    default: "pending",
  },
  recipientUserIds: {
    type: [String],
    default: [],
  },
  recipientGroupIds: {
    type: [String],
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    default: "",
  },
  expireIn: Number,
  // Carried through to the Result so a test send stays out of analytics.
  isTest: Boolean,
  timezone: String,
  useParticipantTimezone: {
    type: Boolean,
    default: false,
  },
  isReminder: {
    type: Boolean,
    default: false,
  },
  finid: String,
  // Set when the queue processes the row. `sent` alone said nothing about who
  // it reached: a participant without a push token is skipped, and the row
  // still read "sent". Counts are of recipients resolved at send time.
  delivery: {
    recipients: Number,
    sent: Number, // handed to the push service
    failed: Number, // rejected by the push service
    noToken: Number, // skipped: never allowed notifications, or left
    deactivated: Number, // skipped: device reported unreachable
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

pendingNotificationSchema.index({ scheduledFor: 1, status: 1 });
pendingNotificationSchema.index({ projectId: 1, status: 1 });
pendingNotificationSchema.index({ projectId: 1, notificationConfigId: 1 });
pendingNotificationSchema.index({ notificationConfigId: 1 });

module.exports = mongoose.model("PendingNotification", pendingNotificationSchema);
