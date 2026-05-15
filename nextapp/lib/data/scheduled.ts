import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import AgendaJob, { type IAgendaJob } from "@/lib/models/agendaJob";
import PendingNotification, { type IPendingNotification } from "@/lib/models/pendingNotification";
import mongoose from "mongoose";

export interface NotificationConfig {
  id: string;
  name: string;
  title: string;
  message: string;
  url?: string;
  created?: Date;
  timezone?: string;
  useParticipantTimezone?: boolean;
  date?: Date;
  window_from?: Date;
  window_to?: Date;
  number?: number;
  distance?: number;
  int_start?: Date;
  int_end?: Date;
  start_event?: string;
  start_next?: number | string;
  start_after?: { days?: number; hours?: number; minutes?: number } | string;
  stop_event?: string;
  stop_next?: number | string;
  stop_after?: { days?: number; hours?: number; minutes?: number } | string;
  readable?: { from?: string; to?: string; interval?: string };
  windowInterval?: { number?: number; distance?: number };
  allCurrentParticipants?: boolean;
  allCurrentGroups?: boolean;
  participantId?: string[];
  groups?: string[];
  randomize?: boolean;
  yokedDesign?: boolean;
  scheduleInFuture?: boolean;
  schedule?: string;
  delay?: { days?: number; hours?: number; minutes?: number };
  expireIn?: number;
  reminders?: Array<{ title: string; message: string; time: number }>;
}

export async function fetchScheduledNotifications(projectId: string): Promise<NotificationConfig[]> {
  await connectDB();
  const project = await Project.findById(projectId, { notifications: 1 }).lean();
  if (!project) return [];
  return ((project as unknown as { notifications?: NotificationConfig[] }).notifications ?? []);
}

export async function fetchJobsForNotification(
  projectId: string,
  notificationConfigId: string,
  type?: string,
): Promise<IAgendaJob[]> {
  await connectDB();
  const filter: Record<string, unknown> = {
    "data.projectid": projectId,
    "data.id": notificationConfigId,
  };

  if (type) {
    const typeMap: Record<string, string[]> = {
      "one-time": ["one_time_notification"],
      repeat: ["regular_notification", "start_manager", "end_manager"],
      personal: ["personal_notification", "start_personal_manager", "end_personal_manager"],
      "random-personal": ["start_random_personal_manager", "end_random_personal_manager", "random_personal_notification"],
    };
    const names = typeMap[type];
    if (names) filter.name = { $in: names };
  }

  const jobs = await AgendaJob.find(filter).sort({ nextRunAt: 1 }).limit(500).lean();
  return jobs as unknown as IAgendaJob[];
}

const PN_PAGE_SIZE = 50;

const PN_SORT_FIELDS: Record<string, string> = {
  scheduledFor: "scheduledFor",
  status: "status",
};

export async function fetchPendingNotifications(
  projectId: string,
  notificationConfigId: string | undefined,
  statuses?: string[],
  participantId?: string,
  page = 1,
  sort = "scheduledFor",
  dir = "asc",
): Promise<{ items: IPendingNotification[]; count: number; pages: number }> {
  await connectDB();
  const oid = new mongoose.Types.ObjectId(projectId);
  const filter: Record<string, unknown> = { projectId: oid };
  if (notificationConfigId) filter.notificationConfigId = notificationConfigId;

  if (statuses && statuses.length > 0) {
    filter.status = statuses.length === 1 ? statuses[0] : { $in: statuses };
  }

  if (participantId) {
    filter.$or = [
      { recipientUserIds: participantId },
      { recipientUserIds: { $size: 0 } },
    ];
  }

  const sortField = PN_SORT_FIELDS[sort] ?? "scheduledFor";
  const sortDir = dir === "desc" ? -1 : 1;
  const skip = (Math.max(1, page) - 1) * PN_PAGE_SIZE;

  const [items, count] = await Promise.all([
    PendingNotification.find(filter)
      .sort({ [sortField]: sortDir })
      .skip(skip)
      .limit(PN_PAGE_SIZE)
      .lean(),
    PendingNotification.countDocuments(filter),
  ]);

  return {
    items: items as unknown as IPendingNotification[],
    count,
    pages: Math.ceil(count / PN_PAGE_SIZE),
  };
}

export async function fetchAgendaJobById(jobId: string): Promise<IAgendaJob | null> {
  await connectDB();
  const job = await AgendaJob.findById(jobId).lean();
  return job as unknown as IAgendaJob | null;
}

export async function fetchHasPendingNotifications(
  projectId: string,
  notificationConfigId: string,
): Promise<boolean> {
  await connectDB();
  const oid = mongoose.Types.ObjectId.isValid(projectId)
    ? new mongoose.Types.ObjectId(projectId)
    : projectId;
  const exists = await PendingNotification.exists({ projectId: oid, notificationConfigId });
  return !!exists;
}
