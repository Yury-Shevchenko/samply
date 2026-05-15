import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchPlatformAnalytics } from "@/lib/data/admin";
import { AdminPage } from "../shared";
import {
  NotificationsChart,
  RegistrationsChart,
  TopStudiesChart,
  ComplianceDistributionChart,
} from "./PlatformCharts";

export const metadata = { title: "Admin: Analytics — Samply" };

const CARD: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--ink-10)",
  borderRadius: "0.8rem",
  padding: "1.8rem 2.2rem",
  boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)",
};

const MONO_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.9rem",
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  marginBottom: "1rem",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div style={MONO_LABEL}>{children}</div>;
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={CARD}>
      <div style={{ ...MONO_LABEL, marginBottom: "0.6rem" }}>{label}</div>
      <div
        className="font-[family-name:var(--font-display)] font-bold"
        style={{ fontSize: "3rem", letterSpacing: "-0.025em", lineHeight: 1, color: "var(--ink)" }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginTop: "0.5rem" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { days: daysParam } = await searchParams;
  const days = Math.min(90, Math.max(7, Number(daysParam ?? 30)));

  const { overview, timeSeries, topStudies, complianceDistribution } =
    await fetchPlatformAnalytics(days);

  const ov = overview;

  return (
    <AdminPage title="Platform Analytics">

      {/* Days toggle */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "2.8rem" }}>
        {([7, 14, 30] as const).map((d) => (
          <a
            key={d}
            href={`/admin/analytics?days=${d}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              letterSpacing: ".08em",
              padding: "0.45rem 1.1rem",
              borderRadius: "9999px",
              border: days === d ? "1px solid var(--ink-40)" : "1px solid var(--ink-10)",
              background: days === d ? "var(--ink)" : "transparent",
              color: days === d ? "var(--paper)" : "var(--ink-60)",
              textDecoration: "none",
              transition: "all .12s",
            }}
          >
            {d}d
          </a>
        ))}
      </div>

      {/* Overview stat cards */}
      <div className="stats-grid" style={{ marginBottom: "2.8rem" }}>
        <StatCard label="Total studies"       value={ov.totalStudies}                       sub={`${ov.activeStudies} active`} />
        <StatCard label="Researchers"         value={ov.totalResearchers}                   sub={`${ov.newResearchers7d} joined last 7 days`} />
        <StatCard label="Participants"        value={ov.totalParticipants.toLocaleString()} sub="across all studies" />
        <StatCard label="Compliance (7 days)" value={ov.notifications7d > 0 ? `${ov.compliance7dPct}%` : "—"} sub={`${ov.responded7d.toLocaleString()} of ${ov.notifications7d.toLocaleString()} opened`} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        <div style={CARD}>
          <SectionTitle>Notifications sent &amp; opened — last {days} days</SectionTitle>
          <NotificationsChart data={timeSeries} />
        </div>

        <div style={CARD}>
          <SectionTitle>New studies &amp; researchers — last {days} days</SectionTitle>
          <RegistrationsChart data={timeSeries} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(28rem, 1fr))", gap: "2rem" }}>
          <div style={CARD}>
            <SectionTitle>Top 10 studies by participant count</SectionTitle>
            <TopStudiesChart data={topStudies} />
          </div>
          <div style={CARD}>
            <SectionTitle>Compliance distribution (7-day, per study)</SectionTitle>
            <ComplianceDistributionChart data={complianceDistribution} />
          </div>
        </div>

        <div style={{ ...CARD, display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginRight: "0.4rem" }}>Jump to →</span>
          {[
            { label: "Studies", href: "/admin/studies" },
            { label: "Users", href: "/admin/users" },
            { label: "Notifications", href: "/admin/notifications" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", padding: "0.5rem 1.2rem", border: "1px solid var(--ink-10)", borderRadius: "9999px" }}
            >
              {label}
            </a>
          ))}
        </div>

      </div>
    </AdminPage>
  );
}
