"use client";

import { useState } from "react";
import type { ProjectFull } from "@/lib/data/projects";

interface ProjectFormProps {
  project?: Partial<ProjectFull>;
  action: (formData: FormData) => Promise<void> | void;
  submitLabel?: string;
  cancelHref?: string;
}

/* ── Shared input styles ─────────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem 1.4rem",
  fontSize: "1.4rem",
  color: "var(--ink)",
  background: "var(--paper)",
  border: "1px solid var(--ink-20)",
  borderRadius: "1rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "8rem",
  lineHeight: 1.55,
};

/* ── Sub-components ──────────────────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderRadius: "1.2rem",
        padding: "2.4rem 2.6rem",
      }}
    >
      <div
        style={{
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "var(--ink-40)",
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label htmlFor={htmlFor} style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>
        {label}
      </label>
      {hint && (
        <p style={{ margin: "0 0 0.4rem", fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

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
      <label
        htmlFor={id}
        style={{ display: "flex", alignItems: "center", gap: "1.2rem", cursor: "pointer" }}
      >
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
      {hint && (
        <p style={{ margin: "0.5rem 0 0 5rem", fontSize: "1.2rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
      {checked && children && (
        <div style={{ marginTop: "1.4rem", marginLeft: "5rem" }}>{children}</div>
      )}
    </div>
  );
}

/* ── Image picker ────────────────────────────────────────────────────────── */
function ImagePicker({
  currentImage,
  previewUrl,
  removeImage,
  onFileChange,
  onRemove,
  onCancelNew,
}: {
  currentImage?: string;
  previewUrl: string | null;
  removeImage: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  onCancelNew: () => void;
}) {
  const displayUrl = previewUrl ?? (currentImage && !removeImage ? currentImage : null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>Study image</span>
      <p style={{ margin: "0 0 0.4rem", fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
        Displayed next to your study in the app and on the public studies page.
      </p>

      <label
        htmlFor="image"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.6rem",
          cursor: "pointer",
          padding: "1.2rem 1.6rem",
          border: `1.5px dashed ${displayUrl ? "var(--ink-20)" : "var(--ink-20)"}`,
          borderRadius: "1rem",
          background: "var(--paper)",
          transition: "border-color 150ms",
        }}
        className="hover:border-[var(--ink-40)] transition-colors"
      >
        {/* Thumbnail or placeholder */}
        <div
          style={{
            width: "7.2rem",
            height: "5.4rem",
            borderRadius: "0.6rem",
            flexShrink: 0,
            overflow: "hidden",
            background: "var(--ink-10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {displayUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayUrl}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink-40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
        </div>

        {/* Text + hidden input */}
        <div style={{ flex: 1 }}>
          {displayUrl ? (
            <div style={{ fontSize: "1.3rem", color: "var(--ink)", fontWeight: 500 }}>
              {previewUrl ? "Image selected" : "Current image"}
            </div>
          ) : (
            <div style={{ fontSize: "1.3rem", color: "var(--ink)", fontWeight: 500 }}>
              Choose image
            </div>
          )}
          <div style={{ fontSize: "1.1rem", color: "var(--ink-40)", marginTop: "0.2rem" }}>
            JPG, PNG or GIF
          </div>
        </div>

        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpeg,image/png,image/gif"
          onChange={onFileChange}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        />

        {/* Right-side action chip */}
        <div
          style={{
            flexShrink: 0,
            padding: "0.5rem 1.2rem",
            border: "1px solid var(--ink-20)",
            borderRadius: "9999px",
            fontSize: "1.2rem",
            color: "var(--ink-60)",
            background: "var(--surface)",
            pointerEvents: "none",
          }}
        >
          {displayUrl ? "Replace" : "Browse"}
        </div>
      </label>

      {/* Actions below the picker */}
      {(previewUrl || (currentImage && !removeImage)) && (
        <div style={{ display: "flex", gap: "1.2rem", paddingLeft: "0.4rem" }}>
          {previewUrl && (
            <button
              type="button"
              onClick={onCancelNew}
              style={{ fontSize: "1.2rem", color: "var(--ink-60)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)" }}
            >
              Cancel selection
            </button>
          )}
          {!previewUrl && currentImage && !removeImage && (
            <button
              type="button"
              onClick={onRemove}
              style={{ fontSize: "1.2rem", color: "var(--coral)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)" }}
            >
              Remove image
            </button>
          )}
        </div>
      )}

      {/* Hidden field to signal removal */}
      {removeImage && <input type="hidden" name="removeImage" value="on" />}
    </div>
  );
}

/* ── Main form ───────────────────────────────────────────────────────────── */
export default function ProjectForm({
  project = {},
  action,
  submitLabel = "Save",
  cancelHref = "/dashboard",
}: ProjectFormProps) {
  const s = project.settings ?? {};
  const [showCode, setShowCode] = useState(s.askParticipantCode ?? false);
  const [showGroup, setShowGroup] = useState(s.askParticipantGroup ?? false);
  const [removeImage, setRemoveImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    if (file) setRemoveImage(false);
  }

  function handleCancelNew() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    const input = document.getElementById("image") as HTMLInputElement | null;
    if (input) input.value = "";
  }

  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>

      {/* 1 · Study identity */}
      <Section title="Study identity">
        <Field label="Study name *" htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={project.name ?? ""}
            required
            placeholder="e.g. Daily Mood Study 2025"
            style={inputStyle}
          />
        </Field>
        <Field
          label="Description"
          htmlFor="description"
          hint="Brief overview shown to participants in the app and on the public studies page."
        >
          <textarea
            id="description"
            name="description"
            defaultValue={project.description ?? ""}
            placeholder="Tell participants what the study is about, how long it lasts, and how often they will receive notifications…"
            style={textareaStyle}
          />
        </Field>

        <ImagePicker
          currentImage={project.image}
          previewUrl={previewUrl}
          removeImage={removeImage}
          onFileChange={handleImageChange}
          onRemove={() => { setRemoveImage(true); setPreviewUrl(null); }}
          onCancelNew={handleCancelNew}
        />
      </Section>

      {/* 2 · Participant experience */}
      <Section title="Participant experience">
        <Field
          label="Consent form"
          htmlFor="welcomeMessage"
        >
          <div style={{ marginBottom: "0.8rem", padding: "1.2rem 1.4rem", background: "rgba(180,130,0,.06)", border: "1px solid rgba(180,130,0,.22)", borderRadius: "0.8rem", fontSize: "1.15rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.5rem" }}>For health-related human subject research, this consent text must include:</strong>
            <ol style={{ margin: 0, paddingLeft: "1.6rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <li>The nature, purpose, and duration of the research</li>
              <li>The procedures, risks, and expected benefits to participants</li>
              <li>How data will be handled, kept confidential, and whether it will be shared with third parties</li>
              <li>A contact point for participant questions</li>
              <li>How participants can withdraw from the study</li>
            </ol>
            <p style={{ margin: "0.8rem 0 0" }}>Only publish studies once this information is complete and reviewed. If consent is obtained outside the app, only participants who have already completed that external consent process may be invited — use individual invitation links or codes so that only previously consented participants can join.</p>
          </div>
          <p style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
            Displayed when participants tap &apos;Join the study&apos; in the app. Required for public studies.
          </p>
          <textarea
            id="welcomeMessage"
            name="welcomeMessage"
            defaultValue={project.welcomeMessage ?? ""}
            placeholder="Welcome to our study! By joining, you agree to…"
            style={{ ...textareaStyle, minHeight: "12rem" }}
          />
        </Field>
        <Field
          label="Message after joining"
          htmlFor="messageAfterJoin"
          hint="Shown immediately after a participant taps 'Join'. Use it to confirm enrolment and set expectations for the first notification."
        >
          <textarea
            id="messageAfterJoin"
            name="messageAfterJoin"
            defaultValue={project.messageAfterJoin ?? ""}
            placeholder="Thank you for joining! You will receive your first notification tomorrow at 9 am…"
            style={textareaStyle}
          />
        </Field>
        <Field
          label="Completion message"
          htmlFor="completionMessage"
          hint="Displayed to participants after they complete a survey or task — relevant when you redirect participants to a Samply completion URL to register the completion event."
        >
          <textarea
            id="completionMessage"
            name="completionMessage"
            defaultValue={project.completionMessage ?? ""}
            placeholder="Thank you! Your response has been recorded. The study has ended."
            style={textareaStyle}
          />
        </Field>
      </Section>

      {/* 3 · Enrollment options */}
      <Section title="Enrollment options">
        <Toggle
          id="askParticipantCode"
          name="askParticipantCode"
          label="Ask participants to enter an individual participant code"
          hint="Useful for linking app participants to external datasets or counterbalancing conditions."
          checked={showCode}
          onChange={setShowCode}
        >
          <Field label="Code prompt message" htmlFor="codeMessage">
            <textarea
              id="codeMessage"
              name="codeMessage"
              defaultValue={project.codeMessage ?? ""}
              placeholder="Please enter the code provided by the researcher."
              style={{ ...textareaStyle, minHeight: "6.4rem" }}
            />
          </Field>
        </Toggle>

        <Toggle
          id="askParticipantGroup"
          name="askParticipantGroup"
          label="Ask participants to select a group code"
          hint="Useful for between-subjects designs where participants are assigned to different conditions."
          checked={showGroup}
          onChange={setShowGroup}
        >
          <Field label="Group prompt message" htmlFor="groupMessage">
            <textarea
              id="groupMessage"
              name="groupMessage"
              defaultValue={project.groupMessage ?? ""}
              placeholder="Please enter the group code assigned to you by the researcher."
              style={{ ...textareaStyle, minHeight: "6.4rem" }}
            />
          </Field>
        </Toggle>
      </Section>

      {/* Submit */}
      <div className="flex items-center gap-[1.6rem]" style={{ paddingTop: "0.4rem" }}>
        <button
          type="submit"
          style={{
            padding: "1.2rem 2.8rem",
            background: "var(--coral)",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            fontSize: "1.4rem",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          {submitLabel}
        </button>
        <a
          href={cancelHref}
          style={{ fontSize: "1.35rem", color: "var(--ink-60)", textDecoration: "none" }}
          className="hover:opacity-70 transition-opacity"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
