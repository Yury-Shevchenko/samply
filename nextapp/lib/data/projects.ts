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
  participantCount: number;
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
    groupEntryMethod?: "code" | "list" | "random";
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

const PROJECT_LIST_PROJECTION = {
  name: 1,
  description: 1,
  members: 1,
  currentlyActive: 1,
  creator: 1,
  slug: 1,
  public: 1,
  requestedForApproval: 1,
  participantCount: { $size: { $ifNull: ["$mobileUsers", []] } },
};

async function fetchProjectList(match: Record<string, unknown>): Promise<ProjectListItem[]> {
  const docs = await Project.aggregate([
    { $match: match },
    { $project: PROJECT_LIST_PROJECTION },
  ]);
  return docs as unknown as ProjectListItem[];
}

export async function fetchUserProjects(userId: string): Promise<{
  projects: ProjectListItem[];
  invitedProjects: ProjectListItem[];
}> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(userId);

  const [projects, invitedProjects] = await Promise.all([
    fetchProjectList({ creator: oid }),
    fetchProjectList({ members: oid }),
  ]);

  return { projects, invitedProjects };
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

  const participantCount = ((p.mobileUsers as unknown[]) ?? []).length;

  // Use JSON round-trip to convert all BSON ObjectIds to plain strings
  // so the result can be safely passed to Client Components.
  const plain = JSON.parse(JSON.stringify(project)) as ProjectFull;
  plain.participantCount = participantCount;
  return plain;
}

export async function fetchMemberEmails(memberIds: string[]): Promise<string[]> {
  await connectDB();
  const users = await User.find({ _id: { $in: memberIds } }, { email: 1 }).lean();
  return (users as unknown as { email: string }[]).map((u) => u.email);
}
