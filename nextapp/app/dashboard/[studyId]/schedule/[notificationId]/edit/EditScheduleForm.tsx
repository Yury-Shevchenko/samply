"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useT } from "@/app/components/TranslationProvider";
import { updateScheduleContentAction } from "@/app/scheduled/actions";

interface ReminderState { title: string; message: string; days: number; hours: number; minutes: number }

interface Props {
  studyId: string;
  notificationId: string;
  initial: {
    title: string;
    message: string;
    url?: string;
    expireIn?: number | null;
    reminders?: Array<{ title: string; message: string; time: number }>;
  };
}

const FIELD: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "1.2rem", padding: "0.8rem 1.2rem",
  borderRadius: "0.6rem", border: "1px solid var(--ink-20)", background: "var(--paper)",
  color: "var(--ink)", outline: "none", width: "100%", boxSizing: "border-box",
};
const FIELD_SM: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "1.2rem", padding: "0.6rem 0.8rem",
  borderRadius: "0.6rem", border: "1px solid var(--ink-20)", background: "var(--paper)",
  color: "var(--ink)", outline: "none", width: "6rem", textAlign: "center", boxSizing: "border-box",
};
const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".08em",
  textTransform: "uppercase", color: "var(--ink-40)", display: "block", marginBottom: "0.5rem",
};
const INLINE_LABEL: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)" };
const CARD: React.CSSProperties = {
  background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem",
  padding: "1.8rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem",
};
const CARD_TITLE: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "1.05rem", letterSpacing: ".08em",
  textTransform: "uppercase", color: "var(--ink-60)", margin: 0,
};

function msToDHM(ms: number): { days: number; hours: number; minutes: number } {
  const totalMin = Math.max(0, Math.round(ms / 60000));
  return { days: Math.floor(totalMin / 1440), hours: Math.floor((totalMin % 1440) / 60), minutes: totalMin % 60 };
}
function dhmToMs(days: number, hours: number, minutes: number): number {
  return (days * 24 * 60 + hours * 60 + minutes) * 60000;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}
      style={{
        fontFamily: "var(--font-mono)", fontSize: "1.15rem", letterSpacing: ".04em",
        padding: "0.9rem 2rem", borderRadius: "9999px", border: "1px solid var(--coral)",
        background: "var(--coral)", color: "var(--paper)", cursor: pending ? "wait" : "pointer",
        opacity: pending ? 0.7 : 1,
      }}>
      {pending ? "…" : label}
    </button>
  );
}

