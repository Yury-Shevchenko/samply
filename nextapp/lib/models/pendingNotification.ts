import mongoose from "mongoose";

export interface IPendingNotification {
  _id: string;
  projectId: mongoose.Types.ObjectId;
  notificationConfigId: string;
  scheduledFor: Date;
  status: "pending" | "processing" | "sent" | "failed" | "cancelled";
  recipientUserIds: string[];
  recipientGroupIds: string[];
  title: string;
  message: string;
  url: string;
  expireIn?: number;
  timezone?: string;
  useParticipantTimezone?: boolean;
  isReminder?: boolean;
  finid?: string;
  /** Set when the queue processes the row; see Website/models/PendingNotification.js. */
  delivery?: { recipients?: number; sent?: number; failed?: number; noToken?: number; deactivated?: number };
  created?: Date;
}

const pendingNotificationSchema = new mongoose.Schema({}, { strict: false });

export default (mongoose.models.PendingNotification as mongoose.Model<mongoose.Document>) ||
  mongoose.model("PendingNotification", pendingNotificationSchema, "pendingnotifications");
