import connectDB from "@/lib/db";
import Project, { type PublicProject, type ProjectDetail } from "@/lib/models/project";
import User from "@/lib/models/user";
import type mongoose from "mongoose";

export type StudyContact = { name?: string; email?: string };

const LIMIT = 20;

export async function fetchStudies(page: number): Promise<{
  projects: PublicProject[];
  count: number;
  pages: number;
  page: number;
}> {
  await connectDB();
  const skip = (page - 1) * LIMIT;

  const [projects, count] = await Promise.all([
    Project.aggregate([
      { $match: { currentlyActive: true, public: true } },
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
          name: "$$ROOT.name",
          slug: "$$ROOT.slug",
          description: "$$ROOT.description",
          welcomeMessage: "$$ROOT.welcomeMessage",
          messageAfterJoin: "$$ROOT.messageAfterJoin",
          created: "$$ROOT.created",
          author_name: "$author.name",
          author_institute: "$author.institute",
        },
      },
      { $sort: { name: 1 } },
      { $skip: skip },
      { $limit: LIMIT },
    ]),
    Project.countDocuments({ currentlyActive: true, public: true, creator: { $exists: true } }),
  ]);

  const pages = Math.ceil(count / LIMIT);
  return { projects: projects as PublicProject[], count, pages, page };
}

export async function fetchStudyBySlug(slug: string): Promise<{
  project: ProjectDetail | null;
  author: { name: string; institute: string } | null;
}> {
  await connectDB();

  const project = await Project.findOne(
    { slug, currentlyActive: true },
    { name: 1, description: 1, currentlyActive: 1, tests: 1, creator: 1, created: 1, slug: 1, image: 1 },
  ).lean();

  if (!project) return { project: null, author: null };

  const p = project as unknown as ProjectDetail;
  const author = await User.findOne({ _id: p.creator }, { name: 1, institute: 1 }).lean();

  return {
    project: p,
    author: author as unknown as { name: string; institute: string } | null,
  };
}

/**
 * Resolve the creator (researcher) contact info for a set of project IDs.
 * Returned as a Map keyed by stringified projectId so callers don't need to
 * worry about ObjectId equality. Missing projects or missing creators map to
 * an empty object so the caller can decide whether to render a contact line.
 */
export async function fetchStudyContactsByProjectIds(
  projectIds: Array<string | mongoose.Types.ObjectId>,
): Promise<Map<string, StudyContact>> {
  const result = new Map<string, StudyContact>();
  if (!projectIds.length) return result;

  await connectDB();

  const projects = await Project
    .find({ _id: { $in: projectIds } }, { _id: 1, creator: 1 })
    .lean() as Array<{ _id: mongoose.Types.ObjectId; creator?: mongoose.Types.ObjectId }>;

  const creatorIds = projects.map((p) => p.creator).filter(Boolean) as mongoose.Types.ObjectId[];
  if (!creatorIds.length) return result;

  const creators = await User
    .find({ _id: { $in: creatorIds } }, { _id: 1, name: 1, email: 1 })
    .lean() as Array<{ _id: mongoose.Types.ObjectId; name?: string; email?: string }>;

  const creatorById = new Map(creators.map((c) => [String(c._id), c]));

  for (const p of projects) {
    const c = p.creator ? creatorById.get(String(p.creator)) : undefined;
    if (c) result.set(String(p._id), { name: c.name, email: c.email });
  }
  return result;
}
