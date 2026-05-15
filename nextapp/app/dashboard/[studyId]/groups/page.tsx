import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { createGroupAction, deleteGroupAction } from "./actions";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Groups — Samply" };

interface MobileUser {
  id: string;
  username?: string;
  group?: { id: string; name?: string };
  deactivated?: boolean;
}

interface Group {
  id: string;
  name: string;
}

interface StoredConfig {
  id: string;
  yokedDesign?: boolean;
  scheduleInFuture?: boolean;
  groups?: string[] | null;
  allCurrentGroups?: boolean;
  schedule?: string;
  randomize?: boolean;
  interval?: string;
  windowInterval?: { from: string; to: string; number: number; distance: number };
}

async function fetchGroupsData(projectId: string) {
  await connectDB();
  const project = await Project.findById(projectId, { mobileUsers: 1, projectGroups: 1, notifications: 1 }).lean();
  if (!project) return null;

  const p = project as unknown as { mobileUsers: MobileUser[]; projectGroups?: Group[]; notifications?: StoredConfig[] };
  const users: MobileUser[] = p.mobileUsers ?? [];

  // Collect groups from participants
  const groupMap = new Map<string, string>();
  for (const u of users) {
    if (u.group?.id && !groupMap.has(u.group.id)) {
      groupMap.set(u.group.id, u.group.name ?? u.group.id);
    }
  }

  // Merge in standalone projectGroups (may be empty groups not yet assigned to anyone)
  for (const g of p.projectGroups ?? []) {
    if (!groupMap.has(g.id)) groupMap.set(g.id, g.name);
  }

  const groups: Group[] = Array.from(groupMap.entries()).map(([id, name]) => ({ id, name }));

  // Determine which groups have active non-yoked schedules handled by the new auto-scheduler
  const groupsWithSchedules = new Set<string>();
  for (const cfg of p.notifications ?? []) {
    if (cfg.yokedDesign) continue;
    if (cfg.scheduleInFuture) continue; // already handled by existing joinStudy path
    if (!(cfg.schedule === "repeat" && cfg.interval) && !(cfg.schedule === "repeat" && cfg.randomize && cfg.windowInterval)) continue;
    if (cfg.allCurrentGroups) {
      for (const g of groups) groupsWithSchedules.add(g.id);
    } else if (Array.isArray(cfg.groups)) {
      for (const gId of cfg.groups) groupsWithSchedules.add(gId);
    }
  }

  return { users, groups, groupsWithSchedules };
}

interface Props {
  params: Promise<{ studyId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GroupsPage({ params, searchParams }: Props) {
  const { studyId } = await params;
  const sp = await searchParams;
  const autoScheduled = typeof sp.autoScheduled === "string" ? parseInt(sp.autoScheduled, 10) : 0;

  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const [project, data] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchGroupsData(studyId),
  ]);

  if (!project || !data) notFound();

  const ungrouped = data.users.filter((u) => !u.group);

