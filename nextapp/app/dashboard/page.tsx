import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects, type ProjectListItem } from "@/lib/data/projects";
import { fetchComplianceForProjects, type StudyCompliance } from "@/lib/data/compliance";
import Badge from "@/app/components/ui/Badge";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { getSiteSettings } from "@/lib/models/siteSettings";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Dashboard — Samply" };

const TILTS = [-0.7, 0.5, -0.5, 0.6, -0.4, 0.7, -0.6, 0.4];

function HandUnderline({ width = 160 }: { width?: number }) {
  const w = width;
  return (
    <svg
      width={w} height={12}
      viewBox={`0 0 ${w} 12`}
      style={{ display: "block", position: "absolute", left: 0, bottom: -4 }}
    >
      <path
        d={`M 3 8 Q ${w * 0.25} 3 ${w * 0.5} 7 T ${w - 3} 6`}
        fill="none"
        stroke="var(--coral)"
        strokeWidth={4}
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function StudyCard({
  project,
  compliance,
  isOwner,
  index,
  t,
}: {
  project: ProjectListItem;
  compliance: StudyCompliance;
  isOwner: boolean;
  index: number;
  t: ReturnType<typeof import("@/lib/i18n").createT>;
}) {
  const id = String(project._id);
  const participantCount = project.participantCount ?? 0;
  const tilt = TILTS[index % TILTS.length];
  const isLow = compliance.sent > 0 && compliance.pct < 60;

  return (
    <div
      style={{
        background: "var(--surface)",
        padding: "2rem 2.2rem",
        borderRadius: "0.6rem",
        border: "1px solid var(--ink-10)",
        boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 1.2rem 2.4rem rgba(60,40,20,.06)",
        transform: `rotate(${tilt}deg)`,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Top row: mono label + status badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "var(--ink-40)",
          }}
        >
          {isOwner ? t("dashboard.studyLabel") : t("dashboard.collabLabel")}
        </span>
        <Badge variant={project.currentlyActive ? "live" : "draft"} />
      </div>

      {/* Study name */}
      <h3 style={{ margin: 0, lineHeight: 1.1 }}>
        <a
          href={`/dashboard/${id}`}
          className="hover:opacity-70 transition-opacity"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.9rem",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            textDecoration: "none",
            display: "block",
          }}
        >
          {project.name}
        </a>
      </h3>

      {/* Description */}
      {project.description && (
        <p
          style={{
            margin: 0,
            fontSize: "1.2rem",
            color: "var(--ink-60)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>
      )}

      {/* Compliance bar */}
      {compliance.sent > 0 ? (
        <div style={{ marginTop: "0.2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--ink-40)",
              }}
            >
              {t("dashboard.complianceLabel")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: isLow ? "var(--coral)" : "var(--sage)",
                letterSpacing: "-0.01em",
              }}
            >
              {compliance.pct}%
            </span>
          </div>
          <div style={{ height: "0.4rem", background: "var(--ink-10)", borderRadius: "9999px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${compliance.pct}%`,
                background: isLow ? "var(--coral)" : "var(--ink)",
                borderRadius: "9999px",
                transition: "width .3s",
              }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            color: "var(--ink-40)",
            letterSpacing: ".06em",
          }}
        >
          {t("dashboard.noData")}
        </div>
      )}

      {/* Stats row */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.1rem",
          color: "var(--ink-60)",
          display: "flex",
          gap: "1.4rem",
        }}
      >
        <span>{t("dashboard.participantsCount", { n: participantCount })}</span>
        {compliance.sent > 0 && (
          <span>
            {t("dashboard.responsesCount", { responded: compliance.responded, sent: compliance.sent })}
          </span>
        )}
      </div>

      {/* Perforated separator */}
      <div
        style={{
          height: "0.1rem",
          backgroundImage: `radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)`,
          backgroundSize: "0.8rem 0.1rem",
          backgroundRepeat: "repeat-x",
          opacity: 0.5,
          margin: "0.2rem 0",
        }}
      />

      {/* Footer quick links */}
      <div
        style={{
          display: "flex",
          gap: "1.4rem",
          fontFamily: "var(--font-mono)",
          fontSize: "1.1rem",
        }}
      >
        {[
          { key: "dashboard.quickSchedule",     href: `/dashboard/${id}/schedule` },
          { key: "dashboard.quickParticipants",  href: `/dashboard/${id}/participants` },
          { key: "dashboard.quickHistory",       href: `/dashboard/${id}/data` },
        ].map(({ key, href }) => (
          <a
            key={key}
            href={href}
            className="hover:opacity-70 transition-opacity"
            style={{ color: "var(--ink-60)", textDecoration: "none" }}
          >
            {t(key)} →
          </a>
        ))}
      </div>
    </div>
  );
}

