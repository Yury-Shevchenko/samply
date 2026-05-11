import mongoose from "mongoose";

export interface IReceipt {
  _id: string;
  receiptId: string;
  created: Date;
  project: mongoose.Types.ObjectId;
  payer: mongoose.Types.ObjectId;
  payee: mongoose.Types.ObjectId;
  status: string;
  paymentInfo: {
    eventId?: string;
    currency?: string;
    amount?: number;
    fee?: number;
    url?: string;
  };
}

const receiptSchema = new mongoose.Schema({}, { strict: false });

export default (mongoose.models.Receipt as mongoose.Model<mongoose.Document>) ||
  mongoose.model("Receipt", receiptSchema, "receipts");
