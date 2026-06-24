"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import NewsletterLog from "@/lib/models/newsletterLog";
import { unsubscribeUrl } from "@/lib/unsubscribe";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
  return session;
}

export type SendResult = {
  sent: number;
  failed: number;
  errors: string[];
};

export type LogEntry = {
  id: string;
  subject: string;
  body: string;
  sentAt: string;
  sentBy: string;
  sent: number;
  failed: number;
};

export async function sendNewsletter(formData: FormData): Promise<SendResult> {
  const session = await requireAdmin();

  const subject = (formData.get("subject") as string)?.trim();
  const body = (formData.get("body") as string)?.trim();

  if (!subject || !body) {
    return { sent: 0, failed: 0, errors: ["Subject and body are required."] };
  }

  await connectDB();

  const researchers = await User.find(
    {
      level: { $gte: 11 },
      emailIsConfirmed: true,
      email: { $exists: true, $ne: "" },
      // Respect opt-outs — never send marketing email to unsubscribed users (GDPR Art. 21).
      emailUnsubscribed: { $ne: true },
    },
    { email: 1, name: 1 }
  ).lean();

  if (researchers.length === 0) {
    return { sent: 0, failed: 0, errors: ["No confirmed researcher accounts found."] };
  }

  const apiKey = process.env.POSTMARK_API_KEY;
  if (!apiKey) {
    return { sent: 0, failed: 0, errors: ["POSTMARK_API_KEY is not configured."] };
  }

  const BATCH = 500;
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  const escapeHtml = (s: string): string =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const textBody = body;
  const htmlBody = body
    .split(/\n{2,}/)
    .map((p) => `<p style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#333;">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
    .join("\n");

  for (let i = 0; i < researchers.length; i += BATCH) {
    const batch = researchers.slice(i, i + BATCH);

    const messages = batch.map((r) => {
      // Every marketing email must carry a working unsubscribe link (GDPR Art. 21).
      const unsubUrl = unsubscribeUrl(String(r._id));
      return {
        From: "Samply <yury.shevchenko@uni.kn>",
        To: r.email as string,
        Subject: subject,
        TextBody: `${textBody}\n\n—\nYou received this because you have a Samply researcher account. Unsubscribe: ${unsubUrl}`,
        HtmlBody: `${htmlBody}\n<hr style="border:none;border-top:1px solid #ddd;margin:24px 0"/>\n<p style="font-family:sans-serif;font-size:12px;color:#888;">You received this because you have a Samply researcher account. <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a>.</p>`,
        MessageStream: "outbound",
      };
    });

    try {
      const res = await fetch("https://api.postmarkapp.com/email/batch", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": apiKey,
        },
        body: JSON.stringify(messages),
      });

      if (!res.ok) {
        const text = await res.text();
        errors.push(`Batch ${Math.floor(i / BATCH) + 1}: HTTP ${res.status} — ${text.slice(0, 200)}`);
        failed += batch.length;
        continue;
      }

      const results: Array<{ ErrorCode: number; Message: string; To: string }> = await res.json();
      for (const r of results) {
        if (r.ErrorCode === 0) {
          sent++;
        } else {
          failed++;
          errors.push(`${r.To}: ${r.Message}`);
        }
      }
    } catch (err) {
      errors.push(`Batch ${Math.floor(i / BATCH) + 1}: ${String(err)}`);
      failed += batch.length;
    }
  }

  if (sent > 0 || failed > 0) {
    await NewsletterLog.create({
      subject,
      body,
      sentBy: session.user.email ?? "admin",
      sent,
      failed,
    });
  }

  return { sent, failed, errors };
}

export async function getResearcherCount(): Promise<number> {
  await requireAdmin();
  await connectDB();
  return User.countDocuments({
    level: { $gte: 11 },
    emailIsConfirmed: true,
    email: { $exists: true, $ne: "" },
    emailUnsubscribed: { $ne: true },
  });
}

export async function getLogs(): Promise<LogEntry[]> {
  await requireAdmin();
  await connectDB();
  const docs = await NewsletterLog.find({}).sort({ sentAt: -1 }).lean();
  return docs.map((d) => ({
    id:      String(d._id),
    subject: d.subject,
    body:    d.body,
    sentAt:  new Date(d.sentAt).toISOString(),
    sentBy:  d.sentBy,
    sent:    d.sent,
    failed:  d.failed,
  }));
}