function SmaatBanner({ t }: { t: ReturnType<typeof import("@/lib/i18n").createT> }) {
  return (
    <div
      style={{
        marginTop: "4rem",
        padding: "1.8rem 2.2rem",
        borderRadius: "1rem",
        border: "1px solid rgba(124,106,181,.18)",
        background: "rgba(124,106,181,.04)",
        display: "flex",
        alignItems: "center",
        gap: "1.8rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 260, textAlign: "left" }}>
        <span style={{ fontSize: "1.25rem", color: "var(--ink)", fontWeight: 500 }}>
          {t("dashboard.smaatText")}
        </span>
        <span style={{ fontSize: "1.2rem", color: "var(--ink-60)" }}>
          {t("dashboard.smaatDetail")}
        </span>
      </div>
      <a
        href="/smaat"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.6rem",
          borderRadius: "9999px",
          border: "1px solid rgba(124,106,181,.35)",
          color: "#7c6ab5",
          fontSize: "1.2rem",
          fontWeight: 500,
          textDecoration: "none",
          fontFamily: "var(--font-mono)",
          letterSpacing: ".04em",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
        className="hover:opacity-70 transition-opacity"
      >
        {t("dashboard.smaatLink")}
      </a>
    </div>
  );
}

function LowComplianceBanner({ studies, t }: { studies: string[]; t: ReturnType<typeof import("@/lib/i18n").createT> }) {
  if (studies.length === 0) return null;
  return (
    <div
      style={{
        background: "rgba(214,90,48,.06)",
        border: "1px solid rgba(214,90,48,.22)",
        borderRadius: "0.8rem",
        padding: "1.3rem 1.8rem",
        marginBottom: "3.2rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "1.4rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "var(--coral)",
          flexShrink: 0,
          letterSpacing: ".02em",
        }}
      >
        ▲
      </span>
      <div>
        <span style={{ fontSize: "1.3rem", color: "var(--ink)", fontWeight: 500 }}>
          {t("dashboard.lowComplianceTitle")}
        </span>
        <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", marginLeft: "0.6rem" }}>
          {t("dashboard.lowComplianceBody", { studies: studies.join(", ") })}
        </span>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();
  const [userDoc, { showSmaat, showTestimonials }] = await Promise.all([
    User.findById(session.user.id, { emailIsConfirmed: 1 }).lean() as Promise<{ emailIsConfirmed?: boolean } | null>,
    getSiteSettings(),
  ]);
  const emailIsConfirmed = userDoc?.emailIsConfirmed ?? false;
  const { projects, invitedProjects } = await fetchUserProjects(session.user.id);
  const allProjects = [...projects, ...invitedProjects];

  const complianceMap = await fetchComplianceForProjects(allProjects.map((p) => String(p._id)));

  const lowComplianceStudies = allProjects
    .filter((p) => {
      const c = complianceMap.get(String(p._id));
      return p.currentlyActive && c && c.sent > 0 && c.pct < 60;
    })
    .map((p) => p.name);

  const ownerIds = new Set(projects.map((p) => String(p._id)));
  let cardIndex = 0;

  const { t } = await getT();

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "5.2rem var(--page-px) 9.6rem" }}>

        {/* Page header */}
        <div className="mob-col mob-col-start" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: emailIsConfirmed ? "4rem" : "2rem" }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "1.8rem",
                color: "var(--coral)",
                display: "block",
                marginBottom: "0.6rem",
                lineHeight: 1,
              }}
            >
              {t("dashboard.eyebrow")}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4.8rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                margin: 0,
                lineHeight: 1,
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("dashboard.title")}
              <HandUnderline width={178} />
            </h1>
          </div>
          <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
            {emailIsConfirmed ? (
              <a
                href="/projects/new"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1rem 2.2rem",
                  background: "var(--ink)",
                  color: "var(--paper)",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
                className="btn-pill hover:opacity-80 transition-opacity"
              >
                {t("dashboard.newStudy")}
              </a>
            ) : (
              <span
                title={t("dashboard.newStudyDisabledTitle")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1rem 2.2rem",
                  background: "var(--ink-20)",
                  color: "var(--ink-40)",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                  cursor: "not-allowed",
                  letterSpacing: "-0.01em",
                }}
                className="btn-pill"
              >
                {t("dashboard.newStudy")}
              </span>
            )}
          </div>
        </div>

        {/* Unconfirmed email notice */}
        {!emailIsConfirmed && (
          <div
            style={{
              background: "rgba(180,130,0,.07)",
              border: "1px solid rgba(180,130,0,.28)",
              borderRadius: "1rem",
              padding: "1.3rem 1.8rem",
              marginBottom: "3.2rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1.4rem",
            }}
          >
            <span style={{ fontSize: "1.5rem", flexShrink: 0, lineHeight: 1.4 }}>✉</span>
            <div>
              <span style={{ fontSize: "1.3rem", color: "var(--ink)", fontWeight: 600 }}>
                {t("dashboard.emailUnconfirmedTitle")}
              </span>
              <span style={{ fontSize: "1.3rem", color: "var(--ink-60)", marginLeft: "0.5rem" }}>
                {t("dashboard.emailUnconfirmedBody")}
              </span>
            </div>
          </div>
        )}

        {/* Low-compliance nudge */}
        <LowComplianceBanner studies={lowComplianceStudies} t={t} />

        {/* My studies */}
        {projects.length > 0 && (
          <section style={{ marginBottom: "5.2rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--ink-40)",
                marginBottom: "1.8rem",
              }}
            >
              {t("dashboard.myStudiesLabel", { n: projects.length })}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(296px, 1fr))",
                gap: "2.4rem",
              }}
            >
              {projects.map((p) => (
                <StudyCard
                  key={String(p._id)}
                  project={p}
                  compliance={
                    complianceMap.get(String(p._id)) ?? {
                      projectId: String(p._id),
                      sent: 0,
                      responded: 0,
                      pct: 0,
                    }
                  }
                  isOwner
                  index={cardIndex++}
                  t={t}
                />
              ))}
            </div>
          </section>
        )}

        {/* Collaborating studies */}
        {invitedProjects.length > 0 && (
          <section style={{ marginBottom: "5.2rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--ink-40)",
                marginBottom: "1.8rem",
              }}
            >
              {t("dashboard.collaboratingLabel", { n: invitedProjects.length })}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(296px, 1fr))",
                gap: "2.4rem",
              }}
            >
              {invitedProjects.map((p) => (
                <StudyCard
                  key={String(p._id)}
                  project={p}
                  compliance={
                    complianceMap.get(String(p._id)) ?? {
                      projectId: String(p._id),
                      sent: 0,
                      responded: 0,
                      pct: 0,
                    }
                  }
                  isOwner={ownerIds.has(String(p._id))}
                  index={cardIndex++}
                  t={t}
                />
              ))}
            </div>
          </section>
        )}

        {/* SMAAT cross-promotion */}
        {allProjects.length > 0 && showSmaat && <SmaatBanner t={t} />}

        {/* Testimonial nudge */}
        {showTestimonials && allProjects.length > 0 && (
          <div style={{ marginTop: "2.8rem", textAlign: "center" }}>
            <a
              href="/testimonial"
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: "0.08em" }}
              className="hover:opacity-70 transition-opacity"
            >
              {t("dashboard.testimonialNudge")}
            </a>
          </div>
        )}

        {/* Empty state */}
        {allProjects.length === 0 && (
          <div style={{ paddingTop: "8rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
            {/* Stamp motif */}
            <div
              style={{
                width: "8rem",
                height: "8rem",
                borderRadius: "50%",
                border: `2px solid var(--coral)`,
                color: "var(--coral)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                transform: "rotate(-8deg)",
                position: "relative",
                marginBottom: "2.8rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: "50%",
                  border: "1px dashed var(--coral)",
                  opacity: 0.5,
                }}
              />
              <div style={{ fontSize: "2.2rem", lineHeight: 1 }}>S</div>
              <div style={{ fontSize: "0.9rem", letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.8, marginTop: "0.2rem" }}>
                samply
              </div>
            </div>

            <span
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "2.4rem",
                color: "var(--coral)",
                display: "block",
                marginBottom: "1rem",
                lineHeight: 1,
              }}
            >
              {t("dashboard.emptyLabel")}
            </span>
            <p
              style={{
                fontSize: "1.4rem",
                color: "var(--ink-60)",
                marginBottom: "2.8rem",
                textAlign: "center",
                maxWidth: 360,
                lineHeight: 1.6,
              }}
            >
              {t("dashboard.emptyBody")}
            </p>
            {emailIsConfirmed ? (
              <a
                href="/projects/new"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1.1rem 2.8rem",
                  background: "var(--coral)",
                  color: "#fff",
                  borderRadius: "9999px",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                {t("dashboard.emptyCta")}
              </a>
            ) : (
              <span
                title={t("dashboard.newStudyDisabledTitle")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1.1rem 2.8rem",
                  background: "var(--ink-20)",
                  color: "var(--ink-40)",
                  borderRadius: "9999px",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                  cursor: "not-allowed",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("dashboard.emptyCta")}
              </span>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
