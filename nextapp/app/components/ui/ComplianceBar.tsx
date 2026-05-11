interface ComplianceBarProps {
  value: number; // 0–100
  className?: string;
}

export default function ComplianceBar({ value, className = "" }: ComplianceBarProps) {
  const isLow = value < 60;
  const fill = isLow ? "var(--coral)" : "var(--sage)";
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-[6px] rounded-[999px] bg-[var(--ink-10)] overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-[999px] transition-[width] duration-[600ms] ease-out"
        style={{ width: `${pct}%`, background: fill }}
      />
    </div>
  );
}
