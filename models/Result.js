const mongoose = require("mongoose");
const { EVENT_STATUSES } = require("../lib/eventStatuses");
mongoose.Promise = global.Promise;

const resultSchema = new mongoose.Schema({
  messageId: String,
  created: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
  },
  samplyid: String,
  data: {
    title: String,
    message: String,
    url: String,
    expireAt: Number, // timestamp
  },
  // The Expo *ticket*, returned synchronously when a push is accepted for
  // delivery. `ticket.id` is the handle used to fetch the receipt later.
  ticket: JSON,
  // The Expo *receipt*, fetched minutes later by services/receiptPoller.js.
  // This is where real delivery failures surface — DeviceNotRegistered above
  // all, which means the token is dead and the participant will never receive
  // another notification until they re-register.
  receipt: JSON,
  // Set once a receipt has been resolved (or given up on), so the poller does
  // not rescan the same rows forever.
  receiptCheckedAt: Date,
  // Which schedule produced this send. The schema is strict, so until this was
  // declared Mongoose silently dropped the value notificationSender.js passes —
  // every result landed with no config id, and the analytics "Schedule
  // performance" panel could only ever show "(untracked schedule)".
  notificationConfigId: String,
  // Marks a researcher's pre-flight test send. Real code path, real push, real
  // placeholder substitution — but excluded from every analytics figure and from
  // the data export, so testing the setup cannot distort the numbers the
  // researcher later publishes.
  isTest: Boolean,
  // The append-only event log every compliance figure is derived from. `status`
  // is constrained to the documented vocabulary because an unconstrained string
  // is exactly how `opened-in-app` came to be written by the app and ignored by
  // the analytics for years. See lib/eventStatuses.js for the ladder.
  events: [
    {
      status: { type: String, enum: EVENT_STATUSES },
      created: Date,
      data: JSON,
    },
  ],
  project_name: String,
  batch: Number,
  finid: String, // id that is connected to reminder jobs
});

// Indexes for the most common query patterns
resultSchema.index({ project: 1 });
resultSchema.index({ samplyid: 1 });
resultSchema.index({ project: 1, samplyid: 1 });
resultSchema.index({ project: 1, created: -1 });
resultSchema.index({ created: -1 });
resultSchema.index({ messageId: 1 });
// The receipt poller scans a narrow `created` window (roughly 15 min to 24 h
// old) and filters the rest in memory, so the existing { created: -1 } index
// above serves it — a range scan works in either direction. No extra index:
// the working set is transient and tiny relative to the collection.

module.exports = mongoose.model("Result", resultSchema);
