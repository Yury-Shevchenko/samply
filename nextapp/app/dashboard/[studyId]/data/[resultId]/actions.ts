"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import Result from "@/lib/models/result";
import mongoose from "mongoose";

async function requireOwner(studyId: string) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();
  const project = await Project.findById(studyId, { creator: 1, members: 1 }).lean() as
    { creator: { toString(): string }; members?: Array<{ toString(): string }> } | null;
  if (!project) redirect("/dashboard");

  const userId = session.user.id;
  const isOwner = project.creator.toString() === userId;
  const isMember = project.members?.some((m) => m.toString() === userId) ?? false;
  if (!isOwner && !isMember) redirect("/dashboard");

  return userId;
}

export async function deleteResultAction(studyId: string, resultId: string) {
  await requireOwner(studyId);
  await Result.deleteOne({
    _id: new mongoose.Types.ObjectId(resultId),
    project: new mongoose.Types.ObjectId(studyId),
  });
  redirect(`/dashboard/${studyId}/data`);
}
