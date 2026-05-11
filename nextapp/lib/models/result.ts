import mongoose from "mongoose";

export interface IResult {
  _id: string;
  project: mongoose.Types.ObjectId;
  samplyid: string;
  batch?: string;
  messageId?: string;
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

export default (mongoose.models.Result as mongoose.Model<mongoose.Document>) ||
  mongoose.model("Result", resultSchema, "results");
