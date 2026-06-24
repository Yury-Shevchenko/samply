import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Only the fields that Next.js needs for authentication and session.
// The full schema lives in Website/models/User.js — do not duplicate business fields here.
export interface IUser extends Document {
  email: string;
  name: string;
  samplyId: string;
  level: number; // 1 = participant, 11 = researcher, 101 = admin
  language: string;
  institute?: string;
  emailIsConfirmed: boolean;
  created?: Date;
  local: { password: string };
  project?: { _id: mongoose.Types.ObjectId; name: string };
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  confirmEmailToken?: string;
  confirmEmailExpires?: Date;
  code?: { id?: string };
  participant_projects?: Array<{ _id: mongoose.Types.ObjectId; name: string; slug: string }>;
  stripeAccountId?: string;
  stripeInformation?: { charges_enabled?: boolean; details_submitted?: boolean; payouts_enabled?: boolean };
  emailUnsubscribed?: boolean;
  validPassword(password: string): boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: String,
    name: String,
    samplyId: String,
    level: Number,
    language: { type: String, default: "english" },
    emailIsConfirmed: { type: Boolean, default: false },
    local: { password: String },
    institute: String,
    created: { type: Date, default: Date.now },
    project: { _id: { type: Schema.Types.ObjectId, ref: "Project" }, name: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    confirmEmailToken: String,
    confirmEmailExpires: Date,
    code: { id: String },
    participant_projects: [{ _id: Schema.Types.ObjectId, name: String, slug: String }],
    stripeAccountId: String,
    stripeInformation: { charges_enabled: Boolean, details_submitted: Boolean, payouts_enabled: Boolean },
    emailUnsubscribed: { type: Boolean, default: false },
  },
  { strict: false } // allow extra fields from the existing collection
);

userSchema.methods.validPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.index({ samplyId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ level: 1 });
userSchema.index({ participantInProject: 1 });
userSchema.index({ resetPasswordToken: 1, resetPasswordExpires: 1 });
userSchema.index({ confirmEmailToken: 1, confirmEmailExpires: 1 });

// Guard against model re-registration during hot-reload.
const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
