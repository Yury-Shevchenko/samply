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
  const notifyExpiresRaw = String(formData.get("notifyExpires") ?? "").trim();
  if (!notifyExpiresRaw) return;

  const expiresDate = new Date(notifyExpiresRaw);
  if (isNaN(expiresDate.getTime()) || expiresDate.getTime() <= Date.now()) {
    redirect(`/dashboard/${studyId}/api?error=` + encodeURIComponent("Expiry must be a valid future date."));
  }

  await Project.updateOne(
    { _id: studyId },
    {
      $set: {
        notifyToken: crypto.randomBytes(20).toString("hex"),
        notifyExpires: expiresDate,
      },
    },
  );

  redirect(`/dashboard/${studyId}/api`);
}
