"use client";

import { useFormStatus } from "react-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel?: string;
}

export default function SubmitButton({ children, pendingLabel, style, className, ...rest }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      style={{
        ...style,
        opacity: pending ? 0.65 : undefined,
        cursor: pending ? "not-allowed" : (style?.cursor ?? "pointer"),
        position: "relative",
      }}
      className={className}
      {...rest}
    >
      {pending ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6em" }}>
          <svg
            width="1em" height="1em" viewBox="0 0 16 16" fill="none"
            style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}
          >
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
            <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {pendingLabel ?? children}
        </span>
      ) : children}
    </button>
  );
}
