import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Study not found — Samply" };

export default async function StudyNotFound() {
  const { t } = await getT();

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4rem 2.4rem" }}
    >
      <div style={{ width: "100%", maxWidth: "44rem" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "3.2rem" }}>
          <a
            href="/"
            className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.2rem", color: "var(--ink)", textDecoration: "none", letterSpacing: "-0.02em" }}
          >
            Samply
          </a>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--ink-10)",
            borderRadius: "1.6rem",
            padding: "3.2rem 3.2rem 2.8rem",
            boxShadow: "0 0.2rem 1.6rem rgba(35,32,26,.06)",
            textAlign: "center",
          }}
        >
          {/* Postcard-like icon */}
          <div
            aria-hidden
            style={{
              width: "4.8rem",
              height: "4.8rem",
              borderRadius: "50%",
              background: "rgba(214,90,48,.08)",
              border: "1px solid rgba(214,90,48,.2)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.8rem",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="13" rx="2" stroke="var(--coral)" strokeWidth="1.8" />
              <path d="M3 9l9 5 9-5" stroke="var(--coral)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 17l3-3M17 17l-3-3" stroke="var(--coral)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>

          <div
            className="font-[family-name:var(--font-script)]"
            style={{ fontSize: "1.5rem", color: "var(--ink-40)", marginBottom: "0.4rem", fontFamily: "var(--font-caveat)" }}
          >
            {t("studyNotFound.eyebrow")}
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "1rem" }}
          >
            {t("studyNotFound.title")}
          </h1>

          <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.4rem", lineHeight: 1.6 }}>
            {t("studyNotFound.body")}
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 2rem",
                background: "var(--coral)",
                color: "#fff",
                borderRadius: "9999px",
                fontSize: "1.35rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              {t("studyNotFound.goHome")}
            </a>
          </div>
        </div>

        <p style={{ marginTop: "1.6rem", fontSize: "1.15rem", color: "var(--ink-40)", textAlign: "center", lineHeight: 1.5 }}>
          {t("studyNotFound.footer")}
        </p>
      </div>
    </main>
  );
}
