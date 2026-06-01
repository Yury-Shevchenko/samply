import { redirect, notFound } from "next/navigation";
import { AuthError } from "next-auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { signIn } from "@/lib/auth";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Set new password — Samply" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem 1.4rem",
  fontSize: "1.4rem",
  color: "var(--ink)",
  background: "var(--paper)",
  border: "1px solid var(--ink-20)",
  borderRadius: "1rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
};

async function resetAction(token: string, formData: FormData) {
  "use server";
  const expressUrl = process.env.EXPRESS_URL ?? "http://localhost:3000";
  const { t } = await getT();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password-confirm") as string;

  const failUrl = `/account/reset/${token}?error=`;

  if (password !== passwordConfirm) {
    redirect(failUrl + encodeURIComponent(t("resetPassword.passwordsMismatch")));
  }

  // Read the email while the token is still valid — the update below consumes it.
  await connectDB();
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user?.email) {
    redirect(failUrl + encodeURIComponent(t("resetPassword.resetFailed")));
  }

  const res = await fetch(`${expressUrl}/account/reset/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
    },
    body: new URLSearchParams({
      password,
      "password-confirm": passwordConfirm,
    }).toString(),
    redirect: "manual",
  });

  if (res.status !== 302 && res.status !== 301) {
    redirect(failUrl + encodeURIComponent(t("resetPassword.resetFailed")));
  }

  // Password updated — sign the user in with the new credentials so they land
  // on the dashboard already authenticated. signIn throws a redirect on success;
  // on an auth failure fall back to the login page with a success notice.
  try {
    await signIn("credentials", {
      email: user.email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      redirect("/login?notice=" + encodeURIComponent(t("resetPassword.passwordUpdated")));
    }
    throw err;
  }
}

export default async function ResetPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { token } = await params;
  const { error } = await searchParams;
  const { t } = await getT();

  // Reject tokens that don't look like hex(randomBytes(20)) — 40 hex chars.
  if (!/^[0-9a-f]{40}$/i.test(token)) return notFound();

  await connectDB();
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  const boundAction = resetAction.bind(null, token);

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4rem 2.4rem" }}
    >
      <div style={{ width: "100%", maxWidth: "42rem" }}>

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
            overflow: "hidden",
            boxShadow: "0 0.2rem 1.6rem rgba(35,32,26,.06)",
          }}
        >
          {!user ? (
            /* Invalid / expired token */
            <div style={{ padding: "3.6rem 3.2rem", textAlign: "center" }}>
              <div
                style={{
                  width: "5.6rem",
                  height: "5.6rem",
                  borderRadius: "50%",
                  background: "rgba(214,90,48,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 2rem",
                  fontSize: "2.4rem",
                  color: "var(--coral)",
                }}
              >
                ✕
              </div>
              <div
                className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "2rem", letterSpacing: "-0.02em", color: "var(--coral)", marginBottom: "1rem" }}
              >
                {t("resetPassword.linkExpired")}
              </div>
              <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.8rem", lineHeight: 1.6 }}>
                {t("resetPassword.linkExpiredBody")}
              </p>
              <a
                href="/forgot"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1rem 2.8rem",
                  background: "var(--coral)",
                  color: "#fff",
                  borderRadius: "9999px",
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {t("resetPassword.requestNewLink")}
              </a>
            </div>
          ) : (
            /* Valid token — password form */
            <>
              <div style={{ padding: "2.8rem 3.2rem 2rem", borderBottom: "1px solid var(--ink-10)" }}>
                <div
                  className="font-[family-name:var(--font-display)] font-bold"
                  style={{ fontSize: "2rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" }}
                >
                  {t("resetPassword.setNewPassword")}
                </div>
                <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0 }}>
                  {t("resetPassword.setNewPasswordSub")}
                </p>
              </div>

              <form action={boundAction} style={{ padding: "2.4rem 3.2rem 2.8rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                {error && (
                  <div style={{ background: "rgba(214,90,48,.08)", border: "1px solid rgba(214,90,48,.25)", borderRadius: "1rem", padding: "1.1rem 1.6rem", fontSize: "1.35rem", color: "var(--coral)" }}>
                    {error}
                  </div>
                )}

                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("resetPassword.newPassword")}</span>
                  <input
                    type="password"
                    name="password"
                    required
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("resetPassword.confirmPassword")}</span>
                  <input
                    type="password"
                    name="password-confirm"
                    required
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                </label>

                <SubmitButton
                  pendingLabel={t("resetPassword.resetPending")}
                  style={{
                    marginTop: "0.4rem",
                    padding: "1rem 2.4rem",
                    background: "var(--coral)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "9999px",
                    fontSize: "1.35rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-body)",
                    alignSelf: "flex-start",
                  }}
                >
                  {t("resetPassword.resetButton")}
                </SubmitButton>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
