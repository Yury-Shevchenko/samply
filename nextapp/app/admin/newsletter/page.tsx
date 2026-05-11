import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { AdminPage, TH_STYLE, TD_STYLE, TD_MONO } from "../shared";
import { getResearcherCount, getLogs, LogEntry } from "./actions";
import NewsletterForm from "./NewsletterForm";

export const metadata = { title: "Admin: Newsletter — Samply" };

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

function LogTable({ logs }: { logs: LogEntry[] }) {
  if (logs.length === 0) return null;
  return (
    <div style={{ marginTop: "4rem" }}>
      <h2
        className="font-[family-name:var(--font-display)] font-bold"
        style={{ fontSize: "1.8rem", letterSpacing: "-0.02em", marginBottom: "1.6rem" }}
      >
        Sent newsletters
      </h2>
      <div style={{ overflowX: "auto", borderRadius: "1.2rem", border: "1px solid var(--ink-10)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)" }}>
          <thead>
            <tr>
              <th style={TH_STYLE}>Date</th>
              <th style={TH_STYLE}>Subject</th>
              <th style={TH_STYLE}>Sent by</th>
              <th style={{ ...TH_STYLE, textAlign: "right" }}>Sent</th>
              <th style={{ ...TH_STYLE, textAlign: "right" }}>Failed</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={TD_MONO}>{fmt(log.sentAt)}</td>
                <td style={{ ...TD_STYLE, maxWidth: "36rem", whiteSpace: "normal", wordBreak: "break-word" }}>
                  {log.subject}
                </td>
                <td style={TD_MONO}>{log.sentBy}</td>
                <td style={{ ...TD_MONO, textAlign: "right", color: "var(--sage)" }}>{log.sent.toLocaleString()}</td>
                <td style={{ ...TD_MONO, textAlign: "right", color: log.failed > 0 ? "var(--coral)" : "var(--ink-20)" }}>
                  {log.failed.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function AdminNewsletterPage() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  await connectDB();
  const [recipientCount, logs] = await Promise.all([
    getResearcherCount(),
    getLogs(),
  ]);

  return (
    <AdminPage title="Newsletter">
      <NewsletterForm recipientCount={recipientCount} />
      <LogTable logs={logs} />
    </AdminPage>
  );
}
