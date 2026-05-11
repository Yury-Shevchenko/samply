import mongoose from "mongoose";

export type ChangeTag = "new" | "fix" | "improvement";

export interface IChangelogChange {
  tag: ChangeTag;
  text: string;
}

export interface IChangelogEntry {
  _id: mongoose.Types.ObjectId;
  version: string;
  date: Date;
  title: string;
  changes: IChangelogChange[];
  createdAt: Date;
}

const changeSchema = new mongoose.Schema<IChangelogChange>(
  { tag: { type: String, enum: ["new", "fix", "improvement"], required: true }, text: { type: String, required: true } },
  { _id: false }
);

const schema = new mongoose.Schema<IChangelogEntry>({
  version:   { type: String, required: true },
  date:      { type: Date,   required: true },
  title:     { type: String, default: "" },
  changes:   { type: [changeSchema], default: [] },
  createdAt: { type: Date,   default: Date.now },
});

export default (mongoose.models.ChangelogEntry as mongoose.Model<IChangelogEntry>) ||
  mongoose.model<IChangelogEntry>("ChangelogEntry", schema, "changelogentries");
