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
  created: {
    type: Date,
    default: Date.now,
  },
});

pendingNotificationSchema.index({ scheduledFor: 1, status: 1 });
pendingNotificationSchema.index({ projectId: 1, status: 1 });
pendingNotificationSchema.index({ notificationConfigId: 1 });

module.exports = mongoose.model("PendingNotification", pendingNotificationSchema);
