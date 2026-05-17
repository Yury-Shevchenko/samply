import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchProjectById } from "@/lib/data/projects";
import { fetchParticipants, fetchHistory, fetchReceipts, fetchParticipantUserInfo } from "@/lib/data/participants";
import type { IResult } from "@/lib/models/result";
import type { IReceipt } from "@/lib/models/receipt";
import { toggleParticipantAction, deleteParticipantAction, updateParticipantCodeAction } from "./actions";
import { DeleteForm } from "./DeleteForm";
import SubmitButton from "@/app/components/ui/SubmitButton";
import CodeEditor from "./CodeEditor";
import { fetchPendingNotifications } from "@/lib/data/scheduled";
import { getT } from "@/lib/i18n.server";

interface Props {
  params: Promise<{ studyId: string; participantId: string }>;
}

const STATUS_PRIORITY: Record<string, number> = {
  completed: 6, "opened-in-app": 5, tapped: 4,
  archived: 3, "received-in-app": 2, sent: 1,
};

function bestStatus(r: IResult): string {
  return (r.events ?? []).reduce<{ status: string; priority: number }>(
    (acc, e) => {
      const p = STATUS_PRIORITY[e.status] ?? 0;
      return p > acc.priority ? { status: e.status, priority: p } : acc;
    },
    { status: "sent", priority: 0 },
  ).status;
}

function StatusPill({ status }: { status: string }) {
  const isCompleted = status === "completed";
  const isTapped = status === "tapped" || status === "opened-in-app";
  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      padding: "0.2rem 0.8rem",
      borderRadius: "9999px",
      background: isCompleted ? "rgba(61,115,107,.1)" : isTapped ? "rgba(124,106,181,.1)" : "var(--ink-10)",
      color: isCompleted ? "var(--sage)" : isTapped ? "#7c6ab5" : "var(--ink-60)",
    }}>
      {status}
    </span>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "1.6rem", alignItems: "baseline", padding: "0.9rem 0", borderBottom: "1px solid var(--ink-10)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0, width: "11rem" }}>
        {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
        {children}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.2rem" }}>
      {children}
    </div>
  );
}

const TH: React.CSSProperties = {
  padding: "0.9rem 1.6rem",
  textAlign: "left",
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  fontWeight: 600,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  whiteSpace: "nowrap",
};

