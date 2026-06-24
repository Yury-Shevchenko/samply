import mongoose from "mongoose";

export type ConsentType = "terms" | "privacy" | "study" | "geolocation";

export interface IConsentRecord {
  _id: string;
  subjectType: "participant" | "researcher";
  userId?: mongoose.Types.ObjectId | null;
  samplyId?: string | null;
  projectId?: mongoose.Types.ObjectId | null;
  type: ConsentType;
  documentVersion?: string;
  acceptedAt: Date;
  withdrawnAt?: Date | null;
  source?: "app" | "web";
  locale?: string;
}

const consentRecordSchema = new mongoose.Schema(
  {
    subjectType: { type: String, enum: ["participant", "researcher"], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    samplyId: { type: String, default: null },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
    type: { type: String, enum: ["terms", "privacy", "study", "geolocation"], required: true },
    documentVersion: String,
    acceptedAt: { type: Date, default: Date.now },
    withdrawnAt: { type: Date, default: null },
    source: { type: String, enum: ["app", "web"] },
    locale: String,
  },
  { collection: "consentrecords" },
);

consentRecordSchema.index({ samplyId: 1, type: 1 });
consentRecordSchema.index({ userId: 1, type: 1 });
consentRecordSchema.index({ projectId: 1 });

export default (mongoose.models.ConsentRecord as mongoose.Model<mongoose.Document>) ||
  mongoose.model("ConsentRecord", consentRecordSchema, "consentrecords");
