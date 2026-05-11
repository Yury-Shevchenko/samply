import connectDB from "@/lib/db";
import Result, { type IResult } from "@/lib/models/result";
import mongoose from "mongoose";

export async function fetchResultById(
  resultId: string,
  projectId: string,
): Promise<IResult | null> {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(resultId)) return null;
  const result = await Result.findOne(
    { _id: new mongoose.Types.ObjectId(resultId), project: new mongoose.Types.ObjectId(projectId) },
  ).lean();
  return result as unknown as IResult | null;
}
