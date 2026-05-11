"use client";

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
      <button
        type="submit"
        style={style}
        onClick={(e) => {
          if (!window.confirm(confirmMessage)) e.preventDefault();
        }}
      >
        {label}
      </button>
    </form>
  );
}
