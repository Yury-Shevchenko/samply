"use client";

type ServerAction = (formData?: FormData) => void | Promise<void>;

interface ActionButtonProps {
  action: ServerAction;
  label: string;
  confirmMessage: string;
  color?: string;
}

function ActionButton({ action, label, confirmMessage, color = "var(--ink-60)" }: ActionButtonProps) {
  const isDestructive = color === "var(--coral)";
  return (
    <form action={action} style={{ display: "inline" }}>
      <button
        type="submit"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          letterSpacing: ".04em",
          cursor: "pointer",
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          color,
          background: isDestructive ? "rgba(214,90,48,.08)" : "var(--ink-10)",
          border: `1px solid ${isDestructive ? "rgba(214,90,48,.25)" : "var(--ink-20)"}`,
          whiteSpace: "nowrap",
        }}
        onClick={(e) => {
          if (!window.confirm(confirmMessage)) e.preventDefault();
        }}
      >
        {label}
      </button>
    </form>
  );
}

export function PendingActions({
  status,
  scheduledFor,
  deleteAction,
  cancelAction,
  reactivateAction,
}: {
  status: string;
  scheduledFor?: Date | string;
  deleteAction: ServerAction;
  cancelAction?: ServerAction;
  reactivateAction?: ServerAction;
}) {
  const isFuture = scheduledFor ? new Date(scheduledFor) > new Date() : false;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      {cancelAction && (status === "pending" || status === "processing" || status === "failed") && (
        <ActionButton
          action={cancelAction}
          label="cancel"
          confirmMessage="Cancel this notification? It can be re-activated later if it hasn't fired yet."
          color="var(--ink-60)"
        />
      )}
      {reactivateAction && status === "cancelled" && isFuture && (
        <ActionButton
          action={reactivateAction}
          label="re-activate"
          confirmMessage="Re-activate this notification?"
          color="var(--sage)"
        />
      )}
      <ActionButton
        action={deleteAction}
        label="delete"
        confirmMessage="Permanently delete this notification? This cannot be undone."
        color="var(--coral)"
      />
    </div>
  );
}
