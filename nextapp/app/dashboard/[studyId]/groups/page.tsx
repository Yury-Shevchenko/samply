import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import { createGroupAction, deleteGroupAction } from "./actions";

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

async function fetchGroupsData(projectId: string) {
  await connectDB();
  const project = await Project.findById(projectId, { mobileUsers: 1 }).lean();
  if (!project) return null;

  const p = project as unknown as { mobileUsers: MobileUser[] };
  const users: MobileUser[] = p.mobileUsers ?? [];

  const groupMap = new Map<string, string>();
  for (const u of users) {
    if (u.group?.id && !groupMap.has(u.group.id)) {
      groupMap.set(u.group.id, u.group.name ?? u.group.id);
    }
  }
  const groups: Group[] = Array.from(groupMap.entries()).map(([id, name]) => ({ id, name }));

  return { users, groups };
}

interface Props {
  params: Promise<{ studyId: string }>;
}

export default async function GroupsPage({ params }: Props) {
  const { studyId } = await params;

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
          ← Participants
        </a>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
            participant segments
          </div>
          <div className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.8rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            {data.groups.length} group{data.groups.length !== 1 ? "s" : ""}
            <span style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--ink-40)", marginLeft: "1rem", letterSpacing: "-0.01em" }}>
              / {data.users.length} participants
            </span>
          </div>
        </div>
      </div>

      {/* Groups table */}
      {data.groups.length > 0 ? (
        <section>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.2rem" }}>
            existing groups
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                  <th style={TH}>Group</th>
                  <th style={TH}>Group ID</th>
                  <th style={TH}>Members</th>
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
                          <button
                            type="submit"
                            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".06em", color: "var(--coral)", background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "9999px", padding: "0.5rem 1.2rem", cursor: "pointer" }}
                            className="hover:opacity-70 transition-opacity"
                          >
                            Delete
                          </button>
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
          <div style={{ fontFamily: "var(--font-hand)", fontSize: "2rem", color: "var(--coral)", marginBottom: "0.8rem" }}>no groups yet</div>
          <p style={{ fontSize: "1.3rem", color: "var(--ink-60)", margin: 0 }}>Create your first group below to segment participants.</p>
        </div>
      )}

      {/* Perforated divider */}
      <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.2 }} />

      {/* Add group form */}
      <section>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.4rem" }}>
          add a new group
        </div>

        {ungrouped.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "2.4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: 0 }}>
              All participants are already assigned to a group.
            </p>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)" }}>
            <form action={createGroupAction}>
              <input type="hidden" name="projectId" value={studyId} />

              <div style={{ padding: "2rem 2.4rem", borderBottom: "1px solid var(--ink-10)" }}>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.7rem" }}>
                  Group Name
                </label>
                <input
                  type="text"
                  name="groupName"
                  required
                  placeholder="e.g. Control, Treatment A…"
                  style={{ width: "100%", maxWidth: "36rem", padding: "0.9rem 1.2rem", fontFamily: "var(--font-mono)", fontSize: "1.25rem", color: "var(--ink)", background: "var(--paper)", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ padding: "1.8rem 2.4rem", borderBottom: "1px solid var(--ink-10)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1rem" }}>
                  Select participants · {ungrouped.length} without a group
                </div>
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
              </div>

              <div style={{ padding: "1.6rem 2.4rem" }}>
                <button
                  type="submit"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 2rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", border: "none", cursor: "pointer" }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Create group →
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

    </div>
  );
}
