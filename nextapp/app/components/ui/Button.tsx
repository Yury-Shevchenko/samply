import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Kind = "primary" | "inkSolid" | "ghost";
type Size = "sm" | "md" | "lg";

const styles: Record<Kind, string> = {
  primary:  "bg-[var(--coral)] text-white hover:opacity-90",
  inkSolid: "bg-[var(--ink)] text-[var(--paper)] hover:opacity-90",
  ghost:    "bg-transparent text-[var(--ink)] border border-[var(--ink-20)] hover:bg-[var(--ink-10)]",
};

const sizes: Record<Size, string> = {
  sm: "px-[14px] py-[8px] text-[12px]",
  md: "px-[22px] py-[13px] text-[14px]",
  lg: "px-[28px] py-[16px] text-[15px]",
};

interface BaseProps {
  kind?: Kind;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type Props = ButtonProps | AnchorProps;

export default function Button({ kind = "primary", size = "md", className = "", children, ...rest }: Props) {
  const base = `inline-flex items-center justify-center rounded-[999px] font-medium font-[family-name:var(--font-body)] transition-all duration-[50ms] cursor-pointer leading-none ${styles[kind]} ${sizes[size]} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return <a href={href} className={base} {...anchorRest}>{children}</a>;
  }
  return <button className={base} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
