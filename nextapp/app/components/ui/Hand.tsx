interface HandProps {
  children: React.ReactNode;
  size?: number;
  rotate?: number;
  color?: string;
  className?: string;
  block?: boolean;
  style?: React.CSSProperties;
}

export default function Hand({
  children,
  size = 18,
  rotate = 0,
  color = "var(--coral)",
  className = "",
  block = false,
  style,
}: HandProps) {
  return (
    <span
      className={`font-[family-name:var(--font-hand)] leading-[1.1] ${block ? "block" : "inline-block"} ${className}`}
      style={{
        fontSize: size,
        color,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
