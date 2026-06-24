import mongoose, { Schema, Document, Model } from "mongoose";

export type AuditAction =
  | "view_participant"
  | "export_results"
  | "export_participants"
  | "view_payout"
  | "view_receipts";

export interface IAuditLog extends Document {
  actorUserId: mongoose.Types.ObjectId;
  actorEmail?: string;
  action: AuditAction;
  projectId?: mongoose.Types.ObjectId | null;
  targetSamplyId?: string | null;
  meta?: Record<string, unknown>;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    actorUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actorEmail: String,
    action: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
    targetSamplyId: { type: String, default: null },
    meta: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "auditlogs" },
);

auditLogSchema.index({ actorUserId: 1, createdAt: -1 });
auditLogSchema.index({ projectId: 1, createdAt: -1 });
auditLogSchema.index({ targetSamplyId: 1, createdAt: -1 });

const AuditLog: Model<IAuditLog> =
  (mongoose.models.AuditLog as Model<IAuditLog>) ||
  mongoose.model<IAuditLog>("AuditLog", auditLogSchema, "auditlogs");

export default AuditLog;
