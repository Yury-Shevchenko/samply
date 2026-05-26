import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Script from "next/script";
import { auth, signIn } from "@/lib/auth";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { getT } from "@/lib/i18n.server";
import { verifyTurnstile } from "@/lib/turnstile";

export const metadata = { title: "Create account — Samply" };

// Cloudflare Turnstile public test sitekey — always passes, used when the env
// var is missing so dev/CI work without setup. Replace via env in production.
const TEST_SITEKEY = "1x00000000000000000000AA";

async function registerAction(formData: FormData) {
  "use server";

  const hdrs = await headers();

  // Origin / Referer check — server actions in Next.js post to the current URL,
  // so a legitimate submission always carries an Origin from our own host.
  // Reject anything else (bots posting directly bypass the browser fetch wrapper).
  const expectedOrigin = (process.env.NEXTAUTH_URL ?? "").replace(/\/$/, "");
  const origin = hdrs.get("origin") ?? "";
  const referer = hdrs.get("referer") ?? "";
  const refererOrigin = referer ? new URL(referer).origin : "";
  if (expectedOrigin && origin !== expectedOrigin && refererOrigin !== expectedOrigin) {
    redirect("/register?error=" + encodeURIComponent("Invalid request."));
  }

  // Honeypot — field is visually hidden and aria-hidden, real users leave it empty.
  if (((formData.get("website") as string) ?? "").trim() !== "") {
    redirect("/register?error=" + encodeURIComponent("Invalid request."));
  }

  // Cloudflare Turnstile verification.
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    hdrs.get("x-real-ip") ??
    undefined;
  const turnstileToken = formData.get("cf-turnstile-response") as string | null;
  const ok = await verifyTurnstile(turnstileToken, ip);
  if (!ok) {
    redirect("/register?error=" + encodeURIComponent("Captcha check failed. Please try again."));
  }

  const expressUrl = process.env.EXPRESS_URL ?? "http://localhost";
  const appBaseUrl = (process.env.NEXTAUTH_URL ?? "http://localhost:3000").replace(/\/$/, "");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const body = new URLSearchParams({
    name: formData.get("name") as string,
    email,
    password,
    "password-confirm": formData.get("password-confirm") as string,
  });

  const res = await fetch(`${expressUrl}/auth/researcher/email/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
      "X-App-Url": appBaseUrl,
    },
    body: body.toString(),
    redirect: "manual",
  });

  if (res.status === 302 || res.status === 301) {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
    return;
  }
  redirect("/register?error=" + encodeURIComponent("Registration failed. Check your details and try again."));
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const session = await auth();
  if (session) redirect("/dashboard");

  const { error, notice } = await searchParams;
  const { t } = await getT();
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || TEST_SITEKEY;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--paper)", padding: "4rem 2rem" }}
    >
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      {/* Card */}
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

        {/* Heading */}
        <h1
          className="font-[family-name:var(--font-display)] font-bold m-0"
          style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "0.6rem" }}
        >
          {t("register.title")}
        </h1>
        <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: "0 0 2.8rem" }}>
          {t("register.subtitle")}
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
        <form action={registerAction} className="flex flex-col gap-[10px]">
          {/* Honeypot — must stay empty. Hidden visually, accessible to bots that parse the form. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <label className="flex flex-col gap-[5px]">
            <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("register.nameLabel")}</span>
            <input
              type="text"
              name="name"
              placeholder={t("register.namePlaceholder")}
              required
              autoComplete="name"
              style={inputStyle}
            />
          </label>

          <label className="flex flex-col gap-[5px]">
            <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("register.emailLabel")}</span>
            <input
              type="email"
              name="email"
              placeholder={t("register.emailPlaceholder")}
              required
              autoComplete="email"
              style={inputStyle}
            />
          </label>

          <label className="flex flex-col gap-[5px]">
            <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("register.passwordLabel")}</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              style={inputStyle}
            />
          </label>

          <label className="flex flex-col gap-[5px]">
            <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("register.confirmPasswordLabel")}</span>
            <input
              type="password"
              name="password-confirm"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              style={inputStyle}
            />
          </label>

          {/* Turnstile widget — auto-rendered by the Cloudflare script. */}
          <div className="cf-turnstile" data-sitekey={sitekey} style={{ marginTop: "0.6rem" }} />

          <SubmitButton
            pendingLabel={t("register.submitting")}
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
            }}
          >
            {t("register.submit")}
          </SubmitButton>
        </form>

        {/* Footer */}
        <p style={{ margin: "2.2rem 0 0", fontSize: "1.3rem", color: "var(--ink-60)", textAlign: "center" }}>
          {t("register.alreadyHaveAccount")}{" "}
          <a href="/login" style={{ color: "var(--ink)", fontWeight: 500, textDecoration: "none" }}>
            {t("register.signIn")}
          </a>
        </p>
      </div>

      {/* Below-card note */}
      <p style={{ marginTop: "2rem", fontSize: "1.2rem", color: "var(--ink-40)", textAlign: "center" }}>
        {t("register.footerNote")}
      </p>
      <p style={{ marginTop: "0.6rem", fontSize: "1.2rem", color: "var(--ink-40)", textAlign: "center" }}>
        <a href="/docs/terms" style={{ color: "var(--ink-40)", textDecoration: "underline" }}>{t("register.termsLink")}</a>
        {" · "}
        <a href="/docs/policy" style={{ color: "var(--ink-40)", textDecoration: "underline" }}>{t("register.policyLink")}</a>
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
