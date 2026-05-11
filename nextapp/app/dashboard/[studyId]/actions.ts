"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";

async function requireOwnerOrMember(studyId: string) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  await connectDB();
  const userOid = new mongoose.Types.ObjectId(session.user.id);
  const project = await Project.findOne(
    { _id: studyId, $or: [{ creator: userOid }, { members: userOid }] },
    { _id: 1 },
  ).lean();
  if (!project) redirect("/dashboard");
  return session;
}

export async function toggleStudyActiveAction(studyId: string) {
  await requireOwnerOrMember(studyId);
  const project = await Project.findById(studyId, { currentlyActive: 1 }).lean() as { currentlyActive?: boolean } | null;
  if (!project) redirect("/dashboard");
  await Project.updateOne({ _id: studyId }, { $set: { currentlyActive: !project.currentlyActive } });
  revalidatePath(`/dashboard/${studyId}`);
  redirect(`/dashboard/${studyId}`);
}

export async function toggleApprovalRequestAction(studyId: string) {
  await requireOwnerOrMember(studyId);
  const project = await Project.findById(studyId, { requestedForApproval: 1 }).lean() as { requestedForApproval?: boolean } | null;
  if (!project) redirect("/dashboard");
  await Project.updateOne({ _id: studyId }, { $set: { requestedForApproval: !project.requestedForApproval } });
  revalidatePath(`/dashboard/${studyId}`);
  redirect(`/dashboard/${studyId}/approval`);
}
