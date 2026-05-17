import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  showDonation:     boolean;
  showSmaat:        boolean;
  showTestimonials: boolean;
  retentionEnabled: boolean;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  showDonation:     { type: Boolean, default: true },
  showSmaat:        { type: Boolean, default: true },
  showTestimonials: { type: Boolean, default: true },
  retentionEnabled: { type: Boolean, default: false },
});

const SiteSettings =
  (mongoose.models.SiteSettings as mongoose.Model<ISiteSettings>) ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;

export async function getSiteSettings(): Promise<{ showDonation: boolean; showSmaat: boolean; showTestimonials: boolean; retentionEnabled: boolean }> {
  const doc = await SiteSettings.findOne({}).lean() as ISiteSettings | null;
  return {
    showDonation:     doc?.showDonation ?? true,
    showSmaat:        doc?.showSmaat ?? true,
    showTestimonials: doc?.showTestimonials ?? true,
    retentionEnabled: doc?.retentionEnabled ?? false,
  };
}

export async function setSiteSetting(key: "showDonation" | "showSmaat" | "showTestimonials" | "retentionEnabled", value: boolean): Promise<void> {
  await SiteSettings.collection.updateOne({}, { $set: { [key]: value } }, { upsert: true });
}
