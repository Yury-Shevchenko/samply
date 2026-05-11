"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import crypto from "crypto";

async function requireOwner(studyId: string) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  await connectDB();
  const oid = new mongoose.Types.ObjectId(session.user.id);
  const project = await Project.findOne({ _id: studyId, creator: oid }, { _id: 1 }).lean();
  if (!project) redirect(`/dashboard/${studyId}`);
  return session;
}

export async function resetNotifyTokenAction(studyId: string, formData: FormData) {
  await requireOwner(studyId);
  const notifyExpires = String(formData.get("notifyExpires") ?? "").trim();
  if (!notifyExpires) return;

  await Project.updateOne(
    { _id: studyId },
    {
      $set: {
        notifyToken: crypto.randomBytes(20).toString("hex"),
        notifyExpires: new Date(notifyExpires),
      },
    },
  );

  redirect(`/dashboard/${studyId}/api`);
}
