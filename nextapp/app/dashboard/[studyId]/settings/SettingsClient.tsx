"use client";

import { useState, useRef, lazy, Suspense } from "react";
import type { ProjectFull, GeoLocation } from "@/lib/data/projects";

const MapPicker = lazy(() => import("@/app/components/MapPicker"));

interface Props {
  project: ProjectFull;
  memberEmails: string[];
  action: (formData: FormData) => Promise<void>;
  notice?: string;
  warning?: string;
  baseUrl: string;
}

/* ── Shared styles ───────────────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 1.2rem",
  fontSize: "1.35rem",
  color: "var(--ink)",
  background: "var(--paper)",
  border: "1px solid var(--ink-20)",
  borderRadius: "0.8rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "7rem",
  lineHeight: 1.55,
};

const labelStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 500,
  color: "var(--ink-60)",
  display: "block",
  marginBottom: "0.4rem",
};

const hintStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "var(--ink-40)",
  lineHeight: 1.5,
  margin: "0 0 0.6rem",
};

/* ── Section card ────────────────────────────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderRadius: "1.2rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1.6rem 2.4rem",
          borderBottom: "1px solid var(--ink-10)",
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "var(--ink-40)",
          letterSpacing: "0.09em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div style={{ padding: "2.4rem", display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Toggle switch ───────────────────────────────────────────────────────── */
