"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { customAlphabet } from "nanoid";
import mongoose from "mongoose";
import { scheduleForUser, type StoredConfig } from "@/lib/scheduleForUser";

const nanoid = customAlphabet("346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz", 4);

interface MobileUserDoc {
  id: string;
  created?: Date;
  group?: { id: string; name: string };
  [key: string]: unknown;
}

interface ProjectGroupDoc {
  id: string;
  name: string;
}

async function requireAccess(projectId: string) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();
  const project = await Project.findById(projectId, { creator: 1, members: 1, mobileUsers: 1, projectGroups: 1, notifications: 1 }).lean();
  if (!project) redirect(`/dashboard/${projectId}/groups`);

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    mobileUsers: MobileUserDoc[];
    projectGroups?: ProjectGroupDoc[];
    notifications?: unknown[];
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

  if (!projectId || !groupName) redirect(`/dashboard/${projectId}/groups`);

  const p = await requireAccess(projectId);

  // Reuse existing group ID if name matches, otherwise generate a new one
  const existingInUsers = (p.mobileUsers ?? []).find((u) => u.group?.name === groupName);
  const existingInGroups = (p.projectGroups ?? []).find((g) => g.name === groupName);
  const groupId = existingInUsers?.group?.id ?? existingInGroups?.id ?? nanoid();

  const mobileUsers = p.mobileUsers ?? [];

  // Identify newly assigned participants (not already in this group)
  const newlyAssigned = mobileUsers.filter(
    (u) => participants.includes(u.id) && u.group?.id !== groupId
  );

  // Assign participants to the group
  const updatedUsers = mobileUsers.map((u) => {
    if (participants.includes(u.id)) return { ...u, group: { id: groupId, name: groupName } };
    return u;
  });

  // Keep projectGroups in sync — ensure this group is always registered there
  const existingGroups: ProjectGroupDoc[] = p.projectGroups ?? [];
  const groupAlreadyRegistered = existingGroups.some((g) => g.id === groupId);
  const updatedProjectGroups = groupAlreadyRegistered
    ? existingGroups
    : [...existingGroups, { id: groupId, name: groupName }];

  await Project.findByIdAndUpdate(projectId, {
    $set: { mobileUsers: updatedUsers, projectGroups: updatedProjectGroups },
  });

  // Auto-schedule non-yoked notifications for newly assigned participants
  let autoScheduled = 0;
  if (newlyAssigned.length > 0 && p.notifications?.length) {
    const projectOid = new mongoose.Types.ObjectId(projectId);
    for (const user of newlyAssigned) {
      if (!user.created) continue;
      const r = await scheduleForUser(projectOid, { id: user.id, created: user.created }, groupId, p.notifications as StoredConfig[]);
      autoScheduled += r.inserted;
    }
  }

  redirect(`/dashboard/${projectId}/groups?autoScheduled=${autoScheduled}`);
}

export async function deleteGroupAction(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const groupId = formData.get("groupId") as string;

  if (!projectId || !groupId) redirect(`/dashboard/${projectId}/groups`);

  const p = await requireAccess(projectId);

  const updatedUsers = (p.mobileUsers ?? []).map((u) => {
    if (u.group?.id === groupId) {
      const { group: _g, ...rest } = u;
      return rest;
    }
    return u;
  });

  const updatedProjectGroups = (p.projectGroups ?? []).filter((g) => g.id !== groupId);

  await Project.findByIdAndUpdate(projectId, {
    $set: { mobileUsers: updatedUsers, projectGroups: updatedProjectGroups },
  });
  redirect(`/dashboard/${projectId}/groups`);
}
