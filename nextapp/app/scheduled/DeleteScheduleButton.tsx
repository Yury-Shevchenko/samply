"use client";

import SubmitButton from "@/app/components/ui/SubmitButton";

type ServerAction = (formData?: FormData) => void | Promise<void>;

export function DeleteScheduleButton({
  action,
  label = "Delete schedule",
  confirmMessage = "Delete this notification schedule? All associated jobs and queued notifications will also be deleted. This cannot be undone.",
  style,
}: {
  action: ServerAction;
  label?: string;
  confirmMessage?: string;
  style?: React.CSSProperties;
}) {
  return (
    <form action={action} style={{ display: "inline" }}>
      <SubmitButton
        pendingLabel="Deleting…"
        style={style}
        onClick={(e) => {
          if (!window.confirm(confirmMessage)) e.preventDefault();
        }}
      >
        {label}
      </SubmitButton>
    </form>
  );
}
