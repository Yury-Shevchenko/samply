interface CardProps {
  children: React.ReactNode;
  tilt?: number;
  pad?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Card({ children, tilt = 0, pad = "1.8rem", className = "", style }: CardProps) {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--ink-10)] rounded-[0.6rem] relative ${className}`}
      style={{
        padding: pad,
        boxShadow: "0 1px 0 rgba(0,0,0,.03), 0 12px 24px rgba(60,40,20,.06)",
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
