import mongoose from "mongoose";

export interface IForumThread {
  _id: mongoose.Types.ObjectId;
  title: string;
  body: string;
  authorId: mongoose.Types.ObjectId;
  authorName: string;
  categoryId: mongoose.Types.ObjectId;
  categorySlug: string;
  pinned: boolean;
  locked: boolean;
  solvedPostId?: mongoose.Types.ObjectId;
  votes: number;
  voters: mongoose.Types.ObjectId[];
  replyCount: number;
  lastReplyAt: Date;
  createdAt: Date;
}

const schema = new mongoose.Schema<IForumThread>({
  title:        { type: String, required: true },
  body:         { type: String, required: true },
  authorId:     { type: mongoose.Schema.Types.ObjectId, required: true },
  authorName:   { type: String, required: true },
  categoryId:   { type: mongoose.Schema.Types.ObjectId, required: true },
  categorySlug: { type: String, required: true },
  pinned:       { type: Boolean, default: false },
  locked:       { type: Boolean, default: false },
  solvedPostId: { type: mongoose.Schema.Types.ObjectId },
  votes:        { type: Number, default: 0 },
  voters:       [{ type: mongoose.Schema.Types.ObjectId }],
  replyCount:   { type: Number, default: 0 },
  lastReplyAt:  { type: Date, default: Date.now },
  createdAt:    { type: Date, default: Date.now },
});

schema.index({ title: "text", body: "text" });
schema.index({ categoryId: 1, pinned: -1, lastReplyAt: -1 });
schema.index({ pinned: -1, lastReplyAt: -1 });

export default (mongoose.models.ForumThread as mongoose.Model<IForumThread>) ||
  mongoose.model<IForumThread>("ForumThread", schema, "forumthreads");
