import mongoose from "mongoose";

export interface PublicProject {
  _id: string;
  name: string;
  slug: string;
  description: string;
  welcomeMessage: string;
  messageAfterJoin: string;
  created: Date;
  author_name: string[];
  author_institute: string[];
}

export interface ProjectDetail {
  _id: string;
  name: string;
  slug: string;
  description: string;
  currentlyActive: boolean;
  tests: unknown[];
  creator: string;
  created: Date;
  image?: string;
}

const projectSchema = new mongoose.Schema({}, { strict: false });

projectSchema.index({ creator: 1 });
projectSchema.index({ slug: 1 });
projectSchema.index({ samplycode: 1 });
projectSchema.index({ currentlyActive: 1, public: 1 });

export default (mongoose.models.Project as mongoose.Model<mongoose.Document>) ||
  mongoose.model("Project", projectSchema, "projects");
