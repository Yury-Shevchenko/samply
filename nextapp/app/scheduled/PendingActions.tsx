"use client";

import SubmitButton from "@/app/components/ui/SubmitButton";
import { useT } from "@/app/components/TranslationProvider";

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
      <SubmitButton
        pendingLabel="…"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          letterSpacing: ".04em",
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
      </SubmitButton>
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
  const { t } = useT();
  const isFuture = scheduledFor ? new Date(scheduledFor) > new Date() : false;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      {cancelAction && (status === "pending" || status === "processing" || status === "failed") && (
        <ActionButton
          action={cancelAction}
          label={t("pendingActions.cancel")}
          confirmMessage={t("pendingActions.cancelConfirm")}
          color="var(--ink-60)"
        />
      )}
      {reactivateAction && status === "cancelled" && isFuture && (
        <ActionButton
          action={reactivateAction}
          label={t("pendingActions.reActivate")}
          confirmMessage={t("pendingActions.reActivateConfirm")}
          color="var(--sage)"
        />
      )}
      <ActionButton
        action={deleteAction}
        label={t("pendingActions.delete")}
        confirmMessage={t("pendingActions.deleteConfirm")}
        color="var(--coral)"
      />
    </div>
  );
}
