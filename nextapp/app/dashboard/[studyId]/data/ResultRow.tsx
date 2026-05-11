"use client";

import { useRouter } from "next/navigation";

export function ResultRow({
  href,
  children,
  style,
  className,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const router = useRouter();
  return (
    <tr
      style={{ ...style, cursor: "pointer" }}
      className={className}
      onClick={() => router.push(href)}
    >
      {children}
    </tr>
  );
}
