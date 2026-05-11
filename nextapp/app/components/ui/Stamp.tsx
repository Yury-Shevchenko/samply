interface StampProps {
  size?: number;
  label?: string;
  sub?: string;
  rotate?: number;
  className?: string;
}

export default function Stamp({ size = 56, label = "!", sub = "samply", rotate = -8, className = "" }: StampProps) {
  return (
    <div
      className={`relative rounded-full border-[1.5px] border-[var(--coral)] text-[var(--coral)] flex flex-col items-center justify-center font-[family-name:var(--font-display)] font-bold flex-shrink-0 ${className}`}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="absolute rounded-full border border-dashed border-[var(--coral)] opacity-60"
        style={{ inset: 4 }}
      />
      <div style={{ fontSize: size * 0.28, lineHeight: 1 }}>{label}</div>
      {sub && (
        <div
          className="uppercase tracking-[0.12em] opacity-85 mt-[2px]"
          style={{ fontSize: size * 0.13 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
