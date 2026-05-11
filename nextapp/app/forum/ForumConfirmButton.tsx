"use client";

export function ForumConfirmButton({
  action,
  message,
  children,
  style,
}: {
  action: (fd: FormData) => void | Promise<void>;
  message: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <form action={action} style={{ display: "inline" }}>
      <button
        type="submit"
        style={style}
        className="hover:opacity-70 transition-opacity"
        onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }}
      >
        {children}
      </button>
    </form>
  );
}
