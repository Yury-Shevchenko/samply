import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchAdminStudyDetail, fetchAdminNotifications } from "@/lib/data/admin";
import { deleteStudyAction, toggleStudyPublicAction } from "../actions";
import { fmt, truncate, AdminTable, AdminPagination, TD_STYLE, TD_MONO } from "../../shared";
import { ConfirmDeleteButton } from "../../ConfirmDeleteButton";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:    { bg: "rgba(214,90,48,.10)", color: "var(--coral)" },
  processing: { bg: "rgba(35,32,26,.08)", color: "var(--ink-60)" },
  sent:       { bg: "rgba(61,115,107,.10)", color: "var(--sage)" },
  failed:     { bg: "rgba(214,90,48,.18)", color: "var(--coral)" },
  cancelled:  { bg: "var(--ink-10)", color: "var(--ink-40)" },
};

function StatusBadge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? { bg: "var(--ink-10)", color: "var(--ink-60)" };
  return (
    <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, ...c }}>
      {status}
    </span>
  );
}

/* ── Layout helpers ─────────────────────────────────────────────────────── */
const CARD: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--ink-10)",
  borderRadius: "1.2rem",
  padding: "2.4rem",
  marginBottom: "2rem",
};

const SECTION_LABEL: React.CSSProperties = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "var(--ink-40)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 1.6rem",
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={CARD}>
      <h2 style={SECTION_LABEL}>{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "baseline" }}>
      <dt style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", minWidth: "18rem", flexShrink: 0 }}>
        {label}
      </dt>
      <dd style={{ margin: 0, fontSize: "1.3rem", color: "var(--ink)", lineHeight: 1.5, minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>
        {children ?? <span style={{ color: "var(--ink-20)" }}>—</span>}
      </dd>
    </div>
  );
}

function Val({ v }: { v?: string | boolean | number | null }) {
  if (v === undefined || v === null || v === "") return <span style={{ color: "var(--ink-20)" }}>—</span>;
  if (typeof v === "boolean") return <span style={{ color: v ? "var(--sage)" : "var(--ink-40)" }}>{v ? "Yes" : "No"}</span>;
  return <>{String(v)}</>;
}

function Badge({ on, label }: { on: boolean; label: string }) {
  return (
    <span style={{
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 8px",
      borderRadius: 999,
      background: on ? "rgba(61,115,107,.12)" : "var(--ink-10)",
      color: on ? "var(--sage)" : "var(--ink-40)",
    }}>
      {label}
    </span>
  );
}

