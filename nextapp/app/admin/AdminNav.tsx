"use client";

import { usePathname } from "next/navigation";

const TABS = [
  { label: "Studies",       href: "/admin/studies" },
  { label: "Users",         href: "/admin/users" },
  { label: "Notifications", href: "/admin/notifications" },
  { label: "Donations",     href: "/admin/donations" },
  { label: "Forum",         href: "/admin/forum" },
  { label: "Testimonials",   href: "/admin/testimonials" },
  { label: "Newsletter",     href: "/admin/newsletter" },
  { label: "Changelog",     href: "/admin/changelog" },
  { label: "Settings",      href: "/admin/settings" },
] as const;

export default function AdminNav() {
  const path = usePathname();

  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1920,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          gap: "2.8rem",
          height: "4.4rem",
        }}
      >
        <span
          className="font-[family-name:var(--font-display)] font-bold"
          style={{ fontSize: "1.3rem", letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.5 }}
        >
          Admin
        </span>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          {TABS.map(({ label, href }) => {
            const isActive = path.startsWith(href);
            return (
              <a
                key={href}
                href={href}
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  padding: "0.5rem 1.2rem",
                  borderRadius: "0.6rem",
                  textDecoration: "none",
                  color: isActive ? "var(--coral)" : "rgba(250,241,222,.6)",
                  background: isActive ? "rgba(214,90,48,.15)" : "transparent",
                  transition: "color 120ms, background 120ms",
                }}
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
