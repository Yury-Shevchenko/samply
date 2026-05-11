import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import User from "@/lib/models/user";
import Result, { type IResult } from "@/lib/models/result";
import Receipt, { type IReceipt } from "@/lib/models/receipt";
import mongoose from "mongoose";

export interface MobileUser {
  id: string;
  token?: string;
  created?: Date;
  username?: string;
  group?: { name?: string };
  information?: Record<string, unknown>;
  stripe?: { account?: string; information?: unknown };
  deactivated?: boolean;
}

export async function fetchParticipants(projectId: string): Promise<MobileUser[]> {
  await connectDB();
  const project = await Project.findById(projectId, { mobileUsers: 1 }).lean();
  if (!project) return [];
  return ((project as unknown as { mobileUsers?: MobileUser[] }).mobileUsers ?? []);
}

const HISTORY_LIMIT = 100;

export type HistorySortBy = "samplyid" | "title" | "created" | "status";
export type HistorySortOrder = "asc" | "desc";

export async function fetchHistory(
  projectId: string,
  page: number,
  participantId?: string,
  sortBy: HistorySortBy = "created",
  sortOrder: HistorySortOrder = "desc",
): Promise<{ history: IResult[]; count: number; pages: number; page: number; skip: number }> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const filter: Record<string, unknown> = { project: oid };
  if (participantId) filter.samplyid = participantId;

  const skip = (page - 1) * HISTORY_LIMIT;
  const dir = sortOrder === "asc" ? 1 : -1;

  if (sortBy === "status") {
    // Compute highest-priority status per result in the aggregation pipeline,
    // then sort by that computed value.
    const statusPriority = {
      $switch: {
        branches: [
          { case: { $gt: [{ $size: { $filter: { input: { $ifNull: ["$events", []] }, as: "e", cond: { $eq: ["$$e.status", "completed"] } } } }, 0] }, then: 6 },
          { case: { $gt: [{ $size: { $filter: { input: { $ifNull: ["$events", []] }, as: "e", cond: { $eq: ["$$e.status", "opened-in-app"] } } } }, 0] }, then: 5 },
          { case: { $gt: [{ $size: { $filter: { input: { $ifNull: ["$events", []] }, as: "e", cond: { $eq: ["$$e.status", "tapped"] } } } }, 0] }, then: 4 },
          { case: { $gt: [{ $size: { $filter: { input: { $ifNull: ["$events", []] }, as: "e", cond: { $eq: ["$$e.status", "archived"] } } } }, 0] }, then: 3 },
          { case: { $gt: [{ $size: { $filter: { input: { $ifNull: ["$events", []] }, as: "e", cond: { $eq: ["$$e.status", "received-in-app"] } } } }, 0] }, then: 2 },
        ],
        default: 1,
      },
    };
    const [history, count] = await Promise.all([
      Result.aggregate([
        { $match: filter },
        { $addFields: { _sp: statusPriority } },
        { $sort: { _sp: dir, created: -1 } },
        { $skip: skip },
        { $limit: HISTORY_LIMIT },
      ]),
      Result.countDocuments(filter),
    ]);
    return { history: history as unknown as IResult[], count, pages: Math.ceil(count / HISTORY_LIMIT), page, skip };
  }

  const sortField = sortBy === "title" ? "data.title" : sortBy;
  const [history, count] = await Promise.all([
    Result.find(filter).sort({ [sortField]: dir }).skip(skip).limit(HISTORY_LIMIT).lean(),
    Result.countDocuments(filter),
  ]);

  return {
    history: history as unknown as IResult[],
    count,
    pages: Math.ceil(count / HISTORY_LIMIT),
    page,
    skip,
  };
}

export async function fetchParticipantBysamplyId(samplyId: string) {
  await connectDB();
  return User.findOne(
    { samplyId },
    { name: 1, email: 1, stripeAccountId: 1, stripeInformation: 1 },
  ).lean();
}

export interface ParticipantUserInfo {
  timezone?: string;
  timeWindowFrom?: string;
  timeWindowTo?: string;
}

export async function fetchParticipantUserInfo(samplyId: string): Promise<ParticipantUserInfo> {
  await connectDB();
  const user = await User.findOne({ samplyId }, { information: 1 }).lean() as
    { information?: Record<string, unknown> } | null;
  if (!user?.information) return {};

  const info = user.information;
  const result: ParticipantUserInfo = {};

  if (typeof info.timezone === "string") result.timezone = info.timezone;

  const tw = info.timeWindow as { startTime?: unknown; endTime?: unknown } | undefined;
  if (tw?.startTime) {
    const s = new Date(tw.startTime as string);
    result.timeWindowFrom = `${s.getHours().toString().padStart(2, "0")}:${s.getMinutes().toString().padStart(2, "0")}`;
  }
  if (tw?.endTime) {
    const e = new Date(tw.endTime as string);
    result.timeWindowTo = `${e.getHours().toString().padStart(2, "0")}:${e.getMinutes().toString().padStart(2, "0")}`;
  }

  // Also check flat from/to already stored by previous API calls
  if (!result.timeWindowFrom && typeof info.from === "string") result.timeWindowFrom = info.from;
  if (!result.timeWindowTo && typeof info.to === "string") result.timeWindowTo = info.to;

  return result;
}

export async function fetchReceipts(
  samplyId: string,
  payerId: string,
): Promise<IReceipt[]> {
  await connectDB();
  const payee = await User.findOne({ samplyId }, { _id: 1 }).lean();
  if (!payee) return [];
  const receipts = await Receipt.find(
    {
      payee: (payee as unknown as { _id: mongoose.Types.ObjectId })._id,
      payer: new mongoose.Types.ObjectId(payerId),
    },
    { created: 1, receiptId: 1, status: 1, paymentInfo: 1 },
  )
    .sort({ created: -1 })
    .lean();
  return receipts as unknown as IReceipt[];
}
