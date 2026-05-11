import mongoose, { Schema, Document, Model } from "mongoose";

export interface INewsletterLog extends Document {
  subject: string;
  body: string;
  sentAt: Date;
  sentBy: string;
  sent: number;
  failed: number;
}

const newsletterLogSchema = new Schema<INewsletterLog>({
  subject:  { type: String, required: true },
  body:     { type: String, required: true },
  sentAt:   { type: Date, default: Date.now },
  sentBy:   { type: String, required: true },
  sent:     { type: Number, required: true },
  failed:   { type: Number, required: true },
});

const NewsletterLog: Model<INewsletterLog> =
  (mongoose.models.NewsletterLog as Model<INewsletterLog>) ||
  mongoose.model<INewsletterLog>("NewsletterLog", newsletterLogSchema);

export default NewsletterLog;
