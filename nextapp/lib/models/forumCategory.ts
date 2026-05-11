import mongoose from "mongoose";

export interface IForumCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  order: number;
  createdAt: Date;
}

const schema = new mongoose.Schema<IForumCategory>({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  order:       { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now },
});

export default (mongoose.models.ForumCategory as mongoose.Model<IForumCategory>) ||
  mongoose.model<IForumCategory>("ForumCategory", schema, "forumcategories");
