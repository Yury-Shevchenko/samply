"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Project from "@/lib/models/project";
import User from "@/lib/models/user";
import mongoose from "mongoose";
import type { Session } from "next-auth";

async function requireResearcher(): Promise<Session> {
  const session = await auth();
  if (!session || (session as Session).user.level <= 10) redirect("/login");
  return session as Session;
}

async function resolveMemberIds(
  emails: string[],
  currentUserEmail: string,
): Promise<{ ids: string[]; missing: string[] }> {
  if (!emails.length) return { ids: [], missing: [] };
  const users = await User.find(
    { email: { $in: emails }, level: { $gt: 10 }, emailIsConfirmed: true },
    { _id: 1, email: 1 },
  ).lean() as unknown as { _id: { toString(): string }; email: string }[];

  const foundEmails = new Set(users.map((u) => u.email));
  const ids = users
    .filter((u) => u.email !== currentUserEmail)
    .map((u) => u._id.toString());
  const missing = emails.filter(
    (e) => e !== currentUserEmail && !foundEmails.has(e),
  );
  return { ids, missing };
}

export async function updateSettingsAction(studyId: string, formData: FormData) {
  const session = await requireResearcher();
  await connectDB();

  const project = await Project.findById(studyId, { creator: 1 }).lean();
  if (!project) redirect("/dashboard");

  if (String((project as unknown as { creator: unknown }).creator) !== session.user.id) {
    redirect("/dashboard");
  }

  /* ── Members ─────────────────────────────────────────────────────────────── */
  const memberEmails = formData
    .getAll("members")
    .map((v) => (v as string).trim())
    .filter(Boolean);
  const { ids: memberIds, missing: missingEmails } = await resolveMemberIds(memberEmails, session.user.email);
  const memberObjectIds = memberIds.map((id) => new mongoose.Types.ObjectId(id));

  /* ── Event-contingent design ─────────────────────────────────────────────── */
  const events: Array<{ num: number; caption: string; url: string }> = [];
  for (let i = 1; i <= 5; i++) {
    const caption = ((formData.get(`event-caption-${i}`) as string) ?? "").trim();
    const url = ((formData.get(`event-url-${i}`) as string) ?? "").trim();
    if (caption || url) events.push({ num: i, caption, url });
  }

  /* ── Action buttons ──────────────────────────────────────────────────────── */
  const actions: Array<{ num: number; identifier: string; buttonTitle: string }> = [];
  for (let i = 1; i <= 4; i++) {
    const identifier = ((formData.get(`identifier-${i}`) as string) ?? "").trim();
    const buttonTitle = ((formData.get(`buttonTitle-${i}`) as string) ?? "").trim();
    if (identifier || buttonTitle) actions.push({ num: i, identifier, buttonTitle });
  }

  /* ── Webhooks ────────────────────────────────────────────────────────────── */
  const WEBHOOK_EVENTS = ["study_joined", "study_left", "participant_info_updated"] as const;
  const webhookEvents = WEBHOOK_EVENTS.filter(
    (e) => formData.get(`webhookEvents-${e}`) === "on",
  );

  /* ── Geofencing user-defined zone ────────────────────────────────────────── */
  const geoUserEvents: string[] = [];
  if (formData.get("event-enter") === "on") geoUserEvents.push("enter");
  if (formData.get("event-exit") === "on") geoUserEvents.push("exit");

  /* ── Researcher-defined geofencing locations ─────────────────────────────── */
  const locationsJson = (formData.get("locationsJson") as string) ?? "[]";
  let parsedLocations: unknown[] = [];
  try {
    parsedLocations = JSON.parse(locationsJson);
  } catch {
    parsedLocations = [];
  }

  await Project.findByIdAndUpdate(studyId, {
    $set: {
      members: memberObjectIds,

      "settings.enableEvents": formData.get("enableEvents") === "on",
      "settings.eventDescription": (formData.get("eventDescription") as string) ?? "",
      "settings.events": events,

      "settings.enableActions": formData.get("enableActions") === "on",
      "settings.actions": actions,

      "settings.enableWebhooks": formData.get("enableWebhooks") === "on",
      "settings.webhookEndpoint": (formData.get("webhookEndpoint") as string) ?? "",
      "settings.webhookEvents": webhookEvents,

      "settings.enableGeofencing": formData.get("enableGeofencing") === "on",
      geofencingInstruction: (formData.get("geofencingInstruction") as string) ?? "",
      "settings.geofencing.link": (formData.get("geofencingURL") as string) ?? "",
      "settings.geofencing.radius": formData.get("userLocationRadius")
        ? Number(formData.get("userLocationRadius"))
        : undefined,
      "settings.geofencing.header": (formData.get("userLocationHeader") as string) ?? "",
      "settings.geofencing.message": (formData.get("userLocationMessage") as string) ?? "",
      "settings.geofencing.exitzone": formData.get("userLocationExitzone")
        ? Number(formData.get("userLocationExitzone"))
        : undefined,
      "settings.geofencing.mintimewindow": formData.get("userLocationMintimewindow")
        ? Number(formData.get("userLocationMintimewindow"))
        : undefined,
      "settings.geofencing.events": geoUserEvents,
      "settings.geofencing.invisible": formData.get("invisible") === "on",
      "settings.geofencing.locations": parsedLocations,
    },
  });

  if (missingEmails.length > 0) {
    redirect(
      `/dashboard/${studyId}/settings?notice=` +
        encodeURIComponent("Settings saved.") +
        "&warning=" +
        encodeURIComponent(
          `The following email${missingEmails.length > 1 ? "s were" : " was"} not added — no registered Samply researcher account found: ${missingEmails.join(", ")}`,
        ),
    );
  }

  redirect(
    `/dashboard/${studyId}/settings?notice=` + encodeURIComponent("Settings saved."),
  );
}
