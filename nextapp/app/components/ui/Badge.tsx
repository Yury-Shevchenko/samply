type Variant = "live" | "draft" | "attention";

const variants: Record<Variant, { label: string; className: string }> = {
  live:      { label: "● live",  className: "text-[var(--sage)] border-[var(--sage)]" },
  draft:     { label: "draft",   className: "text-[var(--ink-60)] border-[var(--ink-20)]" },
  attention: { label: "!",       className: "text-[var(--coral)] border-[var(--coral)]" },
};

interface BadgeProps {
  variant: Variant;
  label?: string;
  className?: string;
}

export default function Badge({ variant, label, className = "" }: BadgeProps) {
  const v = variants[variant];
  return (
    <span
      className={`text-[11px] font-semibold px-[10px] py-[3px] rounded-[999px] border whitespace-nowrap font-[family-name:var(--font-body)] ${v.className} ${className}`}
    >
      {label ?? v.label}
    </span>
  );
}
