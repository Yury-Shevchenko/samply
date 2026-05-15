import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import User from "@/lib/models/user";
import Result from "@/lib/models/result";
import PendingNotification from "@/lib/models/pendingNotification";
import AgendaJob from "@/lib/models/agendaJob";
import mongoose, { type PipelineStage } from "mongoose";

const MAX_SEARCH_LEN = 200;

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface AdminProject {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  codeMessage?: string;
  geofencingInstruction?: string;
  image?: string;
  created?: Date;
  author_name: string[];
  author_institute: string[];
  memberCount: number;
  participantCount: number;
  currentlyActive?: boolean;
  requestedForApproval?: boolean;
  public?: boolean;
  enableGeofencing?: boolean;
}

export interface AdminUser {
  _id: string;
  level?: number;
  created?: Date;
  samplyId?: string;
  name?: string;
  email?: string;
  emailIsConfirmed?: boolean;
  institute?: string;
  participant_projects?: unknown[];
  projects?: unknown[];
}

export interface AdminNotification {
  _id: string;
  status: string;
  scheduledFor?: Date;
  projectId?: { _id: string; name: string } | string;
  title?: string;
  message?: string;
  recipientUserIds?: string[];
  recipientGroupIds?: string[];
  isReminder?: boolean;
  notificationConfigId?: string;
}

const STUDY_SORT_FIELDS: Record<string, string> = {
  name: "name", created: "created", memberCount: "memberCount",
  participantCount: "participantCount", currentlyActive: "currentlyActive", public: "public",
};

const STUDIES_PAGE_SIZE = 100;

export async function fetchAdminStudies(
  sort = "created", dir = "asc", page = 1, q = ""
): Promise<{ projects: AdminProject[]; count: number; pages: number; skip: number }> {
  await connectDB();
  const sortField = STUDY_SORT_FIELDS[sort] ?? "created";
  const sortOrder = dir === "desc" ? -1 : 1;
  const skip = (page - 1) * STUDIES_PAGE_SIZE;

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: "users",
        localField: "creator",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        name: 1, slug: 1, description: 1, codeMessage: 1,
        geofencingInstruction: 1, image: 1, created: 1,
        author_name: "$author.name",
        author_institute: "$author.institute",
        memberCount: { $size: { $ifNull: ["$members", []] } },
        participantCount: { $size: { $ifNull: ["$mobileUsers", []] } },
        currentlyActive: 1, requestedForApproval: 1, public: 1,
        enableGeofencing: "$settings.enableGeofencing",
      },
    },
    ...(q.trim() ? [{
      $match: {
        $or: [
          { name: { $regex: escapeRegex(q.trim().slice(0, MAX_SEARCH_LEN)), $options: "i" } },
          { slug: { $regex: escapeRegex(q.trim().slice(0, MAX_SEARCH_LEN)), $options: "i" } },
          { description: { $regex: escapeRegex(q.trim().slice(0, MAX_SEARCH_LEN)), $options: "i" } },
          { author_name: { $elemMatch: { $regex: escapeRegex(q.trim().slice(0, MAX_SEARCH_LEN)), $options: "i" } } },
          { author_institute: { $elemMatch: { $regex: escapeRegex(q.trim().slice(0, MAX_SEARCH_LEN)), $options: "i" } } },
        ],
      },
    }] : []),
    { $sort: { [sortField]: sortOrder } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: STUDIES_PAGE_SIZE }],
        total: [{ $count: "n" }],
      },
    },
  ];

  const [facet] = await Project.aggregate(pipeline);
  const count: number = facet?.total?.[0]?.n ?? 0;
  const results: object[] = facet?.data ?? [];

  return {
    projects: results.map((r: object) => {
      const d = r as Record<string, unknown>;
      return {
        _id: String(d._id),
        name: (d.name as string) ?? "",
        slug: d.slug as string | undefined,
        description: d.description as string | undefined,
        codeMessage: d.codeMessage as string | undefined,
        geofencingInstruction: d.geofencingInstruction as string | undefined,
        image: d.image as string | undefined,
        created: d.created as Date | undefined,
        author_name: (d.author_name as string[]) ?? [],
        author_institute: (d.author_institute as string[]) ?? [],
        memberCount: (d.memberCount as number) ?? 0,
        participantCount: (d.participantCount as number) ?? 0,
        currentlyActive: d.currentlyActive as boolean | undefined,
        requestedForApproval: d.requestedForApproval as boolean | undefined,
        public: d.public as boolean | undefined,
        enableGeofencing: d.enableGeofencing as boolean | undefined,
      };
    }),
    count,
    pages: Math.ceil(count / STUDIES_PAGE_SIZE) || 1,
    skip,
  };
}

