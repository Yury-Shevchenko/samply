import connectDB from "@/lib/db";
import Result from "@/lib/models/result";
import mongoose from "mongoose";

export interface StudyCompliance {
  projectId: string;
  sent: number;
  responded: number;
  pct: number;
}

export async function fetchComplianceForProjects(
  projectIds: string[],
  days = 7,
): Promise<Map<string, StudyCompliance>> {
  await connectDB();

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const oids = projectIds.map((id) => new mongoose.Types.ObjectId(id));

  // Both sides come from the Result collection so the denominator and numerator
  // are always comparable. "sent" = every Result record in the window (one per
  // notification delivered). "responded" = those that have a "tapped" event
  // (participant opened the survey link).
  const [sentAgg, respondedAgg] = await Promise.all([
    Result.aggregate([
      { $match: { project: { $in: oids }, created: { $gte: since } } },
      { $group: { _id: "$project", count: { $sum: 1 } } },
    ]),
    Result.aggregate([
      {
        $match: {
          project: { $in: oids },
          created: { $gte: since },
          "events.status": "tapped",
        },
      },
      { $group: { _id: "$project", count: { $sum: 1 } } },
    ]),
  ]);

  const sentMap = new Map<string, number>(
    sentAgg.map((r: { _id: mongoose.Types.ObjectId; count: number }) => [String(r._id), r.count]),
  );
  const resultMap = new Map<string, number>(
    respondedAgg.map((r: { _id: mongoose.Types.ObjectId; count: number }) => [String(r._id), r.count]),
  );

  const out = new Map<string, StudyCompliance>();
  for (const id of projectIds) {
    const sent = sentMap.get(id) ?? 0;
    const responded = resultMap.get(id) ?? 0;
    const pct = sent > 0 ? Math.round((responded / sent) * 100) : responded > 0 ? 100 : 0;
    out.set(id, { projectId: id, sent, responded, pct });
  }
  return out;
}

export async function fetchComplianceForProject(
  projectId: string,
  days = 7,
): Promise<StudyCompliance> {
  const map = await fetchComplianceForProjects([projectId], days);
  return map.get(projectId) ?? { projectId, sent: 0, responded: 0, pct: 0 };
}
