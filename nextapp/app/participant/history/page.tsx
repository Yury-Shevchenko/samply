import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import Result from "@/lib/models/result";
import Project from "@/lib/models/project";
import mongoose from "mongoose";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "History — Samply" };

const PAGE_SIZE = 50;

type ResultRow = {
  _id: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  data?: { title?: string; message?: string };
  events?: Array<{ status: string; created?: Date }>;
  created?: Date;
};

function statusLabel(events: Array<{ status: string }> | undefined, t: (k: string) => string): string {
  const statuses = new Set((events ?? []).map((e) => e.status));
  if (statuses.has("archived")) return t("participant.history.statusArchived");
  if (statuses.has("completed")) return t("participant.history.statusCompleted");
  if (statuses.has("tapped")) return t("participant.history.statusTapped");
  return t("participant.history.statusSent");
}

function fmtDate(d?: Date): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "—";
  }
}

export default async function ParticipantHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/participant/login");
  if (session.user.level >= 11) redirect("/dashboard");

  await connectDB();
  const user = await User.findById(session.user.id, { samplyId: 1 }).lean() as { samplyId?: string } | null;
  const samplyId = user?.samplyId;

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  let rows: ResultRow[] = [];
  let total = 0;
  const projectNames = new Map<string, string>();

  if (samplyId) {
    const ResultModel = Result as unknown as mongoose.Model<ResultRow>;
    [rows, total] = await Promise.all([
      ResultModel
        .find({ samplyid: samplyId })
        .sort({ created: -1 })
        .skip(skip)
        .limit(PAGE_SIZE)
        .lean(),
      ResultModel.countDocuments({ samplyid: samplyId }),
    ]);

    const projectIds = Array.from(new Set(rows.map((r) => String(r.project)).filter(Boolean)));
    if (projectIds.length > 0) {
      const projects = await (Project as unknown as mongoose.Model<{ _id: mongoose.Types.ObjectId; name?: string }>)
        .find({ _id: { $in: projectIds } }, { name: 1 })
        .lean();
      for (const p of projects) {
        projectNames.set(String(p._id), p.name ?? "");
      }
    }
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const { t } = await getT();

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4.8rem var(--page-px) 8rem" }}
    >
      <div style={{ maxWidth: "92rem", margin: "0 auto" }}>
        <div style={{ marginBottom: "2.4rem" }}>
          <a
            href="/participant/home"
            style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
            className="hover:opacity-70 transition-opacity"
          >
            {t("participant.history.breadcrumb")}
          </a>
        </div>

        <div
          className="font-[family-name:var(--font-script)]"
          style={{ fontSize: "1.6rem", color: "var(--ink-40)", marginBottom: "0.4rem", fontFamily: "var(--font-caveat)" }}
        >
          {t("participant.history.eyebrow")}
        </div>
        <h1
          className="font-[family-name:var(--font-display)] font-bold m-0"
          style={{ fontSize: "3rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "2.4rem" }}
        >
          {t("participant.history.title")}
        </h1>

        {rows.length === 0 ? (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--ink-10)",
              borderRadius: "1.4rem",
              padding: "2.4rem",
              fontSize: "1.35rem",
              color: "var(--ink-60)",
            }}
          >
            {t("participant.history.empty")}
          </div>
        ) : (
          <>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--ink-10)",
                borderRadius: "1.4rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(13rem, 1.2fr) minmax(14rem, 1.6fr) 2fr minmax(10rem, 0.8fr)",
                  gap: "1.2rem",
                  padding: "1.2rem 1.8rem",
                  borderBottom: "1px solid var(--ink-10)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--ink-40)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <div>{t("participant.history.colWhen")}</div>
                <div>{t("participant.history.colStudy")}</div>
                <div>{t("participant.history.colTitle")}</div>
                <div>{t("participant.history.colStatus")}</div>
              </div>
              {rows.map((r) => {
                const status = statusLabel(r.events, t);
                const projectName = r.project ? projectNames.get(String(r.project)) ?? "—" : "—";
                const title = r.data?.title || r.data?.message || "—";
                return (
                  <div
                    key={String(r._id)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(13rem, 1.2fr) minmax(14rem, 1.6fr) 2fr minmax(10rem, 0.8fr)",
                      gap: "1.2rem",
                      padding: "1.2rem 1.8rem",
                      borderBottom: "1px solid var(--ink-10)",
                      fontSize: "1.3rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ color: "var(--ink-60)" }}>{fmtDate(r.created)}</div>
                    <div style={{ color: "var(--ink)" }}>{projectName}</div>
                    <div style={{ color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
                    <div>
                      <span
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 600,
                          padding: "0.2rem 0.7rem",
                          borderRadius: "9999px",
                          background: status === t("participant.history.statusCompleted")
                            ? "rgba(61,115,107,.12)"
                            : status === t("participant.history.statusArchived")
                            ? "rgba(214,90,48,.1)"
                            : "var(--ink-10)",
                          color: status === t("participant.history.statusCompleted")
                            ? "var(--sage)"
                            : status === t("participant.history.statusArchived")
                            ? "var(--coral)"
                            : "var(--ink-60)",
                          textTransform: "lowercase",
                        }}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {pages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1.8rem",
                }}
              >
                {page > 1 ? (
                  <a
                    href={`/participant/history?page=${page - 1}`}
                    style={{ fontSize: "1.3rem", color: "var(--ink)", textDecoration: "none" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {t("participant.history.pagePrev")}
                  </a>
                ) : <span />}
                <span style={{ fontSize: "1.2rem", color: "var(--ink-40)" }}>
                  {t("participant.history.pageOf", { page, pages })}
                </span>
                {page < pages ? (
                  <a
                    href={`/participant/history?page=${page + 1}`}
                    style={{ fontSize: "1.3rem", color: "var(--ink)", textDecoration: "none" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    {t("participant.history.pageNext")}
                  </a>
                ) : <span />}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
