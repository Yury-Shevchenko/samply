"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SUPPORTED_LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";
import { useT } from "./TranslationProvider";

interface NavClientProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isParticipant: boolean;
  userName: string;
  signOutAction: (formData: FormData) => Promise<void>;
  setLocaleAction: (formData: FormData) => Promise<void>;
  showDonation: boolean;
  currentLocale: Locale;
}

const Logo = ({ homeHref }: { homeHref: string }) => (
  <a href={homeHref} className="flex items-center gap-[1rem] no-underline">
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

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden style={{ flexShrink: 0, transition: "transform 0.15s", transform: open ? "rotate(180deg)" : undefined }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function LanguageSwitcher({
  currentLocale,
  setLocaleAction,
  pathname,
  inline = false,
}: {
  currentLocale: Locale;
  setLocaleAction: (formData: FormData) => Promise<void>;
  pathname: string;
  inline?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const localeInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const submit = (loc: Locale) => {
    if (loc === currentLocale) { setOpen(false); return; }
    if (localeInputRef.current) localeInputRef.current.value = loc;
    setOpen(false);
    formRef.current?.requestSubmit();
  };

  // Hidden form used by both variants
  const hiddenForm = (
    <form ref={formRef} action={setLocaleAction} style={{ display: "none" }}>
      <input type="hidden" name="returnTo" value={pathname} />
      <input ref={localeInputRef} type="hidden" name="locale" defaultValue={currentLocale} />
    </form>
  );

  // Mobile / inline variant: list options directly without a trigger button
  if (inline) {
    return (
      <>
        {hiddenForm}
        {SUPPORTED_LOCALES.map((loc) => {
          const isActive = loc === currentLocale;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => submit(loc)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                width: "100%",
                padding: "1rem 0",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--ink-10)",
                cursor: isActive ? "default" : "pointer",
                textAlign: "left",
                fontFamily: "var(--font-body)",
                fontSize: "1.5rem",
                color: isActive ? "var(--ink)" : "var(--ink-60)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ink-40)",
                minWidth: "2.6rem",
              }}>
                {loc}
              </span>
              {LOCALE_NAMES[loc]}
              {isActive && (
                <span style={{ marginLeft: "auto", color: "var(--sage)", fontSize: "1.2rem" }}>✓</span>
              )}
            </button>
          );
        })}
      </>
    );
  }

  // Desktop variant: pill button + dropdown
  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {hiddenForm}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Select language"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.45rem 0.85rem",
          borderRadius: "0.6rem",
          border: "1px solid var(--ink-10)",
          background: open ? "var(--surface)" : "transparent",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          color: "var(--ink-60)",
          transition: "background 0.12s, border-color 0.12s",
        }}
        className="hover:border-[var(--ink-20)] hover:bg-[var(--surface)]"
      >
        <GlobeIcon />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink)",
        }}>
          {currentLocale}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + 0.5rem)",
          minWidth: "15rem",
          background: "var(--paper)",
          border: "1px solid var(--ink-10)",
          borderRadius: "0.8rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          overflow: "hidden",
          zIndex: 200,
        }}>
          {SUPPORTED_LOCALES.map((loc) => {
            const isActive = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => submit(loc)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7rem",
                  width: "100%",
                  padding: "0.85rem 1.2rem",
                  background: isActive ? "var(--surface)" : "transparent",
                  border: "none",
                  cursor: isActive ? "default" : "pointer",
                  textAlign: "left",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.3rem",
                  color: isActive ? "var(--ink)" : "var(--ink-70, var(--ink-60))",
                  fontWeight: isActive ? 600 : 400,
                  transition: "background 0.1s",
                }}
                className={isActive ? "" : "hover:bg-[var(--surface)]"}
              >
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink-40)",
                  minWidth: "2.4rem",
                }}>
                  {loc}
                </span>
                {LOCALE_NAMES[loc]}
                {isActive && (
                  <span style={{ marginLeft: "auto", color: "var(--sage)", fontSize: "1.1rem" }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function NavClient({
  isLoggedIn,
  isAdmin,
  isParticipant,
  userName,
  signOutAction,
  setLocaleAction,
  showDonation,
  currentLocale,
}: NavClientProps) {
  const path = usePathname();
  const active = (prefix: string) => path.startsWith(prefix);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useT();

  if (/^\/studies\/[^/]+\/done\//.test(path)) return null;

  const closeMenu = () => setMenuOpen(false);

  const isParticipantPath = path.startsWith("/participant");

  const homeHref = isParticipant
    ? "/participant/home"
    : isParticipantPath && !isLoggedIn
      ? "/participant/login"
      : isLoggedIn ? "/dashboard" : "/";
  const signOutRedirect = isParticipant ? "/participant/login" : "/login";

  return (
    <header
      className="sticky top-0 z-50 bg-[var(--paper)] border-b border-[var(--ink-10)]"
      style={{ backdropFilter: "blur(8px)", position: "relative" }}
    >
      <nav
        className="flex items-center justify-between"
        style={{ padding: "0 var(--nav-px)", height: "6rem" }}
      >
        {/* Left: logo */}
        <Logo homeHref={homeHref} />

        {/* Right: desktop links */}
        <div className="nav-desktop-links">
          {isParticipant ? (
            <>
              <NavLink href="/participant/home"    isActive={active("/participant/home")}>{t("participant.nav.home")}</NavLink>
              <NavLink href="/participant/history" isActive={active("/participant/history")}>{t("participant.nav.history")}</NavLink>
              <a
                href="/account"
                className="font-[family-name:var(--font-body)] font-medium text-[1.3rem] text-[var(--ink)] hover:opacity-70 transition-opacity"
                style={{ color: active("/account") ? "var(--coral)" : undefined }}
              >
                {userName || t("participant.nav.account")}
              </a>
              <form action={signOutAction}>
                <input type="hidden" name="redirectTo" value={signOutRedirect} />
                <button
                  type="submit"
                  className="font-[family-name:var(--font-body)] text-[1.3rem] text-[var(--ink-60)] hover:text-[var(--ink)] transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  {t("participant.nav.signOut")}
                </button>
              </form>
            </>
          ) : isLoggedIn ? (
            <>
              <NavLink href="/dashboard" isActive={active("/dashboard")}>{t("nav.dashboard")}</NavLink>
              <NavLink href="/forum"     isActive={active("/forum")}>{t("nav.forum")}</NavLink>
              <NavLink href="/docs/intro" isActive={active("/docs")}>{t("nav.docs")}</NavLink>
              {isAdmin && (
                <NavLink href="/admin/studies" isActive={active("/admin")}>{t("nav.admin")}</NavLink>
              )}
              {showDonation && <DonateLink label={t("nav.donate")} />}
              <a
                href="/account"
                className="font-[family-name:var(--font-body)] font-medium text-[1.3rem] text-[var(--ink)] hover:opacity-70 transition-opacity"
              >
                {userName || t("nav.dashboard")}
              </a>
              <form action={signOutAction}>
                <input type="hidden" name="redirectTo" value={signOutRedirect} />
                <button
                  type="submit"
                  className="font-[family-name:var(--font-body)] text-[1.3rem] text-[var(--ink-60)] hover:text-[var(--ink)] transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  {t("nav.signOut")}
                </button>
              </form>
            </>
          ) : isParticipantPath ? (
            <>
              <a
                href="/participant/login"
                className="inline-flex items-center justify-center px-[1.4rem] py-[0.8rem] rounded-[999rem] text-[1.2rem] font-medium font-[family-name:var(--font-body)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity"
              >
                {t("participant.nav.signIn")}
              </a>
            </>
          ) : (
            <>
              <NavLink href="/studies"   isActive={active("/studies")}>{t("nav.studies")}</NavLink>
              <NavLink href="/docs/intro" isActive={active("/docs")}>{t("nav.docs")}</NavLink>
              {showDonation && <DonateLink label={t("nav.donate")} />}
              <a
                href="/login"
                className="inline-flex items-center justify-center px-[1.4rem] py-[0.8rem] rounded-[999rem] text-[1.2rem] font-medium font-[family-name:var(--font-body)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity"
              >
                {t("nav.signIn")}
              </a>
            </>
          )}
          <LanguageSwitcher currentLocale={currentLocale} setLocaleAction={setLocaleAction} pathname={path} />
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={menuOpen}
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : undefined }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : undefined }} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
        {isParticipant ? (
          <>
            <a href="/participant/home"    className="nav-mobile-link" style={{ color: active("/participant/home")    ? "var(--coral)" : undefined }} onClick={closeMenu}>{t("participant.nav.home")}</a>
            <a href="/participant/history" className="nav-mobile-link" style={{ color: active("/participant/history") ? "var(--coral)" : undefined }} onClick={closeMenu}>{t("participant.nav.history")}</a>
            <a href="/account"             className="nav-mobile-link" style={{ color: active("/account")             ? "var(--coral)" : undefined }} onClick={closeMenu}>{userName || t("participant.nav.account")}</a>
            <form action={signOutAction} style={{ borderBottom: "none" }}>
              <input type="hidden" name="redirectTo" value={signOutRedirect} />
              <button type="submit" className="nav-mobile-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "1.4rem 0", width: "100%", color: "var(--ink-60)", fontSize: "1.6rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>{t("participant.nav.signOut")}</button>
            </form>
          </>
        ) : isLoggedIn ? (
          <>
            <a href="/dashboard" className="nav-mobile-link" style={{ color: active("/dashboard") ? "var(--coral)" : undefined }} onClick={closeMenu}>{t("nav.dashboard")}</a>
            <a href="/forum"     className="nav-mobile-link" style={{ color: active("/forum")     ? "var(--coral)" : undefined }} onClick={closeMenu}>{t("nav.forum")}</a>
            <a href="/docs/intro" className="nav-mobile-link" style={{ color: active("/docs")    ? "var(--coral)" : undefined }} onClick={closeMenu}>{t("nav.docs")}</a>
            {isAdmin && (
              <a href="/admin/studies" className="nav-mobile-link" style={{ color: active("/admin") ? "var(--coral)" : undefined }} onClick={closeMenu}>{t("nav.admin")}</a>
            )}
            {showDonation && (
              <a href="/donate" className="nav-mobile-link" style={{ color: "var(--coral)" }} onClick={closeMenu}>{t("nav.donate")}</a>
            )}
            <a href="/account" className="nav-mobile-link" onClick={closeMenu}>{userName || t("nav.dashboard")}</a>
            <form action={signOutAction} style={{ borderBottom: "none" }}>
              <input type="hidden" name="redirectTo" value={signOutRedirect} />
              <button type="submit" className="nav-mobile-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "1.4rem 0", width: "100%", color: "var(--ink-60)", fontSize: "1.6rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>{t("nav.signOut")}</button>
            </form>
          </>
        ) : isParticipantPath ? (
          <>
            <a href="/participant/login" className="nav-mobile-link" style={{ color: "var(--coral)", fontWeight: 600 }} onClick={closeMenu}>{t("participant.nav.signIn")}</a>
          </>
        ) : (
          <>
            <a href="/studies"    className="nav-mobile-link" onClick={closeMenu}>{t("nav.studies")}</a>
            <a href="/docs/intro" className="nav-mobile-link" onClick={closeMenu}>{t("nav.docs")}</a>
            {showDonation && (
              <a href="/donate" className="nav-mobile-link" style={{ color: "var(--coral)" }} onClick={closeMenu}>{t("nav.donate")}</a>
            )}
            <a href="/login"     className="nav-mobile-link" style={{ color: "var(--coral)", fontWeight: 600 }} onClick={closeMenu}>{t("nav.signIn")}</a>
            <a href="/register"  className="nav-mobile-link" onClick={closeMenu}>{t("nav.createAccount")}</a>
          </>
        )}
        {/* Language switcher in mobile menu */}
        <div style={{ paddingTop: "0.4rem" }}>
          <LanguageSwitcher currentLocale={currentLocale} setLocaleAction={setLocaleAction} pathname={path} inline />
        </div>
      </div>
    </header>
  );
}

function DonateLink({ label }: { label: string }) {
  return (
    <a
      href="/donate"
      className="inline-flex items-center gap-[0.4rem] px-[1.2rem] py-[0.5rem] rounded-[999rem] text-[1.2rem] font-medium font-[family-name:var(--font-body)] hover:opacity-80 transition-opacity"
      style={{ color: "var(--coral)", border: "1px solid rgba(214,90,48,.3)", background: "rgba(214,90,48,.06)" }}
    >
      {label}
    </a>
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
