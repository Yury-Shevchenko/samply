import mongoose from "mongoose";

export interface IForumPost {
  _id: mongoose.Types.ObjectId;
  threadId: mongoose.Types.ObjectId;
  body: string;
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  votes: number;
  voters: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const schema = new mongoose.Schema<IForumPost>({
  threadId:   { type: mongoose.Schema.Types.ObjectId, required: true },
  body:       { type: String, required: true },
  authorId:   { type: mongoose.Schema.Types.ObjectId, required: true },
  authorName: { type: String, required: true },
  votes:      { type: Number, default: 0 },
  voters:     [{ type: mongoose.Schema.Types.ObjectId }],
  createdAt:  { type: Date, default: Date.now },
});

schema.index({ threadId: 1, createdAt: 1 });
schema.index({ body: "text" });

export default (mongoose.models.ForumPost as mongoose.Model<IForumPost>) ||
  mongoose.model<IForumPost>("ForumPost", schema, "forumposts");