export default function EditScheduleForm({ studyId, notificationId, initial }: Props) {
  const { t } = useT();
  const action = updateScheduleContentAction.bind(null, studyId, notificationId);

  const [title, setTitle] = useState(initial.title ?? "");
  const [message, setMessage] = useState(initial.message ?? "");
  const [url, setUrl] = useState(initial.url ?? "https://");

  const initExpire = initial.expireIn && initial.expireIn > 0 ? msToDHM(initial.expireIn) : null;
  const [expireType, setExpireType] = useState<"no" | "yes">(initExpire ? "yes" : "no");
  const [expireDays, setExpireDays] = useState(initExpire?.days ?? 0);
  const [expireHours, setExpireHours] = useState(initExpire?.hours ?? 0);
  const [expireMinutes, setExpireMinutes] = useState(initExpire?.minutes ?? 0);

  const initReminders: ReminderState[] = (initial.reminders ?? []).map((r) => ({
    title: r.title ?? "", message: r.message ?? "", ...msToDHM(r.time ?? 0),
  }));
  const [reminderType, setReminderType] = useState<"no" | "yes">(initReminders.length ? "yes" : "no");
  const [reminders, setReminders] = useState<ReminderState[]>(
    initReminders.length ? initReminders : [{ title: "", message: "", days: 0, hours: 0, minutes: 0 }],
  );

  const expireHidden = expireType === "yes" ? String(dhmToMs(expireDays, expireHours, expireMinutes)) : "";
  const remindersHidden = JSON.stringify(
    reminderType === "yes"
      ? reminders.map((r) => ({ title: r.title, message: r.message, time: dhmToMs(r.days, r.hours, r.minutes) }))
      : [],
  );

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
      {/* Content */}
      <div style={CARD}>
        <div>
          <label style={LABEL}>{t("notificationForm.labelTitle")}</label>
          <input name="title" style={FIELD} type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label style={LABEL}>{t("notificationForm.labelMessage")}</label>
          <input name="message" style={FIELD} type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <div>
          <label style={LABEL}>{t("notificationForm.labelWebLink")}</label>
          <input name="url" style={FIELD} type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-survey.com/?id=%SAMPLY_ID%" />
        </div>
      </div>

      {/* Link expiry */}
      <div style={CARD}>
        <p style={CARD_TITLE}>{t("notificationForm.cardExpiry")}</p>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          {(["no", "yes"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setExpireType(v)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "1.1rem", padding: "0.6rem 1.2rem",
                borderRadius: "9999px", cursor: "pointer",
                border: expireType === v ? "1px solid var(--coral)" : "1px solid var(--ink-20)",
                background: expireType === v ? "rgba(214,90,48,.08)" : "var(--paper)",
                color: expireType === v ? "var(--coral)" : "var(--ink-60)",
              }}>
              {v === "no" ? t("notificationForm.doesNotExpire") : t("notificationForm.expiresAfter")}
            </button>
          ))}
        </div>
        {expireType === "yes" && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <input type="number" min={0} value={expireDays} style={FIELD_SM} onChange={(e) => setExpireDays(Number(e.target.value))} />
            <span style={INLINE_LABEL}>d</span>
            <input type="number" min={0} value={expireHours} style={FIELD_SM} onChange={(e) => setExpireHours(Number(e.target.value))} />
            <span style={INLINE_LABEL}>h</span>
            <input type="number" min={0} value={expireMinutes} style={FIELD_SM} onChange={(e) => setExpireMinutes(Number(e.target.value))} />
            <span style={INLINE_LABEL}>m</span>
          </div>
        )}
      </div>

      {/* Reminders */}
      <div style={CARD}>
        <p style={CARD_TITLE}>{t("notificationForm.cardReminders")}</p>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          {(["no", "yes"] as const).map((v) => (
            <button key={v} type="button" onClick={() => setReminderType(v)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "1.1rem", padding: "0.6rem 1.2rem",
                borderRadius: "9999px", cursor: "pointer",
                border: reminderType === v ? "1px solid var(--coral)" : "1px solid var(--ink-20)",
                background: reminderType === v ? "rgba(214,90,48,.08)" : "var(--paper)",
                color: reminderType === v ? "var(--coral)" : "var(--ink-60)",
              }}>
              {v === "no" ? t("notificationForm.noReminders") : t("notificationForm.addReminders")}
            </button>
          ))}
        </div>
        {reminderType === "yes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", margin: 0, lineHeight: 1.6 }}>
              {t("notificationForm.reminderHint")}
            </p>
            {reminders.map((r, i) => (
              <div key={i} style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.6rem", padding: "1.2rem 1.4rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <label style={LABEL}>{t("notificationForm.labelTitle")}</label>
                    <input style={FIELD} type="text" value={r.title}
                      onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={LABEL}>{t("notificationForm.labelMessage")}</label>
                    <input style={FIELD} type="text" value={r.message}
                      onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, message: e.target.value } : x))} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={INLINE_LABEL}>{t("notificationForm.sendAfter")}</span>
                  <input type="number" min={0} value={r.days} style={FIELD_SM}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, days: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>d</span>
                  <input type="number" min={0} value={r.hours} style={FIELD_SM}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, hours: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>h</span>
                  <input type="number" min={0} value={r.minutes} style={FIELD_SM}
                    onChange={(e) => setReminders((p) => p.map((x, j) => j === i ? { ...x, minutes: Number(e.target.value) } : x))} />
                  <span style={INLINE_LABEL}>m</span>
                  {reminders.length > 1 && (
                    <button type="button" onClick={() => setReminders((p) => p.filter((_, j) => j !== i))}
                      style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "1rem", background: "none", border: "none", color: "var(--coral)", cursor: "pointer", opacity: 0.75 }}>
                      remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setReminders((p) => [...p, { title: "", message: "", days: 0, hours: 0, minutes: 0 }])}
              style={{ alignSelf: "flex-start", fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "none", border: "none", color: "var(--coral)", cursor: "pointer", padding: 0 }}>
              + {t("notificationForm.addReminder")}
            </button>
          </div>
        )}
      </div>

      {/* Serialized state for the server action */}
      <input type="hidden" name="expireIn" value={expireHidden} />
      <input type="hidden" name="reminders" value={remindersHidden} />

      <div style={{ display: "flex", alignItems: "center", gap: "1.4rem" }}>
        <SubmitButton label="Save changes" />
        <a href={`/scheduled/${studyId}?notificationId=${notificationId}`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", textDecoration: "none" }}>
          cancel
        </a>
      </div>
    </form>
  );
}
