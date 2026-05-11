import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import User from "@/lib/models/user";
import mongoose from "mongoose";

export interface ProjectListItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  currentlyActive: boolean;
  public: boolean;
  requestedForApproval?: boolean;
  creator: string;
  members: string[];
}

export interface GeoLocation {
  slug: string;
  title: string;
  latitude: number;
  longitude: number;
  radius: number;
  header?: string;
  message?: string;
  link?: string;
  exitzone?: number;
  mintimewindow?: number;
  events?: string[];
  invisible?: boolean;
}

export interface ProjectFull extends ProjectListItem {
  notifyToken?: string;
  notifyExpires?: string;
  welcomeMessage?: string;
  codeMessage?: string;
  groupMessage?: string;
  messageAfterJoin?: string;
  completionMessage?: string;
  geofencingInstruction?: string;
  image?: string;
  settings?: {
    askParticipantCode?: boolean;
    askParticipantGroup?: boolean;
    enableEvents?: boolean;
    eventDescription?: string;
    events?: Array<{ num: number; caption: string; url: string }>;
    enableGeofencing?: boolean;
    geofencing?: {
      link?: string;
      radius?: number;
      header?: string;
      message?: string;
      exitzone?: number;
      mintimewindow?: number;
      events?: string[];
      invisible?: boolean;
      locations?: GeoLocation[];
    };
    enableActions?: boolean;
    actions?: Array<{ num: number; identifier: string; buttonTitle: string }>;
    enableWebhooks?: boolean;
    webhookEndpoint?: string;
    webhookEvents?: string[];
    permanentLink?: string;
  };
}

const PROJECT_FIELDS = {
  name: 1,
  description: 1,
  members: 1,
  currentlyActive: 1,
  creator: 1,
  slug: 1,
  public: 1,
  requestedForApproval: 1,
};

export async function fetchUserProjects(userId: string): Promise<{
  projects: ProjectListItem[];
  invitedProjects: ProjectListItem[];
}> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(userId);

  const [projects, invitedProjects] = await Promise.all([
    Project.find({ creator: oid }, PROJECT_FIELDS).lean(),
    Project.find({ members: oid }, PROJECT_FIELDS).lean(),
  ]);

  return {
    projects: projects as unknown as ProjectListItem[],
    invitedProjects: invitedProjects as unknown as ProjectListItem[],
  };
}

export async function fetchProjectById(id: string, userId: string): Promise<ProjectFull | null> {
  await connectDB();
  const project = await Project.findById(id).lean();
  if (!project) return null;

  const p = project as unknown as Record<string, unknown>;
  const creatorStr = String(p.creator);
  const membersArr = ((p.members as unknown[]) ?? []).map(String);

  const isOwner = creatorStr === userId;
  const isMember = membersArr.some((m) => m === userId);
  if (!isOwner && !isMember) return null;

  // Use JSON round-trip to convert all BSON ObjectIds to plain strings
  // so the result can be safely passed to Client Components.
  return JSON.parse(JSON.stringify(project)) as ProjectFull;
}

export async function fetchMemberEmails(memberIds: string[]): Promise<string[]> {
  await connectDB();
  const users = await User.find({ _id: { $in: memberIds } }, { email: 1 }).lean();
  return (users as unknown as { email: string }[]).map((u) => u.email);
}
