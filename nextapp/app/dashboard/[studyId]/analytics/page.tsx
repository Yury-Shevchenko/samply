import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchScheduledNotifications } from "@/lib/data/scheduled";
import {
  fetchAnalyticsOverview,
  fetchResponseTimeSeries,
  fetchDeliveryFunnel,
  fetchResponseTimeDistribution,
  fetchHourlyPattern,
  fetchParticipantCompliance,
  fetchSchedulePerformance,
  fetchRetentionCurve,
  fetchStudyHealth,
  parseWindowDays,
} from "@/lib/data/analytics";
import AnalyticsDashboard from "./AnalyticsDashboard";

interface Props {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<{ days?: string }>;
}

export default async function AnalyticsPage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const { days: daysParam } = await searchParams;
  // Defaults to 0 = entire study. A rolling window made per-participant counts
  // appear to shrink as older sends aged out of it; see parseWindowDays.
  const days = parseWindowDays(daysParam);

  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const project = await fetchProjectById(studyId, session.user.id, session.user.level > 100);
  if (!project) notFound();

  const [overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention, health, notifications] =
    await Promise.all([
      fetchAnalyticsOverview(studyId, days),
      fetchResponseTimeSeries(studyId, days),
      fetchDeliveryFunnel(studyId, days),
      fetchResponseTimeDistribution(studyId, days),
      fetchHourlyPattern(studyId, days),
      fetchParticipantCompliance(studyId, days),
      fetchSchedulePerformance(studyId, days),
      fetchRetentionCurve(studyId),
      fetchStudyHealth(studyId),
      fetchScheduledNotifications(studyId),
    ]);

  return (
    <AnalyticsDashboard
      studyId={studyId}
      days={days}
      initialData={{ overview, timeSeries, funnel, responseTimes, hourly, participants, schedules, retention, health }}
      notifications={notifications}
    />
  );
}
