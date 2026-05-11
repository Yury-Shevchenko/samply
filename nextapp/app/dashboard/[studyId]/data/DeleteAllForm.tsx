"use client";

export function DeleteAllForm({
  action,
  count,
}: {
  action: () => Promise<void>;
  count: number;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete all ${count.toLocaleString()} records? This cannot be undone.`))
          e.preventDefault();
      }}
    >
      <button
        type="submit"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.1rem",
          letterSpacing: ".06em",
          padding: "0.9rem 1.8rem",
          borderRadius: "9999px",
          border: "1px solid rgba(214,90,48,.35)",
          background: "rgba(214,90,48,.07)",
          color: "var(--coral)",
          cursor: "pointer",
          flexShrink: 0,
        }}
        className="hover:opacity-70 transition-opacity"
      >
        Delete all records →
      </button>
    </form>
  );
}
