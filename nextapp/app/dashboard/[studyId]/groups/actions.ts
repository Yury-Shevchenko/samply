"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz", 4);

interface MobileUserDoc {
  id: string;
  group?: { id: string; name: string };
  [key: string]: unknown;
}

async function requireAccess(projectId: string) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();
  const project = await Project.findById(projectId, { creator: 1, members: 1, mobileUsers: 1 }).lean();
  if (!project) redirect(`/dashboard/${projectId}/groups`);

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    mobileUsers: MobileUserDoc[];
  };

  const isOwner = p.creator.toString() === session.user.id;
  const isMember = p.members?.some((m) => m.toString() === session.user.id) ?? false;
  if (!isOwner && !isMember) redirect("/dashboard");

  return p;
}

export async function createGroupAction(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const groupName = formData.get("groupName") as string;
  const participants = formData.getAll("participants") as string[];

  if (!projectId || !groupName || !participants.length) redirect(`/dashboard/${projectId}/groups`);

  const p = await requireAccess(projectId);

  const existing = p.mobileUsers.find((u) => u.group?.name === groupName);
  const groupId = existing?.group?.id ?? nanoid();

  const updatedUsers = p.mobileUsers.map((u) => {
    if (participants.includes(u.id)) return { ...u, group: { id: groupId, name: groupName } };
    return u;
  });

  await Project.findByIdAndUpdate(projectId, { $set: { mobileUsers: updatedUsers } });
  redirect(`/dashboard/${projectId}/groups`);
}

export async function deleteGroupAction(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const groupId = formData.get("groupId") as string;

  if (!projectId || !groupId) redirect(`/dashboard/${projectId}/groups`);

  const p = await requireAccess(projectId);

  const updatedUsers = p.mobileUsers.map((u) => {
    if (u.group?.id === groupId) {
      const { group: _g, ...rest } = u;
      return rest;
    }
    return u;
  });

  await Project.findByIdAndUpdate(projectId, { $set: { mobileUsers: updatedUsers } });
  redirect(`/dashboard/${projectId}/groups`);
}
