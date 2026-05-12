import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchUserProjects } from "@/lib/data/projects";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import ProjectSelector from "@/app/components/ProjectSelector";
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

async function fetchGroupsData(projectId: string, userId: string) {
  await connectDB();
  const project = await Project.findById(projectId, { creator: 1, members: 1, mobileUsers: 1 }).lean();
  if (!project) return null;

  const p = project as unknown as {
    creator: { toString(): string };
    members?: Array<{ toString(): string }>;
    mobileUsers: MobileUser[];
  };

  const isOwner = p.creator.toString() === userId;
  const isMember = p.members?.some((m) => m.toString() === userId) ?? false;
  if (!isOwner && !isMember) return null;

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

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { project: projectId } = await searchParams;
  const { projects } = await fetchUserProjects(session.user.id);

  const selectorProjects = projects.map((p) => ({ _id: String(p._id), name: p.name }));
  const selectedId = projectId ?? (projects[0] ? String(projects[0]._id) : undefined);
  const data = selectedId ? await fetchGroupsData(selectedId, session.user.id) : null;

  const createWithProject = createGroupAction.bind(null);
  const deleteWithProject = deleteGroupAction.bind(null);

  const ungrouped = data?.users.filter((u) => !u.group) ?? [];

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
    <div style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3.6rem var(--page-px) 8rem" }}>

        {/* Breadcrumb */}
        {selectedId && (
          <div style={{ marginBottom: "2.4rem" }}>
            <a
              href={`/dashboard/${selectedId}/participants`}
              style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", color: "var(--ink-40)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity"
            >
              ← Participants
            </a>
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3.2rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
              participant segments
            </div>
            <h1
              className="font-[family-name:var(--font-display)] font-bold m-0"
              style={{ fontSize: "3.2rem", letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              Groups
              {data && data.groups.length > 0 && (
                <span style={{ fontSize: "1.6rem", fontWeight: 400, color: "var(--ink-40)", marginLeft: "1.2rem", letterSpacing: "-0.01em" }}>
                  {data.groups.length}
                </span>
              )}
            </h1>
          </div>

          <div style={{ flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.5rem" }}>
              Study
            </div>
            <ProjectSelector projects={selectorProjects} selectedId={selectedId} label="" />
          </div>
        </div>

        {!selectedId ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "5.6rem 2.4rem", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-hand)", fontSize: "2.2rem", color: "var(--coral)", marginBottom: "1rem" }}>no study selected</div>
            <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0 }}>Create a study first, then manage groups here.</p>
          </div>
        ) : !data ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "3.2rem 2.4rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: 0 }}>Study not found.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "3.2rem" }}>

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
                              <form action={deleteWithProject}>
                                <input type="hidden" name="projectId" value={selectedId} />
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
                  <form action={createWithProject}>
                    <input type="hidden" name="projectId" value={selectedId} />

                    {/* Group name input */}
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

                    {/* Participant checkboxes */}
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

                    {/* Submit */}
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
        )}

      </div>
    </div>
  );
}