function Toggle({
  id,
  name,
  label,
  hint,
  checked,
  onChange,
  children,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "1.2rem", cursor: "pointer" }}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        />
        <div
          style={{
            width: "3.8rem",
            height: "2.2rem",
            borderRadius: "9999px",
            background: checked ? "var(--sage)" : "var(--ink-20)",
            position: "relative",
            flexShrink: 0,
            transition: "background 150ms",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0.3rem",
              left: checked ? "1.9rem" : "0.3rem",
              width: "1.6rem",
              height: "1.6rem",
              borderRadius: "50%",
              background: "#fff",
              transition: "left 150ms",
              boxShadow: "0 1px 3px rgba(0,0,0,.18)",
            }}
          />
        </div>
        <span style={{ fontSize: "1.35rem", fontWeight: 500, color: "var(--ink)" }}>{label}</span>
      </label>
      {hint && <p style={{ ...hintStyle, margin: "0.5rem 0 0 5rem" }}>{hint}</p>}
      {checked && children && (
        <div style={{ marginTop: "1.6rem", marginLeft: "5rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Checkbox row ────────────────────────────────────────────────────────── */
function CheckRow({
  id,
  name,
  label,
  checked,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
}) {
  const [on, setOn] = useState(checked);
  return (
    <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer", fontSize: "1.3rem", color: "var(--ink-60)" }}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
        style={{ width: "1.4rem", height: "1.4rem", accentColor: "var(--sage)", flexShrink: 0 }}
      />
      {label}
    </label>
  );
}

/* ── Geofencing location row ─────────────────────────────────────────────── */
function LocationRow({
  loc,
  onDelete,
}: {
  loc: GeoLocation;
  onDelete: () => void;
}) {
  const [enterOn, setEnterOn] = useState(loc.events?.includes("enter") ?? false);
  const [exitOn, setExitOn] = useState(loc.events?.includes("exit") ?? false);
  const [invisibleOn, setInvisibleOn] = useState(loc.invisible ?? false);
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState(loc.latitude ?? 0);
  const [lng, setLng] = useState(loc.longitude ?? 0);
  const [radius, setRadius] = useState(loc.radius ?? 100);

  const fieldStyle = { ...inputStyle, marginBottom: "0.6rem" };

  return (
    <div
      style={{
        background: "var(--paper)",
        border: "1px solid var(--ink-10)",
        borderRadius: "0.8rem",
        padding: "1.6rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
        <span style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--ink)" }}>
          {loc.title || "New location"}
        </span>
        <button
          type="button"
          onClick={onDelete}
          style={{ fontSize: "1.2rem", color: "var(--coral)", background: "none", border: "none", cursor: "pointer", padding: "0.2rem 0.6rem" }}
        >
          Remove
        </button>
      </div>

      <input type="hidden" name={`loc-slug-${loc.slug}`} value={loc.slug} />

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input name={`loc-title-${loc.slug}`} type="text" defaultValue={loc.title} placeholder="Location name" style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Radius (m)</label>
          <input
            name={`loc-radius-${loc.slug}`}
            type="number"
            value={radius || ""}
            onChange={(e) => setRadius(Number(e.target.value) || 0)}
            placeholder="100"
            style={fieldStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Latitude</label>
          <input
            name={`loc-latitude-${loc.slug}`}
            type="text"
            value={lat || ""}
            onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
            placeholder="48.7758"
            style={fieldStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Longitude</label>
          <input
            name={`loc-longitude-${loc.slug}`}
            type="text"
            value={lng || ""}
            onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
            placeholder="9.1829"
            style={fieldStyle}
          />
        </div>
      </div>

      {/* Map picker */}
      <div style={{ marginBottom: "0.8rem" }}>
        <button
          type="button"
          onClick={() => setShowMap((v) => !v)}
          style={{
            fontSize: "1.2rem",
            color: "var(--sage)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "var(--font-body)",
          }}
        >
          {showMap ? "Hide map" : "Pick location on map"}
        </button>
        {showMap && (
          <div style={{ marginTop: "0.8rem" }}>
            <p style={{ ...hintStyle, marginBottom: "0.6rem" }}>
              Click anywhere on the map to set the coordinates.
            </p>
            <Suspense fallback={<div style={{ height: "280px", background: "var(--ink-10)", borderRadius: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "var(--ink-40)" }}>Loading map…</div>}>
              <MapPicker
                lat={lat}
                lng={lng}
                radius={radius}
                onChange={(newLat, newLng) => {
                  setLat(parseFloat(newLat.toFixed(6)));
                  setLng(parseFloat(newLng.toFixed(6)));
                }}
              />
            </Suspense>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <div>
          <label style={labelStyle}>Survey link</label>
          <input name={`loc-link-${loc.slug}`} type="text" defaultValue={loc.link ?? ""} placeholder="https://…" style={{ ...fieldStyle, fontFamily: "var(--font-mono)", fontSize: "1.2rem" }} />
        </div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
          <div>
            <label style={labelStyle}>Notification header</label>
            <input name={`loc-header-${loc.slug}`} type="text" defaultValue={loc.header ?? ""} placeholder="You arrived at…" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Notification message</label>
            <input name={`loc-message-${loc.slug}`} type="text" defaultValue={loc.message ?? ""} placeholder="Please fill out the survey" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Exit zone (m)</label>
            <input name={`loc-exitzone-${loc.slug}`} type="number" defaultValue={loc.exitzone ?? ""} placeholder="0" style={fieldStyle} />
          </div>
          <div>
            <label style={labelStyle}>Min time (min)</label>
            <input name={`loc-mintimewindow-${loc.slug}`} type="number" defaultValue={loc.mintimewindow ?? ""} placeholder="0" style={fieldStyle} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1.6rem", marginTop: "0.8rem", flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.2rem", color: "var(--ink-60)", cursor: "pointer" }}>
          <input
            type="checkbox"
            name={`loc-event-enter-${loc.slug}`}
            checked={enterOn}
            onChange={(e) => setEnterOn(e.target.checked)}
            style={{ width: "1.3rem", height: "1.3rem", accentColor: "var(--sage)" }}
          />
          Trigger on enter
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.2rem", color: "var(--ink-60)", cursor: "pointer" }}>
          <input
            type="checkbox"
            name={`loc-event-exit-${loc.slug}`}
            checked={exitOn}
            onChange={(e) => setExitOn(e.target.checked)}
            style={{ width: "1.3rem", height: "1.3rem", accentColor: "var(--sage)" }}
          />
          Trigger on exit
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.2rem", color: "var(--ink-60)", cursor: "pointer" }}>
          <input
            type="checkbox"
            name={`loc-invisible-${loc.slug}`}
            checked={invisibleOn}
            onChange={(e) => setInvisibleOn(e.target.checked)}
            style={{ width: "1.3rem", height: "1.3rem", accentColor: "var(--sage)" }}
          />
          Hide from participants
        </label>
      </div>
    </div>
  );
}

/* ── Copyable URL ────────────────────────────────────────────────────────── */
function CopyableUrl({ label, url }: { label: string; url: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "0.5rem", fontFamily: "var(--font-mono)" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "stretch", gap: "0", border: "1px solid var(--ink-20)", borderRadius: "0.8rem", overflow: "hidden" }}>
        <div style={{ flex: 1, padding: "0.9rem 1.2rem", fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", background: "rgba(214,90,48,.04)", wordBreak: "break-all", lineHeight: 1.5 }}>
          {url}
        </div>
        <button
          type="button"
          onClick={copy}
          style={{ flexShrink: 0, padding: "0 1.4rem", background: copied ? "rgba(61,115,107,.1)" : "var(--ink-10)", border: "none", borderLeft: "1px solid var(--ink-20)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "1.05rem", fontWeight: 600, color: copied ? "var(--sage)" : "var(--ink-40)", letterSpacing: ".06em", whiteSpace: "nowrap", transition: "all 150ms" }}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function SettingsClient({ project, memberEmails, action, notice, warning, baseUrl }: Props) {
  const s = project.settings ?? {};
  const formRef = useRef<HTMLFormElement>(null);

  /* Members */
  const [members, setMembers] = useState<string[]>(
    memberEmails.length ? memberEmails : [""],
  );

  /* Feature toggles */
  const [showEvents, setShowEvents] = useState(s.enableEvents ?? false);
  const [showActions, setShowActions] = useState(s.enableActions ?? false);
  const [showWebhooks, setShowWebhooks] = useState(s.enableWebhooks ?? false);
  const [showGeofencing, setShowGeofencing] = useState(s.enableGeofencing ?? false);

  const hasParticipantZoneData = Boolean(
    s.geofencing?.link || s.geofencing?.radius || s.geofencing?.header ||
    s.geofencing?.message || s.geofencing?.exitzone || s.geofencing?.mintimewindow ||
    s.geofencing?.events?.length || s.geofencing?.invisible,
  );
  const [showParticipantZone, setShowParticipantZone] = useState(hasParticipantZoneData);

  /* Geofencing locations */
  const [locations, setLocations] = useState<GeoLocation[]>(
    s.geofencing?.locations ?? [],
  );
  const [newLocationName, setNewLocationName] = useState("");

  /* Pre-fill events/actions from stored data */
  const storedEvents = s.events ?? [];
  const storedActions = s.actions ?? [];

  function getEventValue(num: number, field: "caption" | "url") {
    return storedEvents.find((e) => e.num === num)?.[field] ?? "";
  }
  function getActionValue(num: number, field: "identifier" | "buttonTitle") {
    return storedActions.find((a) => a.num === num)?.[field] ?? "";
  }

  function addLocation() {
    const name = newLocationName.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (locations.find((l) => l.slug === slug)) return;
    setLocations((prev) => [
      ...prev,
      { slug, title: name, latitude: 0, longitude: 0, radius: 100 },
    ]);
    setNewLocationName("");
  }

  /* Serialize locations to JSON before submit */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const built = locations.map((loc) => ({
      slug: loc.slug,
      title: (form.elements.namedItem(`loc-title-${loc.slug}`) as HTMLInputElement)?.value ?? loc.title,
      latitude: parseFloat((form.elements.namedItem(`loc-latitude-${loc.slug}`) as HTMLInputElement)?.value ?? String(loc.latitude)),
      longitude: parseFloat((form.elements.namedItem(`loc-longitude-${loc.slug}`) as HTMLInputElement)?.value ?? String(loc.longitude)),
      radius: parseFloat((form.elements.namedItem(`loc-radius-${loc.slug}`) as HTMLInputElement)?.value ?? String(loc.radius)),
      header: (form.elements.namedItem(`loc-header-${loc.slug}`) as HTMLInputElement)?.value ?? "",
      message: (form.elements.namedItem(`loc-message-${loc.slug}`) as HTMLInputElement)?.value ?? "",
      link: (form.elements.namedItem(`loc-link-${loc.slug}`) as HTMLInputElement)?.value ?? "",
      exitzone: Number((form.elements.namedItem(`loc-exitzone-${loc.slug}`) as HTMLInputElement)?.value ?? 0),
      mintimewindow: Number((form.elements.namedItem(`loc-mintimewindow-${loc.slug}`) as HTMLInputElement)?.value ?? 0),
      events: [
        ...((form.elements.namedItem(`loc-event-enter-${loc.slug}`) as HTMLInputElement)?.checked ? ["enter"] : []),
        ...((form.elements.namedItem(`loc-event-exit-${loc.slug}`) as HTMLInputElement)?.checked ? ["exit"] : []),
      ],
      invisible: (form.elements.namedItem(`loc-invisible-${loc.slug}`) as HTMLInputElement)?.checked ?? false,
    }));
    (form.elements.namedItem("locationsJson") as HTMLInputElement).value = JSON.stringify(built);
  }

  return (
    <form
      ref={formRef}
      action={action}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <input type="hidden" name="locationsJson" value={JSON.stringify(locations)} />

      {/* Notice */}
      {notice && (
        <div style={{ background: "rgba(61,115,107,.1)", border: "1px solid rgba(61,115,107,.25)", borderRadius: "1rem", padding: "1.1rem 1.6rem", fontSize: "1.35rem", color: "var(--sage)" }}>
          {notice}
        </div>
      )}

      {/* Warning */}
      {warning && (
        <div style={{ background: "rgba(214,90,48,.08)", border: "1px solid rgba(214,90,48,.25)", borderRadius: "1rem", padding: "1.1rem 1.6rem", fontSize: "1.35rem", color: "var(--coral)" }}>
          {warning}
        </div>
      )}

      {/* ── 1 · Collaborators ─────────────────────────────────────────────── */}
      <Section title="Collaborators">
        <p style={{ ...hintStyle, margin: 0 }}>
          Enter the email addresses of colleagues you want to share this study with.
          Each address must belong to an account already registered in Samply as a researcher.
          Collaborators can view and edit the notification schedule and see the notification history.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {members.map((email, i) => (
            <div key={i} style={{ display: "flex", gap: "0.8rem" }}>
              <input
                type="email"
                name="members"
                defaultValue={email}
                placeholder="colleague@university.edu"
                style={{ ...inputStyle, flex: 1 }}
              />
              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => setMembers((prev) => prev.filter((_, j) => j !== i))}
                  style={{ padding: "0 1.4rem", background: "none", border: "1px solid var(--ink-20)", borderRadius: "0.8rem", color: "var(--ink-60)", cursor: "pointer", fontSize: "1.6rem", lineHeight: 1 }}
                  aria-label="Remove"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setMembers((prev) => [...prev, ""])}
            style={{ alignSelf: "flex-start", padding: "0.6rem 1.4rem", background: "none", border: "1px solid var(--ink-20)", borderRadius: "9999px", color: "var(--ink-60)", cursor: "pointer", fontSize: "1.25rem", fontFamily: "var(--font-body)" }}
          >
            + Add collaborator
          </button>
        </div>
      </Section>

      {/* ── 2 · Reminders ────────────────────────────────────────────────── */}
      <Section title="Reminders — completion URL">
        <p style={{ ...hintStyle, margin: 0 }}>
          To cancel pending reminders when a participant completes a survey, your survey tool
          must call the completion endpoint below with the{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem" }}>%MESSAGE_ID%</code>{" "}
          placeholder that was passed in the notification link. See{" "}
          <a href="/docs/reminders" target="_blank" rel="noreferrer" style={{ color: "var(--coral)" }}>Reminders</a>{" "}
          for setup instructions per survey tool.
        </p>
        <CopyableUrl
          label="GET — redirect at end of survey"
          url={`${baseUrl}/studies/${project.slug}/done/%MESSAGE_ID%`}
        />
        <CopyableUrl
          label="POST — webhook / server-side"
          url={`${baseUrl}/studies/${project.slug}/done/:messageid`}
        />
      </Section>

      {/* ── 3 · Event-contingent design ───────────────────────────────────── */}
      <Section title="Event-contingent design">
        <Toggle
          id="enableEvents"
          name="enableEvents"
          label="Enable event-contingent design"
          hint="Allow participants to self-initiate a report after a specific event occurs. A permanent link is shown in the app after they join the study."
          checked={showEvents}
          onChange={setShowEvents}
        >
          <div>
            <label style={labelStyle}>Participant-facing instructions</label>
            <p style={hintStyle}>Explain to participants what event they should report and how to use the link in the app.</p>
            <textarea
              name="eventDescription"
              defaultValue={s.eventDescription ?? ""}
              placeholder="Tap the link below each time you experience a stressful event…"
              style={textareaStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Event types (up to 5)</label>
            <p style={hintStyle}>
              Define named events participants can report. Each event gets a caption shown in the app and a URL opened when the participant reports it.
              You can use placeholders in the URL:{" "}
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem" }}>%SAMPLY_ID%</code>,{" "}
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem" }}>%PARTICIPANT_CODE%</code>,{" "}
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem" }}>%GROUP_ID%</code>,{" "}
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", background: "var(--ink-10)", padding: "0.1rem 0.4rem", borderRadius: "0.3rem" }}>%TIMESTAMP%</code>.
            </p>
            <div style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden" }}>
              <div
                className="grid"
                style={{ gridTemplateColumns: "3.2rem 1fr", padding: "0.7rem 1.2rem", background: "var(--ink-10)", fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)" }}
              >
                <span>#</span>
                <span>Caption (shown in app) / URL</span>
              </div>
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  style={{ display: "grid", gridTemplateColumns: "3.2rem 1fr", padding: "0.8rem 1.2rem", gap: "0.6rem", borderTop: "1px solid var(--ink-10)", alignItems: "start" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", paddingTop: "0.9rem" }}>{n}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <input
                      type="text"
                      name={`event-caption-${n}`}
                      defaultValue={getEventValue(n, "caption")}
                      placeholder="e.g. Stressful event"
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      name={`event-url-${n}`}
                      defaultValue={getEventValue(n, "url")}
                      placeholder="https://…"
                      style={{ ...inputStyle, fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Toggle>
      </Section>

      {/* ── 3 · Action buttons ────────────────────────────────────────────── */}
      <Section title="Action buttons">
        <Toggle
          id="enableActions"
          name="enableActions"
          label="Enable action buttons on notifications"
          hint="Show tappable buttons directly on push notifications in the Samply app. Each button sends a distinct identifier to your survey URL."
          checked={showActions}
          onChange={setShowActions}
        >
          <div>
            <p style={{ ...hintStyle, margin: "0 0 1rem" }}>
              Define up to 4 action buttons. The <strong>identifier</strong> is sent as a query parameter when the participant taps the button.
              The <strong>button caption</strong> is the label shown on the notification.
            </p>
            <div style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden" }}>
              <div
                className="grid"
                style={{ gridTemplateColumns: "3.2rem 1fr 1fr", padding: "0.7rem 1.2rem", background: "var(--ink-10)", fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)" }}
              >
                <span>#</span>
                <span>Identifier (sent in URL)</span>
                <span>Button caption (shown on notification)</span>
              </div>
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="grid"
                  style={{ gridTemplateColumns: "3.2rem 1fr 1fr", padding: "0.8rem 1.2rem", gap: "0.8rem", borderTop: "1px solid var(--ink-10)", alignItems: "center" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)" }}>{n}</span>
                  <input
                    type="text"
                    name={`identifier-${n}`}
                    defaultValue={getActionValue(n, "identifier")}
                    placeholder="e.g. button_yes"
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name={`buttonTitle-${n}`}
                    defaultValue={getActionValue(n, "buttonTitle")}
                    placeholder="e.g. Yes"
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          </div>
        </Toggle>
      </Section>

      {/* ── 4 · Webhooks ──────────────────────────────────────────────────── */}
      <Section title="Webhooks">
        <Toggle
          id="enableWebhooks"
          name="enableWebhooks"
          label="Enable webhooks"
          hint="Receive a POST request to your endpoint each time a participant event occurs in this study."
          checked={showWebhooks}
          onChange={setShowWebhooks}
        >
          <div>
            <label style={labelStyle}>Endpoint URL</label>
            <input
              type="url"
              name="webhookEndpoint"
              defaultValue={s.webhookEndpoint ?? ""}
              placeholder="https://yourserver.com/webhook"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ ...labelStyle, marginBottom: "0.8rem" }}>Events to send</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <CheckRow
                id="webhookEvents-study_joined"
                name="webhookEvents-study_joined"
                label="study_joined — participant enrols in the study"
                checked={s.webhookEvents?.includes("study_joined") ?? false}
              />
              <CheckRow
                id="webhookEvents-study_left"
                name="webhookEvents-study_left"
                label="study_left — participant leaves the study"
                checked={s.webhookEvents?.includes("study_left") ?? false}
              />
              <CheckRow
                id="webhookEvents-participant_info_updated"
                name="webhookEvents-participant_info_updated"
                label="participant_info_updated — participant code or group changes"
                checked={s.webhookEvents?.includes("participant_info_updated") ?? false}
              />
            </div>
          </div>
        </Toggle>
      </Section>

      {/* ── 5 · Geofencing ────────────────────────────────────────────────── */}
      <Section title="Geofencing">
        <Toggle
          id="enableGeofencing"
          name="enableGeofencing"
          label="Enable geofencing"
          hint="Trigger notifications when participants enter or leave a defined physical location. Requires participants to grant background location access."
          checked={showGeofencing}
          onChange={setShowGeofencing}
        >
          {/* Instruction */}
          <div>
            <label style={labelStyle}>Instruction shown to participants</label>
            <p style={hintStyle}>Explain why location access is needed and what participants should do.</p>
            <textarea
              name="geofencingInstruction"
              defaultValue={project.geofencingInstruction ?? ""}
              placeholder="This study uses your location to send a notification when you arrive at or leave a specific place. Please allow background location access…"
              style={textareaStyle}
            />
          </div>

          {/* User-defined zone (participant-reported) — accordion */}
          <div
            style={{
              border: "1px solid var(--ink-10)",
              borderRadius: "0.8rem",
              overflow: "hidden",
            }}
          >
            {/* Accordion header */}
            <button
              type="button"
              onClick={() => setShowParticipantZone((v) => !v)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.2rem 1.6rem",
                background: showParticipantZone ? "var(--ink-10)" : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                textAlign: "left",
                gap: "1rem",
              }}
            >
              <div>
                <div style={{ ...labelStyle, margin: 0 }}>Participant-defined zone</div>
                {!showParticipantZone && (
                  <div style={{ ...hintStyle, margin: "0.2rem 0 0", fontSize: "1.1rem" }}>
                    An optional zone defined by the participant (e.g. home or workplace).
                  </div>
                )}
              </div>
              <span style={{ fontSize: "1rem", color: "var(--ink-40)", flexShrink: 0, transition: "transform 150ms", display: "inline-block", transform: showParticipantZone ? "rotate(180deg)" : "rotate(0deg)" }}>
                ▼
              </span>
            </button>

            {/* Accordion body */}
            {showParticipantZone && (
              <div style={{ padding: "1.6rem", borderTop: "1px solid var(--ink-10)", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <p style={{ ...hintStyle, margin: 0 }}>
                  An optional single zone defined by the participant (e.g. their home or workplace).
                  The link below is opened in the browser to let them select it.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <div>
                    <label style={labelStyle}>Zone selection link</label>
                    <input name="geofencingURL" type="text" defaultValue={s.geofencing?.link ?? ""} placeholder="https://maps.yourapp.com/select" style={{ ...inputStyle, fontFamily: "var(--font-mono)", fontSize: "1.2rem" }} />
                  </div>
                  <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                    <div>
                      <label style={labelStyle}>Default radius (m)</label>
                      <input name="userLocationRadius" type="number" defaultValue={s.geofencing?.radius ?? ""} placeholder="100" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Exit zone (m)</label>
                      <input name="userLocationExitzone" type="number" defaultValue={s.geofencing?.exitzone ?? ""} placeholder="0" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Notification header</label>
                      <input name="userLocationHeader" type="text" defaultValue={s.geofencing?.header ?? ""} placeholder="You arrived!" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Notification message</label>
                      <input name="userLocationMessage" type="text" defaultValue={s.geofencing?.message ?? ""} placeholder="Please fill out the survey" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Min time between pings (min)</label>
                      <input name="userLocationMintimewindow" type="number" defaultValue={s.geofencing?.mintimewindow ?? ""} placeholder="0" style={inputStyle} />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.2rem", color: "var(--ink-60)", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name="event-enter"
                      defaultChecked={s.geofencing?.events?.includes("enter") ?? false}
                      style={{ width: "1.3rem", height: "1.3rem", accentColor: "var(--sage)" }}
                    />
                    Trigger on enter
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.2rem", color: "var(--ink-60)", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name="event-exit"
                      defaultChecked={s.geofencing?.events?.includes("exit") ?? false}
                      style={{ width: "1.3rem", height: "1.3rem", accentColor: "var(--sage)" }}
                    />
                    Trigger on exit
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "1.2rem", color: "var(--ink-60)", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name="invisible"
                      defaultChecked={s.geofencing?.invisible ?? false}
                      style={{ width: "1.3rem", height: "1.3rem", accentColor: "var(--sage)" }}
                    />
                    Hidden zone (invisible to participant)
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Researcher-defined locations */}
          <div>
            <label style={{ ...labelStyle, marginBottom: "0.6rem" }}>Researcher-defined locations</label>
            <p style={hintStyle}>
              Fixed locations set by you. Participants will be notified when they enter or leave these zones, without needing to define them.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {locations.map((loc) => (
                <LocationRow
                  key={loc.slug}
                  loc={loc}
                  onDelete={() =>
                    setLocations((prev) => prev.filter((l) => l.slug !== loc.slug))
                  }
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
              <input
                type="text"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
                placeholder="Location name (e.g. Lab, Home)"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={addLocation}
                style={{ padding: "0.9rem 1.6rem", background: "var(--ink)", color: "var(--paper)", border: "none", borderRadius: "0.8rem", fontSize: "1.25rem", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}
              >
                + Add location
              </button>
            </div>
          </div>
        </Toggle>
      </Section>

      {/* Submit */}
      <div style={{ paddingTop: "0.4rem" }}>
        <button
          type="submit"
          style={{ padding: "1.2rem 2.8rem", background: "var(--coral)", color: "#fff", border: "none", borderRadius: "9999px", fontSize: "1.4rem", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-body)" }}
        >
          Save settings
        </button>
      </div>
    </form>
  );
}
