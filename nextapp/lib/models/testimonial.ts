import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  text: string;
  name: string;
  role?: string;
  institute?: string;
  approved: boolean;
  created: Date;
  authorId?: string;
}

const TestimonialSchema = new Schema<ITestimonial>({
  text:      { type: String, required: true },
  name:      { type: String, required: true },
  role:      { type: String },
  institute: { type: String },
  approved:  { type: Boolean, default: false },
  created:   { type: Date, default: Date.now },
  authorId:  { type: String },
});

const Testimonial =
  (mongoose.models.Testimonial as mongoose.Model<ITestimonial>) ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
