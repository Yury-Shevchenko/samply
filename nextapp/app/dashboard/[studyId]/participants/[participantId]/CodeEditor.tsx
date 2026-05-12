"use client";

import { useRef, useState } from "react";
import SubmitButton from "@/app/components/ui/SubmitButton";

interface Props {
  current: string | null | undefined;
  action: (formData: FormData) => Promise<void>;
}

export default function CodeEditor({ current, action }: Props) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function startEdit() {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function cancel() {
    setEditing(false);
    if (inputRef.current) inputRef.current.value = current ?? "";
  }

  return (
    <div style={{ display: "flex", gap: "1.6rem", alignItems: "center", padding: "0.9rem 0", borderBottom: "1px solid var(--ink-10)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-40)", flexShrink: 0, width: "11rem" }}>
        Code
      </span>

      {editing ? (
        <form
          action={action}
          onSubmit={() => setEditing(false)}
          style={{ display: "flex", alignItems: "center", gap: "0.8rem", flex: 1 }}
        >
          <input
            ref={inputRef}
            type="text"
            name="code"
            defaultValue={current ?? ""}
            placeholder="e.g. P001"
            style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink)", background: "var(--paper)", border: "1px solid var(--coral)", borderRadius: "0.5rem", padding: "0.4rem 0.8rem", outline: "none", width: "14rem", boxShadow: "0 0 0 3px rgba(214,90,48,.12)" }}
          />
          <SubmitButton
            pendingLabel="Saving…"
            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".06em", color: "#fff", background: "var(--coral)", border: "none", borderRadius: "9999px", padding: "0.4rem 1.2rem" }}
            className="hover:opacity-90 transition-opacity"
          >
            Save
          </SubmitButton>
          <button
            type="button"
            onClick={cancel}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".06em", color: "var(--ink-40)", background: "transparent", border: "1px solid var(--ink-20)", borderRadius: "9999px", padding: "0.4rem 1.1rem", cursor: "pointer" }}
            className="hover:opacity-70 transition-opacity"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flex: 1 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: current ? "var(--ink-60)" : "var(--ink-20)" }}>
            {current ?? "—"}
          </span>
          <button
            type="button"
            onClick={startEdit}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".06em", color: "var(--ink-40)", background: "transparent", border: "1px solid var(--ink-20)", borderRadius: "9999px", padding: "0.3rem 1rem", cursor: "pointer" }}
            className="hover:opacity-70 transition-opacity"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