  const TH: React.CSSProperties = {
    padding: "1rem 1.8rem",
    textAlign: "left",
    fontFamily: "var(--font-mono)",
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: ".14em",
    textTransform: "uppercase",
    color: "var(--ink-40)",
    whiteSpace: "nowrap",
  };

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Breadcrumb */}
      <div>
        <a
          href={`/dashboard/${studyId}/participants`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
          className="hover:text-[var(--ink)] transition-colors"
        >
          {t("groups.backToParticipants")}
        </a>
      </div>

      {/* Auto-scheduled notice */}
      {autoScheduled > 0 && (
        <div style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.3)", borderRadius: "0.7rem", padding: "1rem 1.4rem", fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--ink-60)" }}>
          {t("groups.autoScheduledNotice", { n: autoScheduled })}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            {t("groups.label")}
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {t(data.groups.length === 1 ? "groups.count" : "groups.countPlural", { n: data.groups.length })}
            <span style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--ink-40)", marginLeft: "1rem", letterSpacing: "-0.01em" }}>
              {t("groups.total", { n: data.users.length })}
            </span>
          </div>
        </div>
      </div>

      {/* Groups table */}
      {data.groups.length > 0 ? (
        <section>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.2rem" }}>
            {t("groups.existingLabel")}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                  <th style={TH}>{t("groups.colGroup")}</th>
                  <th style={TH}>{t("groups.colGroupId")}</th>
                  <th style={TH}>{t("groups.colMembers")}</th>
                  <th style={{ ...TH, textAlign: "right" }}></th>
                </tr>
              </thead>
              <tbody>
                {data.groups.map((group, i) => {
                  const members = data.users.filter((u) => u.group?.id === group.id);
                  return (
                    <tr
                      key={group.id}
                      style={{ borderBottom: i < data.groups.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                      className="hover:bg-[var(--paper)] transition-colors"
                    >
                      <td style={{ padding: "1.2rem 1.8rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", fontWeight: 600, padding: "0.3rem 1rem", borderRadius: "9999px", background: "var(--ink-10)", color: "var(--ink)" }}>
                          {group.name}
                        </span>
                      </td>
                      <td style={{ padding: "1.2rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>
                        {group.id}
                      </td>
                      <td style={{ padding: "1.2rem 1.8rem" }}>
                        {members.length === 0 ? (
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>—</span>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            {members.map((u) => (
                              <span key={u.id} style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)" }}>
                                {u.username && (
                                  <strong style={{ color: "var(--ink)", marginRight: "0.4rem" }}>{u.username}</strong>
                                )}
                                {u.id}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "1.2rem 1.8rem", textAlign: "right" }}>
                        <form action={deleteGroupAction}>
                          <input type="hidden" name="projectId" value={studyId} />
                          <input type="hidden" name="groupId" value={group.id} />
                          <SubmitButton
                            pendingLabel={t("groups.deletingLabel")}
                            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".06em", color: "var(--coral)", background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "9999px", padding: "0.5rem 1.2rem" }}
                            className="hover:opacity-70 transition-opacity"
                          >
                            {t("groups.deleteButton")}
                          </SubmitButton>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "4rem 2.4rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-hand)", fontSize: "2rem", color: "var(--coral)", marginBottom: "0.8rem" }}>{t("groups.emptyTitle")}</div>
          <p style={{ fontSize: "1.3rem", color: "var(--ink-60)", margin: 0 }}>{t("groups.emptyBody")}</p>
        </div>
      )}

      {/* Perforated divider */}
      <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.2 }} />

      {/* Add group form — always visible */}
      <section>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.4rem" }}>
          {t("groups.addLabel")}
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
          <form action={createGroupAction}>
            <input type="hidden" name="projectId" value={studyId} />

            <div style={{ padding: "2rem 2.4rem", borderBottom: "1px solid var(--ink-10)" }}>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.7rem" }}>
                {t("groups.nameLabel")}
              </label>
              <input
                type="text"
                name="groupName"
                required
                placeholder={t("groups.namePlaceholder")}
                style={{ width: "100%", maxWidth: "36rem", padding: "0.9rem 1.2rem", fontFamily: "var(--font-mono)", fontSize: "1.25rem", color: "var(--ink)", background: "var(--paper)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {data.groupsWithSchedules.size > 0 && ungrouped.length > 0 && (
              <div style={{ padding: "1.2rem 2.4rem", borderBottom: "1px solid var(--ink-10)", background: "rgba(234,179,8,.06)", borderLeft: "3px solid rgba(234,179,8,.5)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, color: "#92400e", marginBottom: "0.3rem" }}>
                  {t("groups.scheduleWarningTitle")}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "#78350f", lineHeight: 1.6 }}>
                  {t("groups.scheduleWarningBody")}
                </div>
              </div>
            )}

            <div style={{ padding: "1.8rem 2.4rem", borderBottom: "1px solid var(--ink-10)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1rem" }}>
                {ungrouped.length > 0
                  ? t("groups.selectLabel", { n: ungrouped.length })
                  : t("groups.selectOptional")}
              </div>
              {ungrouped.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {ungrouped.map((u) => (
                    <label
                      key={u.id}
                      style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem 1.2rem", borderRadius: "0.6rem", border: "1px solid var(--ink-10)", background: "var(--paper)", cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        name="participants"
                        value={u.id}
                        style={{ width: "1.4rem", height: "1.4rem", accentColor: "var(--coral)", flexShrink: 0 }}
                      />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
                        {u.username && (
                          <strong style={{ color: "var(--ink)", marginRight: "0.5rem" }}>{u.username}</strong>
                        )}
                        {u.id}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", margin: 0 }}>
                  {t("groups.noParticipants")}
                </p>
              )}
            </div>

            <div style={{ padding: "1.6rem 2.4rem" }}>
              <SubmitButton
                pendingLabel={t("groups.creatingLabel")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", border: "none" }}
                className="hover:opacity-90 transition-opacity"
              >
                {t("groups.createButton")}
              </SubmitButton>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}