export default async function ParticipantDetailPage({ params }: Props) {
  const { studyId, participantId } = await params;

  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const [project, allParticipants] = await Promise.all([
    fetchProjectById(studyId, session.user.id),
    fetchParticipants(studyId),
  ]);

  if (!project) notFound();

  const participant = allParticipants.find((p) => p.id === participantId);
  if (!participant) notFound();

  const [{ history: recentSent, count: sentCount }, receipts, userInfo, { items: upcomingRaw }] = await Promise.all([
    fetchHistory(studyId, 1, participantId, "created", "desc", 5),
    fetchReceipts(participantId, session.user.id),
    fetchParticipantUserInfo(participantId),
    fetchPendingNotifications(studyId, undefined, ["pending"], participantId, 1, "scheduledFor", "asc"),
  ]);
  const upcoming = upcomingRaw.slice(0, 5);

  const isDeactivated = participant.deactivated ?? false;

  const toggleAction = toggleParticipantAction.bind(null, studyId, participantId);
  const deleteAction = deleteParticipantAction.bind(null, studyId, participantId);
  const updateCodeAction = updateParticipantCodeAction.bind(null, studyId, participantId);

  return (
    <div className="flex flex-col gap-[2.8rem]">

      {/* Breadcrumb */}
      <div>
        <a href={`/dashboard/${studyId}/participants`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
          className="hover:text-[var(--ink)] transition-colors">
          {t("participants.backToParticipants")}
        </a>
      </div>

      {/* Profile card */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.6rem 1.8rem rgba(60,40,20,.05)", overflow: "hidden" }}>
        <div style={{ padding: "1.8rem 2.4rem 1.6rem", borderBottom: "1px solid var(--ink-10)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.6rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.6rem" }}>
              {t("participants.detailEyebrow")}
            </div>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", lineHeight: 1, color: "var(--ink)" }}>
              {participantId}
            </div>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            padding: "0.4rem 1.2rem",
            borderRadius: "9999px",
            background: isDeactivated ? "rgba(214,90,48,.08)" : "rgba(61,115,107,.08)",
            color: isDeactivated ? "var(--coral)" : "var(--sage)",
            border: isDeactivated ? "1px solid rgba(214,90,48,.2)" : "1px solid rgba(61,115,107,.2)",
            flexShrink: 0,
            marginTop: "0.6rem",
          }}>
            {isDeactivated ? t("participants.statusDeactivated") : t("participants.statusActive")}
          </span>
        </div>

        <div style={{ padding: "0.4rem 2.4rem 1.2rem" }}>
          <CodeEditor current={participant.username} action={updateCodeAction} />
          {participant.group?.name && (
            <MetaRow label={t("participants.labelGroup")}>
              <span style={{ padding: "0.2rem 0.8rem", borderRadius: "9999px", background: "var(--ink-10)", color: "var(--ink-60)" }}>
                {participant.group.name}
              </span>
            </MetaRow>
          )}
          <MetaRow label={t("participants.labelEnrolled")}>
            {participant.created ? new Date(participant.created).toLocaleString() : "—"}
          </MetaRow>
          {participant.token ? (
            <MetaRow label={t("participants.labelPushToken")}>
              <span style={{ color: "var(--ink-40)", fontSize: "1.1rem" }}>
                {participant.token.slice(0, 32)}…
              </span>
            </MetaRow>
          ) : (
            <MetaRow label={t("participants.labelPushToken")}>
              <span style={{ color: "var(--coral)", fontSize: "1.2rem", fontWeight: 500 }}>{t("participants.detailNoToken")}</span>
              <span style={{ display: "block", fontSize: "1.15rem", color: "var(--ink-60)", marginTop: "0.3rem", lineHeight: 1.5 }}>
                {t("participants.detailNoTokenHint")}
              </span>
            </MetaRow>
          )}
          {participant.stripe?.account && (
            <MetaRow label={t("participants.labelStripeAccount")}>
              <span style={{ color: "var(--ink-40)", fontSize: "1.1rem" }}>{participant.stripe.account}</span>
            </MetaRow>
          )}
          {userInfo.timezone && (
            <MetaRow label={t("participants.labelTimezone")}>{userInfo.timezone}</MetaRow>
          )}
          {(userInfo.timeWindowFrom || userInfo.timeWindowTo) && (
            <MetaRow label={t("participants.labelTimeWindow")}>
              {userInfo.timeWindowFrom ?? "—"} – {userInfo.timeWindowTo ?? "—"}
            </MetaRow>
          )}
          {participant.information && Object.keys(participant.information).length > 0 && (
            <>
              {Object.entries(participant.information)
                .filter(([k]) => !["timezone", "from", "to", "timeWindow"].includes(k))
                .map(([k, v]) => (
                  <MetaRow key={k} label={k}>{String(v)}</MetaRow>
                ))}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <a href={`/dashboard/${studyId}/schedule/new?participantId=${participantId}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 1.8rem", background: "var(--coral)", color: "#fff", borderRadius: "9999px", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", textDecoration: "none" }}
          className="hover:opacity-90 transition-opacity">
          {t("participants.scheduleNotification")}
        </a>

        <form action={toggleAction}>
          <SubmitButton
            pendingLabel={isDeactivated ? t("participants.enabling") : t("participants.disabling")}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 1.8rem", border: isDeactivated ? "1px solid rgba(61,115,107,.3)" : "1px solid var(--ink-20)", borderRadius: "9999px", background: isDeactivated ? "rgba(61,115,107,.06)" : "transparent", color: isDeactivated ? "var(--sage)" : "var(--ink-60)", fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em" }}
            className="hover:opacity-70 transition-opacity">
            {isDeactivated ? t("participants.enableNotifications") : t("participants.disableNotifications")}
          </SubmitButton>
        </form>
      </div>

      {/* Upcoming notifications preview */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.2rem" }}>
          <SectionLabel>{t("participants.upcomingHeading")}</SectionLabel>
          <a
            href={`/scheduled/${studyId}?pnUser=${participantId}`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
            className="hover:text-[var(--ink)] transition-colors"
          >
            {t("participants.seeAll")}
          </a>
        </div>
        {upcoming.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "2.4rem 2rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: 0 }}>
              {t("participants.noUpcoming")}
            </p>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                  <th style={TH}>{t("participants.thScheduledFor")}</th>
                  <th style={TH}>{t("participants.thTitle")}</th>
                  <th style={TH}>{t("participants.thRem")}</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((row, i) => (
                  <tr key={String(row._id)} style={{ borderBottom: i < upcoming.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                    className="hover:bg-[var(--paper)] transition-colors">
                    <td style={{ padding: "0.9rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", whiteSpace: "nowrap" }} suppressHydrationWarning>
                      {new Date(row.scheduledFor).toLocaleString()}
                    </td>
                    <td style={{ padding: "0.9rem 1.6rem", fontSize: "1.2rem", color: "var(--ink-60)", maxWidth: 280 }}>
                      <div className="truncate">{row.title || row.message || "—"}</div>
                    </td>
                    <td style={{ padding: "0.9rem 1.6rem" }}>
                      {row.isReminder && (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 700, background: "rgba(124,106,181,.12)", color: "#7c6ab5", padding: "0.15rem 0.5rem", borderRadius: "0.4rem", letterSpacing: ".06em" }}>
                          R
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Sent notifications preview */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.2rem" }}>
          <SectionLabel>{t("participants.sentHeading", { n: sentCount.toLocaleString() })}</SectionLabel>
          <a
            href={`/dashboard/${studyId}/data?participant=${participantId}`}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: ".04em", color: "var(--ink-40)", textDecoration: "none" }}
            className="hover:text-[var(--ink)] transition-colors"
          >
            {t("participants.seeAll")}
          </a>
        </div>
        {recentSent.length === 0 ? (
          <div style={{ background: "var(--surface)", border: "1px dashed var(--ink-20)", borderRadius: "0.8rem", padding: "2.4rem 2rem", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", margin: 0 }}>
              {t("participants.noSent")}
            </p>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                  <th style={TH}>{t("participants.thNotification")}</th>
                  <th style={TH}>{t("participants.thSent")}</th>
                  <th style={TH}>{t("participants.thStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {recentSent.map((r, i) => {
                  const status = bestStatus(r);
                  return (
                    <tr key={String(r._id)} style={{ borderBottom: i < recentSent.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                      className="hover:bg-[var(--paper)] transition-colors">
                      <td style={{ padding: "0.9rem 1.6rem", fontSize: "1.2rem", color: "var(--ink-60)", maxWidth: 280 }}>
                        <div className="truncate">{r.data?.title ?? r.data?.message ?? "—"}</div>
                      </td>
                      <td style={{ padding: "0.9rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", whiteSpace: "nowrap" }} suppressHydrationWarning>
                        {new Date(r.created).toLocaleString()}
                      </td>
                      <td style={{ padding: "0.9rem 1.6rem" }}>
                        <StatusPill status={status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Receipts */}
      {receipts.length > 0 && (
        <section>
          <SectionLabel>{t("participants.payoutsHeading", { n: receipts.length })}</SectionLabel>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
                  <th style={TH}>{t("participants.thDate")}</th>
                  <th style={TH}>{t("participants.thAmount")}</th>
                  <th style={TH}>{t("participants.thCurrency")}</th>
                  <th style={TH}>{t("participants.thStatus")}</th>
                  <th style={TH}>{t("participants.thReceipt")}</th>
                </tr>
              </thead>
              <tbody>
                {(receipts as IReceipt[]).map((rec, i) => (
                  <tr key={String(rec._id)}
                    style={{ borderBottom: i < receipts.length - 1 ? "1px solid var(--ink-10)" : "none" }}
                    className="hover:bg-[var(--paper)] transition-colors">
                    <td style={{ padding: "1rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", whiteSpace: "nowrap" }}>
                      {new Date(rec.created).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink)", fontWeight: 600 }}>
                      {rec.paymentInfo?.amount != null ? (rec.paymentInfo.amount / 100).toFixed(2) : "—"}
                    </td>
                    <td style={{ padding: "1rem 1.6rem", fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textTransform: "uppercase" }}>
                      {rec.paymentInfo?.currency ?? "—"}
                    </td>
                    <td style={{ padding: "1rem 1.6rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "0.2rem 0.8rem", borderRadius: "9999px", background: rec.status === "paid" ? "rgba(61,115,107,.1)" : "var(--ink-10)", color: rec.status === "paid" ? "var(--sage)" : "var(--ink-60)" }}>
                        {rec.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.6rem" }}>
                      {rec.paymentInfo?.url ? (
                        <a href={rec.paymentInfo.url} target="_blank" rel="noreferrer"
                          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none", letterSpacing: ".04em" }}
                          className="hover:opacity-70 transition-opacity">
                          {t("participants.openReceipt")}
                        </a>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Danger zone */}
      <section>
        <div style={{ height: "0.1rem", backgroundImage: "radial-gradient(circle, var(--ink-40) 1px, transparent 1.2px)", backgroundSize: "0.8rem 0.1rem", backgroundRepeat: "repeat-x", opacity: 0.2, marginBottom: "2rem" }} />
        <SectionLabel>{t("participants.dangerZoneHeading")}</SectionLabel>
        <div style={{ background: "rgba(214,90,48,.04)", border: "1px solid rgba(214,90,48,.15)", borderRadius: "0.8rem", padding: "1.8rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.6rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.3rem" }}>
              {t("participants.removeParticipant")}
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.55 }}>
              {t("participants.removeParticipantHint")}
            </p>
          </div>
          <DeleteForm action={deleteAction} />
        </div>
      </section>

    </div>
  );
}