function Text({ v }: { v?: string }) {
  if (!v) return <span style={{ color: "var(--ink-20)" }}>—</span>;
  return (
    <span
      style={{
        display: "block",
        whiteSpace: "pre-wrap",
        fontSize: "1.25rem",
        color: "var(--ink-60)",
        background: "var(--paper)",
        border: "1px solid var(--ink-10)",
        borderRadius: "0.6rem",
        padding: "0.8rem 1.2rem",
        lineHeight: 1.55,
      }}
    >
      {v}
    </span>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await fetchAdminStudyDetail(id);
  return { title: `${s?.name ?? "Study"} — Admin — Samply` };
}

export default async function AdminStudyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ nsort?: string; ndir?: string; npage?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { id } = await params;
  const { nsort = "scheduledFor", ndir = "desc", npage: npageStr = "1" } = await searchParams;
  const npage = Math.max(1, parseInt(npageStr) || 1);

  const [s, notifData] = await Promise.all([
    fetchAdminStudyDetail(id),
    fetchAdminNotifications(npage, undefined, id, nsort, ndir),
  ]);
  if (!s) notFound();

  const deleteAction = deleteStudyAction.bind(null, id);
  const togglePublicAction = toggleStudyPublicAction.bind(null, id);
  const settings = s.settings ?? {};
  const enableEvents = Boolean(settings.enableEvents);
  const enableActions = Boolean(settings.enableActions);
  const enableWebhooks = Boolean(settings.enableWebhooks);
  const enableGeofencing = Boolean(settings.enableGeofencing);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "3.6rem 4rem 8rem" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2.4rem", display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <a href="/admin/studies" style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}>
            ← Admin Studies
          </a>
          <span style={{ color: "var(--ink-20)" }}>·</span>
          <a href={`/dashboard/${id}`} style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}>
            Open in Dashboard ↗
          </a>
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3.2rem", gap: "2rem" }}>
          <div>
            <h1
              className="font-[family-name:var(--font-display)] font-bold m-0"
              style={{ fontSize: "2.8rem", letterSpacing: "-0.025em", marginBottom: "0.8rem" }}
            >
              {s.name}
            </h1>
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <Badge on={!!s.currentlyActive} label={s.currentlyActive ? "● live" : "draft"} />
              <Badge on={!!s.public} label={s.public ? "public" : "private"} />
              {s.requestedForApproval && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(214,90,48,.1)", color: "var(--coral)" }}>
                  approval requested
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "1rem", flexShrink: 0, alignItems: "center", flexWrap: "wrap" }}>
            <form action={togglePublicAction} style={{ margin: 0 }}>
              <button
                type="submit"
                style={{ padding: "0.6rem 1.4rem", fontSize: "1.2rem", background: "none", border: "1px solid var(--ink-20)", borderRadius: "9999px", cursor: "pointer", fontFamily: "var(--font-body)", color: "var(--ink-60)" }}
              >
                {s.public ? "Make private" : "Make public"}
              </button>
            </form>
            <ConfirmDeleteButton
              action={deleteAction}
              message={`Delete study "${s.name}" and all its data? This cannot be undone.`}
              label="Delete study"
            />
          </div>
        </div>

        {/* Identity */}
        <Card title="Identity">
          <dl>
            <Row label="ID"><code style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}>{id}</code></Row>
            <Row label="Slug"><Val v={s.slug} /></Row>
            <Row label="Created">{fmt(s.created)}</Row>
          </dl>
        </Card>

        {/* Last activity */}
        <Card title="Last activity">
          <dl>
            <Row label="Last notification sent">
              {s.lastActivityDate ? (
                <>
                  {new Date(s.lastActivityDate).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                </>
              ) : <span style={{ color: "var(--ink-20)" }}>No sent notifications found</span>}
            </Row>
            {s.lastActivityDate && (
              <>
                <Row label="Title"><Val v={s.lastActivityTitle} /></Row>
                <Row label="Message"><Val v={s.lastActivityMessage} /></Row>
              </>
            )}
          </dl>
        </Card>

        {/* Creator & collaborators */}
        <Card title="People">
          <dl>
            <Row label="Creator">
              {s.creator ? (
                <a href={`/admin/users/${s.creator._id}`} style={{ color: "var(--sage)", textDecoration: "none" }}>
                  {s.creator.name ?? s.creator.email ?? s.creator._id}
                  {s.creator.email && s.creator.name && (
                    <span style={{ color: "var(--ink-40)", marginLeft: "0.6rem", fontSize: "1.2rem" }}>
                      ({s.creator.email})
                    </span>
                  )}
                </a>
              ) : <span style={{ color: "var(--ink-20)" }}>—</span>}
            </Row>
            <Row label={`Collaborators (${s.memberCount})`}>
              {s.members.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {s.members.map((m) => (
                    <a key={m._id} href={`/admin/users/${m._id}`} style={{ color: "var(--sage)", textDecoration: "none", fontSize: "1.25rem" }}>
                      {m.name ?? m.email ?? m._id}
                      {m.email && m.name && <span style={{ color: "var(--ink-40)", marginLeft: "0.6rem", fontSize: "1.1rem" }}>({m.email})</span>}
                    </a>
                  ))}
                </div>
              ) : <span style={{ color: "var(--ink-20)" }}>None</span>}
            </Row>
            <Row label="Participants">{s.participantCount}</Row>
          </dl>
        </Card>

        {/* Participant-facing content */}
        <Card title="Participant content">
          <dl>
            <Row label="Description"><Text v={s.description} /></Row>
            <Row label="Consent form"><Text v={s.welcomeMessage} /></Row>
            <Row label="Code message"><Text v={s.codeMessage} /></Row>
            <Row label="Group message"><Text v={s.groupMessage} /></Row>
            <Row label="Message after join"><Text v={s.messageAfterJoin} /></Row>
            <Row label="Completion message"><Text v={s.completionMessage} /></Row>
          </dl>
        </Card>

        {/* Settings */}
        <Card title="Settings">
          <dl>
            <Row label="Ask participant code"><Val v={!!settings.askParticipantCode} /></Row>
            <Row label="Ask participant group"><Val v={!!settings.askParticipantGroup} /></Row>
            <Row label="Event-contingent"><Val v={enableEvents} /></Row>
            {enableEvents && (
              <>
                <Row label="Event description"><Text v={settings.eventDescription as string | undefined} /></Row>
                {Array.isArray(settings.events) && settings.events.length > 0 && (
                  <Row label="Event types">
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                      {(settings.events as Array<{ num: number; caption: string; url: string }>).map((e) => (
                        <span key={e.num} style={{ fontSize: "1.2rem", color: "var(--ink-60)" }}>
                          {e.num}. {e.caption}{e.url ? ` — ${e.url}` : ""}
                        </span>
                      ))}
                    </div>
                  </Row>
                )}
              </>
            )}
            <Row label="Action buttons"><Val v={enableActions} /></Row>
            {enableActions && Array.isArray(settings.actions) && settings.actions.length > 0 && (
              <Row label="Actions">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {(settings.actions as Array<{ num: number; identifier: string; buttonTitle: string }>).map((a) => (
                    <span key={a.num} style={{ fontSize: "1.2rem", color: "var(--ink-60)" }}>
                      {a.num}. {a.identifier} — "{a.buttonTitle}"
                    </span>
                  ))}
                </div>
              </Row>
            )}
            <Row label="Webhooks"><Val v={enableWebhooks} /></Row>
            {enableWebhooks && (
              <>
                <Row label="Webhook endpoint"><Val v={settings.webhookEndpoint as string | undefined} /></Row>
                <Row label="Webhook events"><Val v={Array.isArray(settings.webhookEvents) ? (settings.webhookEvents as string[]).join(", ") : undefined} /></Row>
              </>
            )}
            <Row label="Geofencing"><Val v={enableGeofencing} /></Row>
            {enableGeofencing && s.geofencingInstruction && (
              <Row label="Geo instruction"><Text v={s.geofencingInstruction} /></Row>
            )}
            {enableGeofencing && Boolean(settings.geofencing) && (() => {
              const geo = settings.geofencing as Record<string, unknown>;
              const locs = Array.isArray(geo.locations) ? geo.locations as Array<{ title?: string; latitude?: number; longitude?: number; radius?: number }> : [];
              return (
                <>
                  {locs.length > 0 && (
                    <Row label={`Researcher locations (${locs.length})`}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        {locs.map((l, i) => (
                          <span key={i} style={{ fontSize: "1.2rem", color: "var(--ink-60)" }}>
                            {l.title ?? "Unnamed"} — {l.latitude}, {l.longitude} (r={l.radius}m)
                          </span>
                        ))}
                      </div>
                    </Row>
                  )}
                </>
              );
            })()}
          </dl>
        </Card>

        {/* Notifications */}
        <div style={CARD}>
          <h2 style={SECTION_LABEL}>
            Notifications
            <span style={{ fontWeight: 400, marginLeft: "0.8rem", color: "var(--ink-40)", fontSize: "1rem" }}>
              {notifData.count.toLocaleString()} total
            </span>
          </h2>

          <AdminTable
            headers={[
              "#",
              { label: "Status", sort: "status" },
              { label: "Scheduled", sort: "scheduledFor" },
              "Title", "Message", "Recipients", "Reminder",
            ]}
            sort={nsort}
            dir={ndir}
            buildSortHref={(field, nextDir) =>
              `/admin/studies/${id}?nsort=${field}&ndir=${nextDir}&npage=1`
            }
          >
            {notifData.notifications.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ ...TD_STYLE, color: "var(--ink-20)", textAlign: "center", padding: "2rem" }}>
                  No notifications found.
                </td>
              </tr>
            ) : notifData.notifications.map((n, i) => {
              const recipients = n.recipientUserIds?.length
                ? n.recipientUserIds.slice(0, 2).join(", ") + (n.recipientUserIds.length > 2 ? ` +${n.recipientUserIds.length - 2}` : "")
                : "all";
              return (
                <tr key={n._id} style={{ borderBottom: "1px solid var(--ink-10)" }}>
                  <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{i + 1 + notifData.skip}</td>
                  <td style={{ ...TD_STYLE }}><StatusBadge status={n.status} /></td>
                  <td style={{ ...TD_STYLE }}>{fmt(n.scheduledFor)}</td>
                  <td style={{ ...TD_STYLE, maxWidth: 200, color: "var(--ink)" }}>{truncate(n.title, 35)}</td>
                  <td style={{ ...TD_STYLE, maxWidth: 260 }}>{truncate(n.message, 50)}</td>
                  <td style={{ ...TD_MONO }}>{recipients}</td>
                  <td style={{ ...TD_STYLE, textAlign: "center" }}>
                    {n.isReminder
                      ? <span style={{ fontSize: 10.5, color: "var(--coral)", fontWeight: 600 }}>yes</span>
                      : <span style={{ color: "var(--ink-20)" }}>—</span>}
                  </td>
                </tr>
              );
            })}
          </AdminTable>

          <AdminPagination
            page={npage}
            pages={notifData.pages}
            count={notifData.count}
            buildHref={(p) => `/admin/studies/${id}?nsort=${nsort}&ndir=${ndir}&npage=${p}`}
          />
        </div>

      </div>
    </main>
  );
}
