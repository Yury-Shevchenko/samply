"use client";

export function ConfirmDeleteButton({
  action,
  message = "Delete this permanently? This cannot be undone.",
  label,
}: {
  action: (fd: FormData) => void | Promise<void>;
  message?: string;
  label?: string;
}) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!window.confirm(message)) e.preventDefault();
  }

  if (label) {
    return (
      <form action={action} style={{ margin: 0 }}>
        <button
          type="submit"
          onClick={handleClick}
          style={{
            padding: "0.7rem 1.8rem",
            background: "rgba(214,90,48,.08)",
            border: "1px solid rgba(214,90,48,.3)",
            borderRadius: "9999px",
            color: "var(--coral)",
            fontSize: "1.3rem",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </button>
      </form>
    );
  }

  return (
    <form action={action} style={{ margin: 0 }}>
      <button
        type="submit"
        onClick={handleClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.2rem 0.6rem",
          fontSize: "1.4rem",
          color: "var(--ink-40)",
          borderRadius: "0.4rem",
          lineHeight: 1,
        }}
        title="Delete"
      >
        ×
      </button>
    </form>
  );
}
