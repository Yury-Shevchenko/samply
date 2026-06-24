const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

/**
 * Auditable record of a consent event (GDPR Art. 7 accountability).
 *
 * One document per consent action: accepting terms / privacy policy on signup,
 * agreeing to participate in a study, or agreeing to geolocation tracking.
 * Withdrawal is recorded by setting `withdrawnAt` (we never delete the proof of
 * the original acceptance). Stored in the shared `consentrecords` collection;
 * the Next.js app defines a mirror model on the same collection.
 */
const consentRecordSchema = new mongoose.Schema({
  // Who gave consent. For participants we key by samplyId (pseudonym); userId is
  // also stored when known. For researchers we key by userId.
  subjectType: {
    type: String,
    enum: ["participant", "researcher"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  samplyId: {
    type: String,
    default: null,
  },
  // Set for study / geolocation consent.
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    default: null,
  },
  type: {
    type: String,
    enum: ["terms", "privacy", "study", "geolocation"],
    required: true,
  },
  // Version of the document/consent text that was accepted, so a version bump
  // can trigger re-consent.
  documentVersion: String,
  acceptedAt: {
    type: Date,
    default: Date.now,
  },
  withdrawnAt: {
    type: Date,
    default: null,
  },
  source: {
    type: String,
    enum: ["app", "web"],
  },
  locale: String,
});

consentRecordSchema.index({ samplyId: 1, type: 1 });
consentRecordSchema.index({ userId: 1, type: 1 });
consentRecordSchema.index({ projectId: 1 });

module.exports =
  mongoose.models.ConsentRecord ||
  mongoose.model("ConsentRecord", consentRecordSchema, "consentrecords");