const USER_SORT_FIELDS: Record<string, string> = {
  name: "name", email: "email", level: "level", created: "created",
  emailIsConfirmed: "emailIsConfirmed", institute: "institute",
};

const USERS_PAGE_SIZE = 100;

export async function fetchAdminUsers(page: number, sort = "created", dir = "asc", filter = "", q = ""): Promise<{
  users: AdminUser[]; count: number; pages: number; skip: number;
}> {
  await connectDB();
  const skip = (page - 1) * USERS_PAGE_SIZE;
  const sortField = USER_SORT_FIELDS[sort] ?? "created";
  const sortOrder = dir === "desc" ? -1 : 1;

  const filterQuery: Record<string, unknown> =
    filter === "researchers"  ? { level: { $gt: 10, $lte: 100 } } :
    filter === "participants" ? { $or: [{ level: { $lte: 10 } }, { level: { $exists: false } }] } :
    filter === "admins"       ? { level: { $gt: 100 } } :
    filter === "unconfirmed"  ? { emailIsConfirmed: { $ne: true } } :
    {};

  const safeQ = escapeRegex(q.trim().slice(0, MAX_SEARCH_LEN));
  const searchQuery: Record<string, unknown> = q.trim() ? {
    $or: [
      { name: { $regex: safeQ, $options: "i" } },
      { email: { $regex: safeQ, $options: "i" } },
      { institute: { $regex: safeQ, $options: "i" } },
      { samplyId: { $regex: safeQ, $options: "i" } },
    ],
  } : {};

  const query = Object.keys(filterQuery).length && Object.keys(searchQuery).length
    ? { $and: [filterQuery, searchQuery] }
    : Object.keys(filterQuery).length ? filterQuery
    : Object.keys(searchQuery).length ? searchQuery
    : {};

  const [users, count] = await Promise.all([
    User.find(query).sort({ [sortField]: sortOrder }).skip(skip).limit(USERS_PAGE_SIZE).lean(),
    User.countDocuments(query),
  ]);
  const pages = Math.ceil(count / USERS_PAGE_SIZE) || 1;
  return {
    users: users.map((u) => ({
      _id: String((u as { _id: unknown })._id),
      level: (u as { level?: number }).level,
      created: (u as { created?: Date }).created,
      samplyId: (u as { samplyId?: string }).samplyId,
      name: (u as { name?: string }).name,
      email: (u as { email?: string }).email,
      emailIsConfirmed: (u as { emailIsConfirmed?: boolean }).emailIsConfirmed,
      institute: (u as { institute?: string }).institute,
      participant_projects: (u as { participant_projects?: unknown[] }).participant_projects ?? [],
      projects: (u as { projects?: unknown[] }).projects ?? [],
    })),
    count,
    pages,
    skip,
  };
}

export interface AdminStudyDetail {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  welcomeMessage?: string;
  codeMessage?: string;
  groupMessage?: string;
  messageAfterJoin?: string;
  completionMessage?: string;
  geofencingInstruction?: string;
  image?: string;
  created?: Date;
  currentlyActive?: boolean;
  requestedForApproval?: boolean;
  public?: boolean;
  settings?: Record<string, unknown>;
  creator?: { _id: string; name?: string; email?: string };
  memberCount: number;
  members: Array<{ _id: string; name?: string; email?: string }>;
  participantCount: number;
  lastActivityDate?: Date;
  lastActivityTitle?: string;
  lastActivityMessage?: string;
}

export interface AdminUserDetail {
  _id: string;
  level?: number;
  created?: Date;
  samplyId?: string;
  name?: string;
  email?: string;
  emailIsConfirmed?: boolean;
  institute?: string;
  language?: string;
  code?: { id?: string };
  participant_projects?: Array<{ _id: string; name?: string; slug?: string }>;
  createdStudies: Array<{ _id: string; name?: string; currentlyActive?: boolean; created?: Date; public?: boolean }>;
}

