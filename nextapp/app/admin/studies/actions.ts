"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { purgeProjectData } from "@/lib/data/erasure";

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

  // Cascade-delete all study data (responses, queued notifications, jobs,
  // consent records) before removing the project (GDPR Art. 17).
  await purgeProjectData(projectId);
  await project.deleteOne();

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
