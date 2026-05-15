import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { auth } from "@/lib/auth";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Email confirmation — Samply" };

export default async function ConfirmEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const session = await auth();
  const { t } = await getT();

  await connectDB();
  const user = await User.findOne({
    confirmEmailToken: token,
    confirmEmailExpires: { $gt: Date.now() },
  });

  const success = !!user;
  const email = user?.email as string | undefined;
  const name = user?.name as string | undefined;

  if (user) {
    user.emailIsConfirmed = true;
    user.confirmEmailToken = undefined;
    user.confirmEmailExpires = undefined;
    await user.save();
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4rem 2.4rem" }}
    >
      <div style={{ width: "100%", maxWidth: "40rem" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "3.6rem" }}>
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
            borderRadius: "2rem",
            boxShadow: "0 0.2rem 2.4rem rgba(35,32,26,.07)",
            padding: "4rem 3.6rem 3.6rem",
            textAlign: "center",
          }}
        >
          {success ? (
            <>
              {/* Success icon */}
              <div style={{ position: "relative", display: "inline-flex", marginBottom: "2rem" }}>
                <div
                  style={{
                    width: "7.2rem",
                    height: "7.2rem",
                    borderRadius: "50%",
                    background: "rgba(61,115,107,.12)",
                    border: "2px solid rgba(61,115,107,.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M7 16.5L13 22.5L25 10"
                      stroke="var(--sage)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Handwritten accent */}
              <div
                className="font-[family-name:var(--font-hand)]"
                style={{ fontSize: "1.8rem", color: "var(--sage)", marginBottom: "0.6rem", opacity: 0.8 }}
              >
                {t("confirmEmail.allSet")}
              </div>

              <div
                className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "2.2rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "1.2rem" }}
              >
                {t("confirmEmail.title")}
              </div>

              {/* Email pill */}
              {email && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    background: "rgba(61,115,107,.08)",
                    border: "1px solid rgba(61,115,107,.2)",
                    borderRadius: "9999px",
                    padding: "0.4rem 1.4rem",
                    marginBottom: "1.6rem",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="2.5" width="10" height="7" rx="1.5" stroke="var(--sage)" strokeWidth="1.2"/>
                    <path d="M1 4l5 3.5L11 4" stroke="var(--sage)" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: "1.25rem", color: "var(--sage)", fontWeight: 500 }}>{email}</span>
                </div>
              )}

              <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.8rem", lineHeight: 1.65 }}>
                {name ? `${t("confirmEmail.welcomeName", { name })} ` : ""}
                {session ? t("confirmEmail.sessionBody") : t("confirmEmail.noSessionBody")}
              </p>

              <a
                href={session ? "/dashboard" : "/login"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "1.1rem 3.2rem",
                  background: "var(--coral)",
                  color: "#fff",
                  borderRadius: "9999px",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                {session ? t("confirmEmail.toDashboard") : t("confirmEmail.toLogin")}
              </a>
            </>
          ) : (
            <>
              {/* Error icon */}
              <div
                style={{
                  width: "7.2rem",
                  height: "7.2rem",
                  borderRadius: "50%",
                  background: "rgba(214,90,48,.1)",
                  border: "2px solid rgba(214,90,48,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 2rem",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 8v7M14 19.5v.5"
                    stroke="var(--coral)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12.3 3.8a2 2 0 013.4 0l9.8 16.8A2 2 0 0123.8 23H4.2a2 2 0 01-1.7-2.4L12.3 3.8z"
                    stroke="var(--coral)"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div
                className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "2.2rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "1.2rem" }}
              >
                {t("confirmEmail.expiredTitle")}
              </div>

              <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.8rem", lineHeight: 1.65 }}>
                {t("confirmEmail.expiredBody")}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "center" }}>
                <a
                  href="/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    padding: "1.1rem 3.2rem",
                    background: "var(--coral)",
                    color: "#fff",
                    borderRadius: "9999px",
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("confirmEmail.loginButton")}
                </a>
                <a
                  href="/account"
                  style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
                  className="hover:opacity-70 transition-opacity"
                >
                  {t("confirmEmail.toAccountSettings")}
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "2.4rem" }}>
          <a
            href="/"
            style={{ fontSize: "1.25rem", color: "var(--ink-40)", textDecoration: "none" }}
            className="hover:opacity-70 transition-opacity"
          >
            samply.uni-konstanz.de
          </a>
        </div>
      </div>
    </main>
  );
}
