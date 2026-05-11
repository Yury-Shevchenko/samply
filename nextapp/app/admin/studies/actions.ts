"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import mongoose from "mongoose";

async function requireSuperAdmin() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
  return session;
}

export async function deleteStudyAction(projectId: string) {
  await requireSuperAdmin();
  await connectDB();

  const project = await Project.findById(projectId);
  if (!project) redirect("/admin/studies");

  const Result = mongoose.model("Result");
  const resultsCount = await Result.countDocuments({ project: projectId });

  if (resultsCount > 0) {
    await Promise.all([
      Result.deleteMany({ project: projectId }),
      project.deleteOne(),
    ]);
  } else {
    await project.deleteOne();
  }

  redirect("/admin/studies");
}

export async function toggleStudyPublicAction(projectId: string) {
  await requireSuperAdmin();
  await connectDB();

  const project = await Project.findById(projectId, { public: 1 }).lean();
  if (!project) redirect("/admin/studies");

  const current = (project as unknown as { public?: boolean }).public ?? false;
  await Project.findByIdAndUpdate(projectId, {
    $set: { public: !current, requestedForApproval: false },
  });

  redirect("/admin/studies");
}
