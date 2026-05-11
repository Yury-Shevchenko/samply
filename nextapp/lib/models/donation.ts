import mongoose from "mongoose";

export interface IDonation {
  _id: mongoose.Types.ObjectId;
  stripeSessionId: string;
  stripeSubscriptionId?: string;
  donorEmail?: string;
  donorName?: string;
  amountCents: number;
  currency: string;
  frequency: "one-time" | "monthly";
  status: "pending" | "completed" | "failed";
  created: Date;
}

const donationSchema = new mongoose.Schema<IDonation>({
  stripeSessionId: { type: String, required: true, unique: true },
  stripeSubscriptionId: String,
  donorEmail: String,
  donorName: String,
  amountCents: { type: Number, required: true },
  currency: { type: String, required: true, default: "eur" },
  frequency: { type: String, enum: ["one-time", "monthly"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  created: { type: Date, default: Date.now },
});

export default (mongoose.models.Donation as mongoose.Model<IDonation>) ||
  mongoose.model<IDonation>("Donation", donationSchema, "donations");
