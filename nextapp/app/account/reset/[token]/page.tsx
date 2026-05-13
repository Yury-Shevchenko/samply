import { redirect, notFound } from "next/navigation";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import SubmitButton from "@/app/components/ui/SubmitButton";

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
  const expressUrl = process.env.EXPRESS_URL ?? "http://localhost";

  const res = await fetch(`${expressUrl}/account/reset/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      password: formData.get("password") as string,
      "password-confirm": formData.get("password-confirm") as string,
    }).toString(),
    redirect: "manual",
  });

  if (res.status === 302 || res.status === 301) {
    redirect("/login?notice=" + encodeURIComponent("Password updated. Please log in."));
  }
  redirect(`/account/reset/${token}?error=` + encodeURIComponent("Reset failed. The link may have expired."));
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
                Link expired
              </div>
              <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.8rem", lineHeight: 1.6 }}>
                This password reset link is invalid or has expired. Request a new one.
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
                Request new link
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
                  Set new password
                </div>
                <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0 }}>
                  Choose a strong password for your account.
                </p>
              </div>

              <form action={boundAction} style={{ padding: "2.4rem 3.2rem 2.8rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                {error && (
                  <div style={{ background: "rgba(214,90,48,.08)", border: "1px solid rgba(214,90,48,.25)", borderRadius: "1rem", padding: "1.1rem 1.6rem", fontSize: "1.35rem", color: "var(--coral)" }}>
                    {error}
                  </div>
                )}

                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>New password</span>
                  <input
                    type="password"
                    name="password"
                    required
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>Confirm new password</span>
                  <input
                    type="password"
                    name="password-confirm"
                    required
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                </label>

                <SubmitButton
                  pendingLabel="Resetting…"
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
                  Reset password
                </SubmitButton>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