export async function fetchAdminStudyDetail(id: string): Promise<AdminStudyDetail | null> {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const project = await Project.findById(id).lean() as Record<string, unknown> | null;
  if (!project) return null;

  const memberIds = ((project.members as unknown[]) ?? []).map(String);

  const [creatorDoc, memberDocs, lastNotif] = await Promise.all([
    project.creator
      ? User.findById(project.creator, { name: 1, email: 1 }).lean() as Promise<{ _id: unknown; name?: string; email?: string } | null>
      : Promise.resolve(null),
    memberIds.length
      ? User.find({ _id: { $in: memberIds } }, { name: 1, email: 1 }).lean() as Promise<Array<{ _id: unknown; name?: string; email?: string }>>
      : Promise.resolve([]),
    PendingNotification.findOne(
      { projectId: new mongoose.Types.ObjectId(id), status: "sent" },
      { scheduledFor: 1, title: 1, message: 1 },
    ).sort({ scheduledFor: -1 }).lean() as Promise<{ scheduledFor?: Date; title?: string; message?: string } | null>,
  ]);

  return {
    _id: id,
    name: String(project.name ?? ""),
    slug: project.slug as string | undefined,
    description: project.description as string | undefined,
    welcomeMessage: project.welcomeMessage as string | undefined,
    codeMessage: project.codeMessage as string | undefined,
    groupMessage: project.groupMessage as string | undefined,
    messageAfterJoin: project.messageAfterJoin as string | undefined,
    completionMessage: project.completionMessage as string | undefined,
    geofencingInstruction: project.geofencingInstruction as string | undefined,
    image: project.image as string | undefined,
    created: project.created as Date | undefined,
    currentlyActive: project.currentlyActive as boolean | undefined,
    requestedForApproval: project.requestedForApproval as boolean | undefined,
    public: project.public as boolean | undefined,
    settings: project.settings as Record<string, unknown> | undefined,
    creator: creatorDoc ? { _id: String(creatorDoc._id), name: creatorDoc.name, email: creatorDoc.email } : undefined,
    memberCount: memberIds.length,
    members: memberDocs.map((m) => ({ _id: String(m._id), name: m.name, email: m.email })),
    participantCount: ((project.mobileUsers as unknown[]) ?? []).length,
    lastActivityDate: lastNotif?.scheduledFor,
    lastActivityTitle: lastNotif?.title,
    lastActivityMessage: lastNotif?.message,
  };
}

export async function fetchAdminUserDetail(id: string): Promise<AdminUserDetail | null> {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const [user, createdStudies] = await Promise.all([
    User.findById(id).lean() as Promise<Record<string, unknown> | null>,
    Project.find(
      { creator: new mongoose.Types.ObjectId(id) },
      { name: 1, currentlyActive: 1, created: 1, public: 1 },
    ).sort({ created: -1 }).lean() as Promise<Array<{ _id: unknown; name?: string; currentlyActive?: boolean; created?: Date; public?: boolean }>>,
  ]);

  if (!user) return null;

  return {
    _id: id,
    level: user.level as number | undefined,
    created: user.created as Date | undefined,
    samplyId: user.samplyId as string | undefined,
    name: user.name as string | undefined,
    email: user.email as string | undefined,
    emailIsConfirmed: user.emailIsConfirmed as boolean | undefined,
    institute: user.institute as string | undefined,
    language: user.language as string | undefined,
    code: user.code as { id?: string } | undefined,
    participant_projects: ((user.participant_projects as Array<{ _id: unknown; name?: string; slug?: string }>) ?? []).map((p) => ({
      _id: String(p._id),
      name: p.name,
      slug: p.slug,
    })),
    createdStudies: createdStudies.map((p) => ({
      _id: String(p._id),
      name: p.name,
      currentlyActive: p.currentlyActive,
      created: p.created,
      public: p.public,
    })),
  };
}

const NOTIF_SORT_FIELDS: Record<string, string> = {
  scheduledFor: "scheduledFor", status: "status",
};

