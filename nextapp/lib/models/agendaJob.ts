import mongoose from "mongoose";

export interface IAgendaJob {
  _id: string;
  name: string;
  nextRunAt?: Date;
  lastRunAt?: Date;
  repeatInterval?: string;
  data: {
    projectid?: string;
    id?: string;
    userid?: string;
    groupid?: string;
    timezone?: string;
    expireIn?: number;
    reminders?: unknown[];
    title?: string;
    message?: string;
    url?: string;
    nextRunAt?: string;
  };
}

const agendaJobSchema = new mongoose.Schema({}, { strict: false });

export default (mongoose.models.AgendaJob as mongoose.Model<mongoose.Document>) ||
  mongoose.model("AgendaJob", agendaJobSchema, "Job");
