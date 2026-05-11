import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ChangelogEntry from "@/lib/models/changelogEntry";
import { AdminPage, TD_STYLE, TD_MONO } from "../shared";
import { ConfirmDeleteButton } from "../ConfirmDeleteButton";
import { createEntryAction, deleteEntryAction } from "./actions";

export const metadata = { title: "Admin: Changelog — Samply" };

const INPUT: React.CSSProperties = {
  padding: "0.75rem 1rem",
  border: "1px solid var(--ink-20)",
  borderRadius: "0.6rem",
  fontSize: "1.3rem",
  fontFamily: "var(--font-body)",
  background: "var(--surface)",
  color: "var(--ink)",
  width: "100%",
  boxSizing: "border-box",
};
const SELECT: React.CSSProperties = { ...INPUT, width: "12rem", flexShrink: 0 };
const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--ink-60)",
  display: "block",
  marginBottom: "0.5rem",
};

const TAG_COLORS: Record<string, string> = {
  new:         "var(--coral)",
  fix:         "var(--sage)",
  improvement: "var(--ink-60)",
};
const TAG_LABELS: Record<string, string> = {
  new: "New", fix: "Fix", improvement: "Improved",
};

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AdminChangelogPage() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  await connectDB();
  const entries = await ChangelogEntry.find({}).sort({ date: -1 }).lean();

  return (
    <AdminPage title="Changelog" count={entries.length}>

      {/* ── Add entry form ─────────────────────────────────────────────── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1.2rem", padding: "2.4rem 2.8rem", marginBottom: "3.2rem" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.7rem", letterSpacing: "-0.02em", marginBottom: "2rem" }}>New entry</div>

        <form action={createEntryAction} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>

          <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 12rem" }}>
              <label style={LABEL}>Version</label>
              <input name="version" required placeholder="1.9.10" style={INPUT} />
            </div>
            <div style={{ flex: "0 0 14rem" }}>
              <label style={LABEL}>Date</label>
              <input name="date" type="date" required style={INPUT} />
            </div>
            <div style={{ flex: 1, minWidth: "18rem" }}>
              <label style={LABEL}>Title <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--ink-40)" }}>(optional)</span></label>
              <input name="title" placeholder="Short release headline" maxLength={120} style={INPUT} />
            </div>
          </div>

          <div>
            <label style={LABEL}>Changes</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                  <select name={`tag_${i}`} defaultValue="new" style={SELECT}>
                    <option value="new">New</option>
                    <option value="improvement">Improved</option>
                    <option value="fix">Fix</option>
                  </select>
                  <input name={`text_${i}`} placeholder={i === 0 ? "What changed…" : ""} style={INPUT} />
                </div>
              ))}
            </div>
            <p style={{ fontSize: "1.1rem", color: "var(--ink-40)", margin: "0.6rem 0 0" }}>Leave text blank to skip a row.</p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              style={{ padding: "0.9rem 2.4rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.25rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none", cursor: "pointer" }}
            >
              Publish entry
            </button>
          </div>
        </form>
      </div>

      {/* ── Entry list ─────────────────────────────────────────────────── */}
      <div style={{ border: "1px solid var(--ink-10)", borderRadius: "1.2rem", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)" }}>
          <thead>
            <tr>
              {["", "Version", "Date", "Title", "Changes", "view"].map((h) => (
                <th key={h} style={{ ...TD_STYLE, fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", padding: "1.1rem 1.4rem", textAlign: "left", fontWeight: 500, background: "var(--ink)", color: "var(--paper)" }}>{h === "view" ? "" : h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => {
              const del = deleteEntryAction.bind(null, String(e._id));
              return (
                <tr key={String(e._id)} style={{ borderBottom: "1px solid var(--ink-10)", background: i % 2 === 0 ? "var(--surface)" : "var(--paper)" }}>
                  <td style={{ ...TD_STYLE, width: 36, padding: "9px 8px 9px 14px" }}>
                    <ConfirmDeleteButton action={del} message={`Delete changelog entry ${e.version}? This cannot be undone.`} />
                  </td>
                  <td style={{ ...TD_MONO, fontWeight: 700, color: "var(--ink)" }}>{e.version}</td>
                  <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{fmt(e.date)}</td>
                  <td style={{ ...TD_STYLE, color: "var(--ink-60)", maxWidth: "22rem" }}>{e.title || <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
                  <td style={{ ...TD_STYLE, maxWidth: "36rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      {e.changes.map((c, j) => (
                        <div key={j} style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: TAG_COLORS[c.tag] ?? "var(--ink-40)", flexShrink: 0 }}>{TAG_LABELS[c.tag] ?? c.tag}</span>
                          <span style={{ fontSize: "1.2rem", color: "var(--ink-60)" }}>{c.text}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ ...TD_STYLE, width: 80 }}>
                    <a href="/docs/changelog" target="_blank" style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none" }} className="hover:opacity-70">View →</a>
                  </td>
                </tr>
              );
            })}
            {entries.length === 0 && (
              <tr>
                <td colSpan={6} style={{ ...TD_STYLE, textAlign: "center", color: "var(--ink-20)", padding: "3rem" }}>
                  No entries yet. Add the first one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </AdminPage>
  );
}