export async function fetchAdminNotifications(
  page: number,
  status?: string,
  projectId?: string,
  sort = "scheduledFor",
  dir = "asc",
): Promise<{
  notifications: AdminNotification[];
  count: number;
  pages: number;
  skip: number;
  projects: Array<{ _id: string; name: string }>;
  agendaByType: Record<string, number>;
  agendaTotal: number;
}> {
  await connectDB();
  const limit = 100;
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
    filter.projectId = new mongoose.Types.ObjectId(projectId);
  }

  const sortField = NOTIF_SORT_FIELDS[sort] ?? "scheduledFor";
  const sortOrder = dir === "desc" ? -1 : 1;
  const [rawNotifications, count, agendaJobs, rawProjects] = await Promise.all([
    PendingNotification.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limit).lean(),
    PendingNotification.countDocuments(filter),
    AgendaJob.find({ nextRunAt: { $exists: true } }).lean(),
    Project.find({}, { name: 1 }).sort({ name: 1 }).lean(),
  ]);

  // Collect projectIds to look up names
  const projectOids = [
    ...new Set(
      rawNotifications
        .map((n) => String((n as { projectId?: unknown }).projectId))
        .filter(Boolean)
    ),
  ];
  const projectNameMap = new Map<string, string>();
  if (projectOids.length) {
    const ps = await Project.find(
      { _id: { $in: projectOids.map((id) => new mongoose.Types.ObjectId(id)) } },
      { name: 1 },
    ).lean();
    for (const p of ps) projectNameMap.set(String((p as { _id: unknown })._id), (p as { name?: string }).name ?? "");
  }

  const agendaByType: Record<string, number> = {};
  for (const job of agendaJobs) {
    const name = String((job as { name?: unknown }).name ?? "unknown");
    agendaByType[name] = (agendaByType[name] ?? 0) + 1;
  }

  return {
    notifications: rawNotifications.map((n) => {
      const raw = n as unknown as Record<string, unknown>;
      const projId = String(raw.projectId ?? "");
      return {
        _id: String(raw._id),
        status: String(raw.status ?? ""),
        scheduledFor: raw.scheduledFor as Date | undefined,
        projectId: projectNameMap.has(projId)
          ? { _id: projId, name: projectNameMap.get(projId)! }
          : projId,
        title: String(raw.title ?? ""),
        message: String(raw.message ?? ""),
        recipientUserIds: (raw.recipientUserIds as string[]) ?? [],
        recipientGroupIds: (raw.recipientGroupIds as string[]) ?? [],
        isReminder: raw.isReminder as boolean | undefined,
        notificationConfigId: String(raw.notificationConfigId ?? ""),
      };
    }),
    count,
    pages: Math.ceil(count / limit),
    skip,
    projects: rawProjects.map((p) => ({
      _id: String((p as { _id: unknown })._id),
      name: (p as { name?: string }).name ?? "",
    })),
    agendaByType,
    agendaTotal: agendaJobs.length,
  };
}

// ── Platform-wide analytics ───────────────────────────────────────────────────

export interface PlatformOverview {
  totalStudies: number;
  activeStudies: number;
  totalResearchers: number;
  totalParticipants: number;
  notifications7d: number;
  responded7d: number;
  compliance7dPct: number;
  newStudies7d: number;
  newResearchers7d: number;
}

export interface PlatformTimeSeriesPoint {
  date: string;
  sent: number;
  responded: number;
  newStudies: number;
  newResearchers: number;
}

export interface TopStudyRow {
  id: string;
  name: string;
  participantCount: number;
  currentlyActive: boolean;
}

export interface StudyComplianceBucket {
  bucket: string;
  count: number;
}

export interface PlatformAnalytics {
  overview: PlatformOverview;
  timeSeries: PlatformTimeSeriesPoint[];
  topStudies: TopStudyRow[];
  complianceDistribution: StudyComplianceBucket[];
}

