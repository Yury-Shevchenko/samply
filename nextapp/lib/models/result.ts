import mongoose from "mongoose";

export interface IResult {
  _id: string;
  project: mongoose.Types.ObjectId;
  samplyid: string;
  batch?: string;
  messageId?: string;
  notificationConfigId?: string;
  created: Date;
  data?: {
    title?: string;
    message?: string;
    url?: string;
    expireAt?: Date;
  };
  events?: Array<{ status: string; created: Date; data?: unknown }>;
  ticket?: { id?: string; status?: string };
}

const resultSchema = new mongoose.Schema({}, { strict: false });

resultSchema.index({ project: 1 });
resultSchema.index({ samplyid: 1 });
resultSchema.index({ project: 1, samplyid: 1 });
resultSchema.index({ project: 1, created: -1 });
resultSchema.index({ created: -1 });
resultSchema.index({ messageId: 1 });

export default (mongoose.models.Result as mongoose.Model<mongoose.Document>) ||
  mongoose.model("Result", resultSchema, "results");
