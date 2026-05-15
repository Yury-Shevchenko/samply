import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import {
  fetchAnalyticsOverview,
  fetchResponseTimeSeries,
  fetchDeliveryFunnel,
  fetchResponseTimeDistribution,
  fetchHourlyPattern,
  fetchParticipantCompliance,
  fetchSchedulePerformance,
  fetchRetentionCurve,
} from "@/lib/data/analytics";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ studyId: string }> },
) {
  const { studyId } = await params;
  const session = await auth();
  if (!session || session.user.level <= 10) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = await fetchProjectById(studyId, session.user.id);
  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const days = Math.min(90, Math.max(1, Number(req.nextUrl.searchParams.get("days") ?? 7)));

  const [overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention] =
    await Promise.all([
      fetchAnalyticsOverview(studyId, days),
      fetchResponseTimeSeries(studyId, days),
      fetchDeliveryFunnel(studyId, days),
      fetchResponseTimeDistribution(studyId, days),
      fetchHourlyPattern(studyId, days),
      fetchParticipantCompliance(studyId, days),
      fetchSchedulePerformance(studyId, days),
      fetchRetentionCurve(studyId),
    ]);

  return Response.json({ overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention });
}