export async function fetchPlatformAnalytics(days = 30): Promise<PlatformAnalytics> {
  await connectDB();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalStudies,
    activeStudies,
    totalResearchers,
    participantAgg,
    notifications7d,
    responded7d,
    newStudies7d,
    newResearchers7d,
    notifTimeSeries,
    studyTimeSeries,
    researcherTimeSeries,
    topStudiesRaw,
    complianceRaw,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ currentlyActive: true }),
    User.countDocuments({ level: { $gt: 10 } }),
    Project.aggregate([
      { $project: { count: { $size: { $ifNull: ["$mobileUsers", []] } } } },
      { $group: { _id: null, total: { $sum: "$count" } } },
    ]),
    Result.countDocuments({ created: { $gte: since7d } }),
    Result.countDocuments({ created: { $gte: since7d }, "events.status": "tapped" }),
    Project.countDocuments({ created: { $gte: since7d } }),
    User.countDocuments({ created: { $gte: since7d }, level: { $gt: 10 } }),

    // Notifications sent/responded per day
    Result.aggregate([
      { $match: { created: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
          sent: { $sum: 1 },
          responded: { $sum: { $cond: [{ $in: ["tapped", "$events.status"] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]),

    // New studies per day
    Project.aggregate([
      { $match: { created: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),

    // New researchers per day
    User.aggregate([
      { $match: { created: { $gte: since }, level: { $gt: 10 } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$created" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),

    // Top 10 studies by participant count
    Project.aggregate([
      { $project: { name: 1, currentlyActive: 1, participantCount: { $size: { $ifNull: ["$mobileUsers", []] } } } },
      { $sort: { participantCount: -1 } },
      { $limit: 10 },
    ]),

    // Per-study compliance in the last 7 days — bucketed into 5 bands
    Result.aggregate([
      { $match: { created: { $gte: since7d } } },
      {
        $group: {
          _id: "$project",
          sent: { $sum: 1 },
          responded: { $sum: { $cond: [{ $in: ["tapped", "$events.status"] }, 1, 0] } },
        },
      },
      { $project: { pct: { $multiply: [{ $divide: ["$responded", { $max: ["$sent", 1] }] }, 100] } } },
      {
        $bucket: {
          groupBy: "$pct",
          boundaries: [0, 20, 40, 60, 80, 100],
          default: 100,
          output: { count: { $sum: 1 } },
        },
      },
    ]),
  ]);

  // Merge the three per-day series into one combined time-series, filling gaps
  const notifMap = new Map<string, { sent: number; responded: number }>(
    notifTimeSeries.map((r: { _id: string; sent: number; responded: number }) => [r._id, { sent: r.sent, responded: r.responded }]),
  );
  const studyMap = new Map<string, number>(
    studyTimeSeries.map((r: { _id: string; count: number }) => [r._id, r.count]),
  );
  const researcherMap = new Map<string, number>(
    researcherTimeSeries.map((r: { _id: string; count: number }) => [r._id, r.count]),
  );

  const timeSeries: PlatformTimeSeriesPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    timeSeries.push({
      date: key,
      sent: notifMap.get(key)?.sent ?? 0,
      responded: notifMap.get(key)?.responded ?? 0,
      newStudies: studyMap.get(key) ?? 0,
      newResearchers: researcherMap.get(key) ?? 0,
    });
  }

  const COMPLIANCE_LABELS: Record<number, string> = {
    0: "0–20%",
    20: "20–40%",
    40: "40–60%",
    60: "60–80%",
    80: "80–100%",
    100: "100%",
  };
  const compMap = new Map<number, number>(
    complianceRaw.map((r: { _id: number; count: number }) => [r._id, r.count]),
  );
  const complianceDistribution: StudyComplianceBucket[] = Object.entries(COMPLIANCE_LABELS).map(
    ([boundary, label]) => ({ bucket: label, count: compMap.get(Number(boundary)) ?? 0 }),
  );

  return {
    overview: {
      totalStudies,
      activeStudies,
      totalResearchers,
      totalParticipants: (participantAgg[0] as { total?: number } | undefined)?.total ?? 0,
      notifications7d,
      responded7d,
      compliance7dPct: notifications7d > 0 ? Math.round((responded7d / notifications7d) * 100) : 0,
      newStudies7d,
      newResearchers7d,
    },
    timeSeries,
    topStudies: topStudiesRaw.map((r: { _id: unknown; name?: string; participantCount: number; currentlyActive?: boolean }) => ({
      id: String(r._id),
      name: r.name ?? "—",
      participantCount: r.participantCount,
      currentlyActive: r.currentlyActive ?? false,
    })),
    complianceDistribution,
  };
}
