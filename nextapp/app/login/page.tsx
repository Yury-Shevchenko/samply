import { redirect } from "next/navigation";
import { signIn, auth } from "@/lib/auth";
import { AuthError } from "next-auth";

export const metadata = { title: "Log in — Samply" };

async function loginAction(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      redirect(`/login?error=${encodeURIComponent("Invalid email or password.")}`);
    }
    throw err;
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/dashboard");

  const { error, notice } = await searchParams;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--paper)", padding: "4rem 2rem" }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "42rem",
          background: "var(--surface)",
          border: "1px solid var(--ink-10)",
          borderRadius: "1.6rem",
          padding: "4rem 4rem 3.6rem",
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

        {/* Heading */}
        <h1
          className="font-[family-name:var(--font-display)] font-bold m-0"
          style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" }}
        >
          Welcome back
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.8rem" }}>
          Sign in to your researcher account.
        </p>

        {/* Notices */}
        {notice && (
          <div
            style={{
              background: "rgba(61,115,107,.1)",
              border: "1px solid rgba(61,115,107,.25)",
              borderRadius: "0.8rem",
              padding: "1rem 1.4rem",
              marginBottom: "1.8rem",
              fontSize: "1.3rem",
              color: "var(--sage)",
            }}
          >
            {notice}
          </div>
        )}
        {error && (
          <div
            style={{
              background: "rgba(214,90,48,.08)",
              border: "1px solid rgba(214,90,48,.25)",
              borderRadius: "0.8rem",
              padding: "1rem 1.4rem",
              marginBottom: "1.8rem",
              fontSize: "1.3rem",
              color: "var(--coral)",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form action={loginAction} className="flex flex-col gap-[10px]">
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

          <label className="flex flex-col gap-[5px]">
            <div className="flex justify-between">
              <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>Password</span>
              <a href="/forgot" style={{ fontSize: "1.2rem", color: "var(--ink-40)", textDecoration: "none" }}>
                Forgot?
              </a>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
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
            Sign in →
          </button>
        </form>

        {/* Footer */}
        <p style={{ margin: "2.2rem 0 0", fontSize: "1.3rem", color: "var(--ink-60)", textAlign: "center" }}>
          No account?{" "}
          <a href="/register" style={{ color: "var(--ink)", fontWeight: 500, textDecoration: "none" }}>
            Create one — it&apos;s free
          </a>
        </p>
      </div>

      {/* Below-card note */}
      <p style={{ marginTop: "2rem", fontSize: "1.2rem", color: "var(--ink-40)", textAlign: "center" }}>
        Free for academic use · no credit card
      </p>
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
