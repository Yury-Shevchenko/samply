"use client";

import { useState } from "react";
import type { ProjectFull } from "@/lib/data/projects";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { useT } from "@/app/components/TranslationProvider";

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
      className="proj-section"
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
        className="toggle-label"
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
          className="toggle-switch"
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
        <p className="toggle-hint" style={{ margin: "0.5rem 0 0 5rem", fontSize: "1.2rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
      {checked && children && (
        <div className="toggle-children" style={{ marginTop: "1.4rem", marginLeft: "5rem" }}>{children}</div>
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
  t,
}: {
  currentImage?: string;
  previewUrl: string | null;
  removeImage: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  onCancelNew: () => void;
  t: (key: string) => string;
}) {
  const displayUrl = previewUrl ?? (currentImage && !removeImage ? currentImage : null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("projectForm.imageLabel")}</span>
      <p style={{ margin: "0 0 0.4rem", fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
        {t("projectForm.imageHint")}
      </p>

      <label
        htmlFor="image"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.4rem",
          cursor: "pointer",
          padding: "1.2rem 1.4rem",
          border: "1.5px dashed var(--ink-20)",
          borderRadius: "1rem",
          background: "var(--paper)",
          transition: "border-color 150ms",
        }}
        className="hover:border-[var(--ink-40)] transition-colors"
      >
        {/* Thumbnail or placeholder */}
        <div
          className="image-picker-thumb"
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink-40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
        </div>

        {/* Text + hidden input */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "1.3rem", color: "var(--ink)", fontWeight: 500 }}>
            {displayUrl ? (previewUrl ? t("projectForm.imageSelected") : t("projectForm.imageCurrent")) : t("projectForm.imageChoose")}
          </div>
          <div style={{ fontSize: "1.1rem", color: "var(--ink-40)", marginTop: "0.2rem" }}>
            {t("projectForm.imageTypes")}
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

        {/* Right-side action chip — hidden on narrow screens */}
        <div
          className="image-picker-chip"
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
          {displayUrl ? t("projectForm.imageReplace") : t("projectForm.imageBrowse")}
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
              {t("projectForm.imageCancelSel")}
            </button>
          )}
          {!previewUrl && currentImage && !removeImage && (
            <button
              type="button"
              onClick={onRemove}
              style={{ fontSize: "1.2rem", color: "var(--coral)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)" }}
            >
              {t("projectForm.imageRemove")}
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
  submitLabel,
  cancelHref = "/dashboard",
}: ProjectFormProps) {
  const { t } = useT();
  const s = project.settings ?? {};
  const [showCode, setShowCode] = useState(s.askParticipantCode ?? false);
  const [showGroup, setShowGroup] = useState(s.askParticipantGroup ?? false);
  const [groupEntryMethod, setGroupEntryMethod] = useState<"code" | "list" | "random">(s.groupEntryMethod ?? "code");
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
      <Section title={t("projectForm.sectionIdentity")}>
        <Field label={t("projectForm.nameLabel")} htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={project.name ?? ""}
            required
            placeholder={t("projectForm.namePlaceholder")}
            style={inputStyle}
          />
        </Field>
        <Field
          label={t("projectForm.descLabel")}
          htmlFor="description"
          hint={t("projectForm.descHint")}
        >
          <textarea
            id="description"
            name="description"
            defaultValue={project.description ?? ""}
            placeholder={t("projectForm.descPlaceholder")}
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
          t={t}
        />
      </Section>

      {/* 2 · Participant experience */}
      <Section title={t("projectForm.sectionExperience")}>
        <Field
          label={t("projectForm.consentLabel")}
          htmlFor="welcomeMessage"
        >
          <div style={{ marginBottom: "0.8rem", padding: "1.2rem 1.4rem", background: "rgba(180,130,0,.06)", border: "1px solid rgba(180,130,0,.22)", borderRadius: "0.8rem", fontSize: "1.15rem", color: "var(--ink-60)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.5rem" }}>{t("projectForm.consentNoticeTitle")}</strong>
            <ol style={{ margin: 0, paddingLeft: "1.6rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <li>{t("projectForm.consentNoticeItem1")}</li>
              <li>{t("projectForm.consentNoticeItem2")}</li>
              <li>{t("projectForm.consentNoticeItem3")}</li>
              <li>{t("projectForm.consentNoticeItem4")}</li>
              <li>{t("projectForm.consentNoticeItem5")}</li>
            </ol>
            <p style={{ margin: "0.8rem 0 0" }}>{t("projectForm.consentNoticeFooter")}</p>
          </div>
          <p style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
            {t("projectForm.consentHint")}
          </p>
          <textarea
            id="welcomeMessage"
            name="welcomeMessage"
            defaultValue={project.welcomeMessage ?? ""}
            placeholder={t("projectForm.consentPlaceholder")}
            style={{ ...textareaStyle, minHeight: "12rem" }}
          />
        </Field>
        <Field
          label={t("projectForm.afterJoinLabel")}
          htmlFor="messageAfterJoin"
          hint={t("projectForm.afterJoinHint")}
        >
          <textarea
            id="messageAfterJoin"
            name="messageAfterJoin"
            defaultValue={project.messageAfterJoin ?? ""}
            placeholder={t("projectForm.afterJoinPlaceholder")}
            style={textareaStyle}
          />
        </Field>
        <Field
          label={t("projectForm.completionLabel")}
          htmlFor="completionMessage"
          hint={t("projectForm.completionHint")}
        >
          <textarea
            id="completionMessage"
            name="completionMessage"
            defaultValue={project.completionMessage ?? ""}
            placeholder={t("projectForm.completionPlaceholder")}
            style={textareaStyle}
          />
        </Field>
      </Section>

      {/* 3 · Enrollment options */}
      <Section title={t("projectForm.sectionEnrollment")}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ paddingBottom: "1.6rem" }}>
            <Toggle
              id="askParticipantCode"
              name="askParticipantCode"
              label={t("projectForm.codeToggle")}
              hint={t("projectForm.codeToggleHint")}
              checked={showCode}
              onChange={setShowCode}
            >
              <Field label={t("projectForm.codePromptLabel")} htmlFor="codeMessage">
                <textarea
                  id="codeMessage"
                  name="codeMessage"
                  defaultValue={project.codeMessage ?? ""}
                  placeholder={t("projectForm.codePlaceholder")}
                  style={{ ...textareaStyle, minHeight: "6.4rem" }}
                />
              </Field>
            </Toggle>
          </div>

          <div style={{ height: "1px", background: "var(--ink-10)", marginBottom: "1.6rem" }} />

          <Toggle
            id="askParticipantGroup"
            name="askParticipantGroup"
            label={t("projectForm.groupToggle")}
            hint={t("projectForm.groupToggleHint")}
            checked={showGroup}
            onChange={setShowGroup}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <Field label={t("projectForm.groupMethodLabel")} htmlFor="groupEntryMethod">
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {(["code", "list", "random"] as const).map((method) => (
                    <label
                      key={method}
                      style={{ display: "flex", alignItems: "flex-start", gap: "1rem", cursor: "pointer" }}
                    >
                      <input
                        type="radio"
                        name="groupEntryMethod"
                        value={method}
                        checked={groupEntryMethod === method}
                        onChange={() => setGroupEntryMethod(method)}
                        style={{ marginTop: "0.25rem", accentColor: "var(--sage)", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.5 }}>
                        {method === "code" ? (
                          <>
                            <strong style={{ color: "var(--ink)", display: "block" }}>{t("projectForm.groupMethodCodeTitle")}</strong>
                            {t("projectForm.groupMethodCodeDesc")}
                          </>
                        ) : method === "list" ? (
                          <>
                            <strong style={{ color: "var(--ink)", display: "block" }}>{t("projectForm.groupMethodListTitle")}</strong>
                            {t("projectForm.groupMethodListDesc")}
                          </>
                        ) : (
                          <>
                            <strong style={{ color: "var(--ink)", display: "block" }}>{t("projectForm.groupMethodRandomTitle")}</strong>
                            {t("projectForm.groupMethodRandomDesc")}
                          </>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label={t("projectForm.groupPromptLabel")} htmlFor="groupMessage">
                <textarea
                  id="groupMessage"
                  name="groupMessage"
                  defaultValue={project.groupMessage ?? ""}
                  placeholder={
                    groupEntryMethod === "list"
                      ? t("projectForm.groupPromptListPh")
                      : groupEntryMethod === "random"
                        ? t("projectForm.groupPromptRandomPh")
                        : t("projectForm.groupPromptCodePh")
                  }
                  style={{ ...textareaStyle, minHeight: "6.4rem" }}
                />
              </Field>
            </div>
          </Toggle>
        </div>
      </Section>

      {/* Submit */}
      <div className="flex items-center gap-[1.6rem]" style={{ paddingTop: "0.4rem" }}>
        <SubmitButton
          pendingLabel={t("projectForm.saving")}
          style={{
            padding: "1.2rem 2.8rem",
            background: "var(--coral)",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            fontSize: "1.4rem",
            fontWeight: 500,
            fontFamily: "var(--font-body)",
          }}
        >
          {submitLabel ?? t("projectForm.saveChanges")}
        </SubmitButton>
        <a
          href={cancelHref}
          style={{ fontSize: "1.35rem", color: "var(--ink-60)", textDecoration: "none" }}
          className="hover:opacity-70 transition-opacity"
        >
          {t("projectForm.cancel")}
        </a>
      </div>
    </form>
  );
}
