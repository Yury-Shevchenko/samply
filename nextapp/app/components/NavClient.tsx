"use client";

import { usePathname } from "next/navigation";

interface NavClientProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  signOutAction: () => Promise<never>;
  showDonation: boolean;
}

const Logo = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <a href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-[1rem] no-underline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style={{ width: "3rem", height: "3rem", flexShrink: 0 }}>
      <rect width="120" height="120" rx="22" fill="#23201a" />
      <g fill="#d65a30">
        <circle cx="32" cy="40" r="9" />
        <circle cx="58" cy="32" r="9" />
        <circle cx="84" cy="44" r="9" />
        <circle cx="46" cy="68" r="9" />
        <circle cx="78" cy="82" r="9" />
      </g>
    </svg>
    <span
      className="font-[family-name:var(--font-display)] font-bold text-[var(--ink)]"
      style={{ fontSize: "2.2rem", letterSpacing: "-0.02em" }}
    >
      Samply
    </span>
  </a>
);

export default function NavClient({ isLoggedIn, isAdmin, userName, signOutAction, showDonation }: NavClientProps) {
  const path = usePathname();
  const active = (prefix: string) => path.startsWith(prefix);

  if (/^\/studies\/[^/]+\/done\//.test(path)) return null;

  return (
    <header
      className="sticky top-0 z-50 bg-[var(--paper)] border-b border-[var(--ink-10)]"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <nav
        className="flex items-center justify-between"
        style={{ padding: "0 4rem", height: "6rem" }}
      >
        {/* Left: logo */}
        <Logo isLoggedIn={isLoggedIn} />

        {/* Right: links + action */}
        <div className="flex items-center gap-[2.4rem]">
          {isLoggedIn ? (
            <>
              <NavLink href="/dashboard" isActive={active("/dashboard")}>Dashboard</NavLink>
              <NavLink href="/forum" isActive={active("/forum")}>Forum</NavLink>
              <NavLink href="/docs/intro" isActive={active("/docs")}>Docs</NavLink>
              {isAdmin && (
                <NavLink href="/admin/studies" isActive={active("/admin")}>Admin</NavLink>
              )}
              {showDonation && (
                <a
                  href="/donate"
                  className="inline-flex items-center gap-[0.4rem] px-[1.2rem] py-[0.5rem] rounded-[999rem] text-[1.2rem] font-medium font-[family-name:var(--font-body)] hover:opacity-80 transition-opacity"
                  style={{ color: "var(--coral)", border: "1px solid rgba(214,90,48,.3)", background: "rgba(214,90,48,.06)" }}
                >
                  ♥ Donate
                </a>
              )}
              <a
                href="/account"
                className="font-[family-name:var(--font-body)] font-medium text-[1.3rem] text-[var(--ink)] hover:opacity-70 transition-opacity"
              >
                {userName || "Account"}
              </a>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="font-[family-name:var(--font-body)] text-[1.3rem] text-[var(--ink-60)] hover:text-[var(--ink)] transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <NavLink href="/studies" isActive={active("/studies")}>Studies</NavLink>
              <NavLink href="/docs/intro" isActive={active("/docs")}>Docs</NavLink>
              {showDonation && (
                <a
                  href="/donate"
                  className="inline-flex items-center gap-[0.4rem] px-[1.2rem] py-[0.5rem] rounded-[999rem] text-[1.2rem] font-medium font-[family-name:var(--font-body)] hover:opacity-80 transition-opacity"
                  style={{ color: "var(--coral)", border: "1px solid rgba(214,90,48,.3)", background: "rgba(214,90,48,.06)" }}
                >
                  ♥ Donate
                </a>
              )}
              <a
                href="/login"
                className="inline-flex items-center justify-center px-[1.4rem] py-[0.8rem] rounded-[999rem] text-[1.2rem] font-medium font-[family-name:var(--font-body)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity"
              >
                Sign in
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative font-[family-name:var(--font-body)] text-[1.3rem] font-medium text-[var(--ink)] hover:opacity-70 transition-opacity"
      style={{ color: isActive ? "var(--coral)" : undefined }}
    >
      {children}
      {isActive && (
        <span
          className="absolute left-0 right-0 bg-[var(--coral)] rounded-[0.2rem]"
          style={{ bottom: "-0.6rem", height: "0.2rem" }}
        />
      )}
    </a>
  );
}
