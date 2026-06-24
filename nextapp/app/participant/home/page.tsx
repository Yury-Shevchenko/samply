import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import Result from "@/lib/models/result";
import { fetchStudyContactsByProjectIds } from "@/lib/data/studies";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Home — Samply" };

export default async function ParticipantHomePage() {
  const session = await auth();
  if (!session) redirect("/participant/login");
  if (session.user.level >= 11) redirect("/dashboard");

  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) redirect("/participant/login");

  const samplyId = user.samplyId;
  const studies = user.participant_projects ?? [];
  const contactByProject = await fetchStudyContactsByProjectIds(
    studies.map((p: { _id: unknown }) => String(p._id)),
  );

  // Aggregate stats: count notifications received / tapped / completed.
  const stats = samplyId
    ? await Result.aggregate<{ received: number; tapped: number; completed: number }>([
        { $match: { samplyid: samplyId } },
        {
          $group: {
            _id: null,
            received: { $sum: 1 },
            tapped: {
              $sum: {
                $cond: [
                  { $gt: [{ $size: { $ifNull: [{ $filter: { input: "$events", as: "e", cond: { $eq: ["$$e.status", "tapped"] } } }, []] } }, 0] },
                  1,
                  0,
                ],
              },
            },
            completed: {
              $sum: {
                $cond: [
                  { $gt: [{ $size: { $ifNull: [{ $filter: { input: "$events", as: "e", cond: { $eq: ["$$e.status", "completed"] } } }, []] } }, 0] },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ])
    : [];

  const counts = stats[0] ?? { received: 0, tapped: 0, completed: 0 };
  const { t } = await getT();
  const displayName = user.name || (user.email ? user.email.split("@")[0] : "");

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4.8rem var(--page-px) 8rem" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div
          className="font-[family-name:var(--font-script)]"
          style={{ fontSize: "1.6rem", color: "var(--ink-40)", marginBottom: "0.6rem", fontFamily: "var(--font-caveat)" }}
        >
          {t("participant.home.eyebrow")}
        </div>
        <h1
          className="font-[family-name:var(--font-display)] font-bold m-0"
          style={{ fontSize: "3.4rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "2.4rem" }}
        >
          {displayName
            ? t("participant.home.titleWithName", { name: displayName })
            : t("participant.home.title")}
        </h1>

        {/* ID card */}
        {samplyId && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.8rem 1.4rem",
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "9999px",
              marginBottom: "3.2rem",
            }}
          >
            <span style={{ fontSize: "1.1rem", color: "var(--ink-40)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
              {t("participant.home.idLabel")}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", color: "var(--ink)" }}>
              {samplyId}
            </span>
          </div>
        )}

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
            gap: "1.4rem",
            marginBottom: "3.2rem",
          }}
        >
          <StatCard label={t("participant.home.statsReceived")} value={counts.received} />
          <StatCard label={t("participant.home.statsTapped")} value={counts.tapped} />
          <StatCard label={t("participant.home.statsCompleted")} value={counts.completed} />
        </div>

        {/* Studies */}
        <div style={{ marginBottom: "3.2rem" }}>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--ink-40)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            {t("participant.home.studiesLabel", { n: studies.length })}
          </div>

          {studies.length === 0 ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--ink-10)",
                borderRadius: "1.4rem",
                padding: "2.4rem",
              }}
            >
              <div className="font-[family-name:var(--font-display)] font-bold" style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>
                {t("participant.home.noStudiesTitle")}
              </div>
              <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 1.4rem", lineHeight: 1.55 }}>
                {t("participant.home.noStudiesBody")}
              </p>
              <a
                href="/studies"
                style={{ fontSize: "1.35rem", color: "var(--coral)", textDecoration: "none", fontWeight: 500 }}
                className="hover:opacity-70 transition-opacity"
              >
                {t("participant.home.browseStudies")}
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {studies.map((p: { _id: unknown; name?: string; slug?: string }) => {
                const contact = contactByProject.get(String(p._id));
                return (
                  <div
                    key={String(p._id)}
                    style={{
                      padding: "1.4rem 1.8rem",
                      background: "var(--surface)",
                      border: "1px solid var(--ink-10)",
                      borderRadius: "1.2rem",
                    }}
                  >
                    <a
                      href={p.slug ? `/studies/${p.slug}` : "#"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textDecoration: "none",
                        color: "var(--ink)",
                      }}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <span style={{ fontSize: "1.45rem", fontWeight: 500 }}>{p.name || "Untitled study"}</span>
                      <span style={{ fontSize: "1.2rem", color: "var(--ink-40)" }}>→</span>
                    </a>
                    {contact?.email && (
                      <div style={{ fontSize: "1.2rem", color: "var(--ink-60)", marginTop: "0.6rem" }}>
                        {t("participant.home.contactLabel")}{" "}
                        <a
                          href={`mailto:${contact.email}`}
                          style={{ color: "var(--ink)", textDecoration: "none" }}
                          className="hover:opacity-70 transition-opacity"
                        >
                          {contact.name ? `${contact.name} <${contact.email}>` : contact.email}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
          <a
            href="/participant/history"
            style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none", fontWeight: 500 }}
            className="hover:opacity-70 transition-opacity"
          >
            {t("participant.home.viewHistory")}
          </a>
          <a
            href="/account"
            style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none", fontWeight: 500 }}
            className="hover:opacity-70 transition-opacity"
          >
            {t("participant.home.manageAccount")}
          </a>
          <a
            href="/participant/export"
            style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none", fontWeight: 500 }}
            className="hover:opacity-70 transition-opacity"
          >
            {t("participant.home.downloadData")}
          </a>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderRadius: "1.2rem",
        padding: "1.8rem",
      }}
    >
      <div
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--ink-40)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "0.6rem",
        }}
      >
        {label}
      </div>
      <div
        className="font-[family-name:var(--font-display)] font-bold"
        style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", color: "var(--ink)" }}
      >
        {value}
      </div>
    </div>
  );
}
