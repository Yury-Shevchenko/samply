import { redirect } from "next/navigation";

export const metadata = { title: "Reset password — Samply" };

async function forgotAction(formData: FormData) {
  "use server";
  const expressUrl = process.env.EXPRESS_URL ?? "http://localhost";
  const expressPublicHost =
    process.env.EXPRESS_PUBLIC_HOST ??
    (() => { try { return new URL(process.env.NEXTAUTH_URL ?? "").hostname; } catch { return "localhost"; } })();

  await fetch(`${expressUrl}/account/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
      "Host": expressPublicHost,
    },
    body: new URLSearchParams({ email: formData.get("email") as string }).toString(),
    redirect: "manual",
  });

  redirect("/forgot?sent=1");
}

export default async function ForgotPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--paper)", padding: "4rem 2rem" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "42rem",
          background: "var(--surface)",
          border: "1px solid var(--ink-10)",
          borderRadius: "1.6rem",
          padding: "4rem var(--page-px) 3.6rem",
          boxShadow: "0 0.2rem 1.6rem rgba(35,32,26,.06)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-[10px]" style={{ marginBottom: "2.8rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style={{ width: "3.2rem", height: "3.2rem", flexShrink: 0 }}>
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
            className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "2.2rem", color: "var(--ink)", letterSpacing: "-0.02em" }}
          >
            Samply
          </span>
        </div>

        {sent ? (
          /* Success state */
          <div>
            <div
              style={{
                width: "4.4rem",
                height: "4.4rem",
                borderRadius: "50%",
                background: "rgba(61,115,107,.12)",
                border: "1px solid rgba(61,115,107,.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
                fontSize: "2rem",
              }}
            >
              ✉
            </div>
            <h1
              className="font-[family-name:var(--font-display)] font-bold m-0"
              style={{ fontSize: "2.4rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "1rem" }}
            >
              Check your inbox
            </h1>
            <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", margin: "0 0 2.8rem", lineHeight: 1.55 }}>
              If an account exists for that address, a password reset link is on its way.
              It may take a minute or two.
            </p>
            <a
              href="/login"
              className="inline-flex items-center font-medium transition-opacity hover:opacity-70"
              style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none" }}
            >
              ← Back to sign in
            </a>
          </div>
        ) : (
          /* Request form */
          <div>
            <h1
              className="font-[family-name:var(--font-display)] font-bold m-0"
              style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" }}
            >
              Forgot your password?
            </h1>
            <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.8rem" }}>
              Enter your email and we&apos;ll send a reset link.
            </p>

            <form action={forgotAction} className="flex flex-col gap-[10px]">
              <label className="flex flex-col gap-[5px]">
                <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@university.edu"
                  required
                  autoComplete="email"
                  style={inputStyle}
                />
              </label>

              <button
                type="submit"
                className="font-[family-name:var(--font-body)] font-medium transition-opacity hover:opacity-90"
                style={{
                  marginTop: "0.8rem",
                  width: "100%",
                  padding: "1.3rem",
                  background: "var(--coral)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "9999px",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                }}
              >
                Send reset link →
              </button>
            </form>

            <p style={{ margin: "2.2rem 0 0", fontSize: "1.3rem", color: "var(--ink-60)", textAlign: "center" }}>
              <a href="/login" style={{ color: "var(--ink)", fontWeight: 500, textDecoration: "none" }}>
                ← Back to sign in
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.1rem 1.4rem",
  fontSize: "1.4rem",
  color: "var(--ink)",
  background: "var(--paper)",
  border: "1px solid var(--ink-20)",
  borderRadius: "1rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
};
