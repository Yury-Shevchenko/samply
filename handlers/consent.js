const mongoose = require("mongoose");
const ConsentRecord = mongoose.model("ConsentRecord");
const { TERMS_VERSION, POLICY_VERSION } = require("../config/consent");

/**
 * Helpers for writing auditable consent records (GDPR Art. 7). These never
 * throw into the caller's request flow — consent persistence must not break
 * account creation / study enrolment — but failures are logged.
 */

// Terms + privacy consent for a newly created account (participant or researcher).
async function recordSignupConsent({ subjectType, userId, samplyId, source, locale }) {
  const base = {
    subjectType,
    userId: userId || null,
    samplyId: samplyId || null,
    source,
    locale,
  };
  try {
    await ConsentRecord.create([
      { ...base, type: "terms", documentVersion: TERMS_VERSION },
      { ...base, type: "privacy", documentVersion: POLICY_VERSION },
    ]);
  } catch (err) {
    console.error("Failed to record signup consent:", err.message);
  }
}

// Study (and optionally geolocation) consent at enrolment.
async function recordStudyConsent({
  userId,
  samplyId,
  projectId,
  source,
  locale,
  geolocation,
  studyVersion,
}) {
  const base = {
    subjectType: "participant",
    userId: userId || null,
    samplyId,
    projectId,
    source,
    locale,
  };
  const docs = [{ ...base, type: "study", documentVersion: studyVersion || "1" }];
  if (geolocation) {
    docs.push({ ...base, type: "geolocation", documentVersion: studyVersion || "1" });
  }
  try {
    await ConsentRecord.create(docs);
  } catch (err) {
    console.error("Failed to record study consent:", err.message);
  }
}

// Mark a participant's active study/geolocation consents for a project as withdrawn.
async function withdrawStudyConsent({ samplyId, projectId }) {
  try {
    await ConsentRecord.updateMany(
      { samplyId, projectId, type: { $in: ["study", "geolocation"] }, withdrawnAt: null },
      { $set: { withdrawnAt: new Date() } },
    );
  } catch (err) {
    console.error("Failed to withdraw study consent:", err.message);
  }
}

// Mark all of a participant's active consents as withdrawn (account deletion).
async function withdrawAllConsent({ samplyId }) {
  try {
    await ConsentRecord.updateMany(
      { samplyId, withdrawnAt: null },
      { $set: { withdrawnAt: new Date() } },
    );
  } catch (err) {
    console.error("Failed to withdraw participant consent:", err.message);
  }
}

// Returns the consent types ("terms"/"privacy") whose latest non-withdrawn
// accepted version is missing or older than the current document version, i.e.
// the subject should be asked to re-consent. Identify the subject by samplyId
// (participants) or userId (researchers).
async function getStaleConsentTypes({ samplyId, userId }) {
  const query = samplyId ? { samplyId } : { userId };
  const current = { terms: TERMS_VERSION, privacy: POLICY_VERSION };
  const stale = [];
  for (const type of ["terms", "privacy"]) {
    const latest = await ConsentRecord.findOne(
      { ...query, type, withdrawnAt: null },
      { documentVersion: 1 },
    ).sort({ acceptedAt: -1 });
    if (!latest || latest.documentVersion !== current[type]) stale.push(type);
  }
  return stale;
}

module.exports = {
  recordSignupConsent,
  recordStudyConsent,
  withdrawStudyConsent,
  withdrawAllConsent,
  getStaleConsentTypes,
};

