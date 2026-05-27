import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import stripe from "@/lib/stripe";
import SubmitButton from "@/app/components/ui/SubmitButton";
import { DB_LANG_TO_LOCALE } from "@/lib/i18n";
import { getT } from "@/lib/i18n.server";
import { fetchStudyContactsByProjectIds } from "@/lib/data/studies";

export const metadata = { title: "Account — Samply" };

async function updateAccountAction(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) redirect("/login");

  user.name = (formData.get("name") as string) || user.name;
  if (user.level > 10) {
    user.institute = (formData.get("institute") as string) || "";
  }
  const newLang = (formData.get("language") as string) || user.language;
  user.language = newLang;
  await user.save();

  // Sync the locale cookie so all pages reflect the new language immediately
  const locale = DB_LANG_TO_LOCALE[newLang] ?? "en";
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });

  redirect("/account?notice=" + encodeURIComponent("Profile updated."));
}

function stripeErrorMessage(err: unknown, fallback: string): string {
  // Surface Stripe's own message when available — much more actionable than a
  // generic "try again". Truncate to keep the URL sane.
  const msg = err instanceof Error ? err.message : fallback;
  return msg.slice(0, 240);
}

async function createPayableAccountAction() {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) redirect("/login");
  if (user.level >= 11) redirect("/dashboard");
  if (!user.emailIsConfirmed) {
    redirect("/account?error=" + encodeURIComponent("Please confirm your email first."));
  }

  const appBaseUrl = (process.env.NEXTAUTH_URL ?? "http://localhost:3000").replace(/\/$/, "");

  let accountId = user.stripeAccountId;
  if (!accountId) {
    try {
      const account = await stripe.accounts.create({
        type: "express",
        email: user.email,
      });
      accountId = account.id;
      user.stripeAccountId = accountId;
      await user.save();
    } catch (err) {
      console.error("[payable-account] stripe.accounts.create failed:", err);
      redirect("/account?error=" + encodeURIComponent(
        stripeErrorMessage(err, "Could not create Stripe account."),
      ));
    }
  }

  let url: string;
  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appBaseUrl}/account`,
      return_url: `${appBaseUrl}/account`,
      type: "account_onboarding",
    });
    url = accountLink.url;
  } catch (err) {
    console.error("[payable-account] stripe.accountLinks.create failed:", err);
    redirect("/account?error=" + encodeURIComponent(
      stripeErrorMessage(err, "Could not create Stripe onboarding link."),
    ));
  }

  redirect(url);
}

async function resendConfirmationAction(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  const email = formData.get("email") as string;
  if (!email || email !== session.user.email) redirect("/account");

  await sendConfirmationEmail(email);

  redirect("/account?notice=" + encodeURIComponent("Confirmation email sent. Check your inbox."));
}

async function sendConfirmationEmail(email: string) {
  const expressUrl = process.env.EXPRESS_URL ?? "http://localhost:3000";
  const appBaseUrl = (process.env.NEXTAUTH_URL ?? "http://localhost:3000").replace(/\/$/, "");
  await fetch(`${expressUrl}/account/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "en",
      "X-App-Url": appBaseUrl,
    },
    body: new URLSearchParams({ email }).toString(),
    redirect: "manual",
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function changeEmailAction(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  const raw = (formData.get("email") as string | null) ?? "";
  const newEmail = raw.toLowerCase().trim();

  if (!newEmail || !EMAIL_RE.test(newEmail)) {
    redirect("/account?error=" + encodeURIComponent("Please enter a valid email address."));
  }

  if (newEmail === session.user.email.toLowerCase()) {
    redirect("/account?notice=" + encodeURIComponent("Email unchanged."));
  }

  await connectDB();

  const taken = await User.findOne({ email: newEmail, _id: { $ne: session.user.id } }, { _id: 1 }).lean();
  if (taken) {
    redirect("/account?error=" + encodeURIComponent("That email is already in use by another account."));
  }

  const user = await User.findById(session.user.id);
  if (!user) redirect("/login");

  user.email = newEmail;
  user.emailIsConfirmed = false;
  await user.save();

  await sendConfirmationEmail(newEmail);

  redirect("/account?notice=" + encodeURIComponent("Email updated. Check your new inbox to confirm it."));
}

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

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) redirect("/login");

  const { notice, error } = await searchParams;
  const { t } = await getT();
  const isResearcher = user.level > 10;
  const initial = (user.name?.[0] || user.email?.[0] || "?").toUpperCase();

  const joinDate = user.created
    ? new Date(user.created).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  // For participants, look up the researcher contact for each enrolled study.
  const participantStudies = (!isResearcher && user.participant_projects) || [];
  const contactByProject = participantStudies.length
    ? await fetchStudyContactsByProjectIds(
        participantStudies.map((p: { _id: unknown }) => String(p._id)),
      )
    : new Map();

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4.8rem var(--page-px) 8rem" }}
    >
      <div style={{ maxWidth: "52rem", margin: "0 auto" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2.8rem" }}>
          <a
            href={isResearcher ? "/dashboard" : "/participant/home"}
            style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
            className="hover:opacity-70 transition-opacity"
          >
            {isResearcher ? t("account.breadcrumb") : t("participant.account.breadcrumb")}
          </a>
        </div>

        {/* Notices */}
        {notice && (
          <div style={{ background: "rgba(61,115,107,.1)", border: "1px solid rgba(61,115,107,.25)", borderRadius: "1rem", padding: "1.1rem 1.6rem", marginBottom: "2rem", fontSize: "1.35rem", color: "var(--sage)" }}>
            {notice}
          </div>
        )}
        {error && (
          <div style={{ background: "rgba(214,90,48,.08)", border: "1px solid rgba(214,90,48,.25)", borderRadius: "1rem", padding: "1.1rem 1.6rem", marginBottom: "2rem", fontSize: "1.35rem", color: "var(--coral)" }}>
            {error}
          </div>
        )}

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
          {/* Identity header */}
          <div
            style={{
              padding: "2.8rem 3.2rem 2.4rem",
              borderBottom: "1px solid var(--ink-10)",
              display: "flex",
              alignItems: "center",
              gap: "1.8rem",
            }}
          >
            {/* Avatar */}
            <div
              className="font-[family-name:var(--font-display)] font-bold flex-shrink-0"
              style={{
                width: "5.2rem",
                height: "5.2rem",
                borderRadius: "50%",
                background: "var(--ink)",
                color: "var(--paper)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.2rem",
              }}
            >
              {initial}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "1.8rem", letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: "0.4rem" }}
              >
                {user.name || "—"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.3rem", color: "var(--ink-60)" }}>{user.email}</span>
                <span
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.7rem",
                    borderRadius: "9999px",
                    background: isResearcher ? "rgba(61,115,107,.1)" : "var(--ink-10)",
                    color: isResearcher ? "var(--sage)" : "var(--ink-40)",
                  }}
                >
                  {isResearcher ? t("account.roleResearcher") : t("account.roleParticipant")}
                </span>
              </div>
              {joinDate && (
                <div style={{ fontSize: "1.15rem", color: "var(--ink-40)", marginTop: "0.3rem" }}>
                  {t("account.memberSince", { date: joinDate })}
                </div>
              )}
            </div>
          </div>

          {/* Email — editable + confirmation status */}
          <div style={{ padding: "1.8rem 3.2rem", borderBottom: "1px solid var(--ink-10)" }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--ink-40)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              {t("account.sectionEmail")}
              {user.emailIsConfirmed ? (
                <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--sage)", background: "rgba(61,115,107,.1)", padding: "0.2rem 0.7rem", borderRadius: "9999px", textTransform: "none", letterSpacing: 0 }}>
                  {t("account.emailConfirmed")}
                </span>
              ) : (
                <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--coral)", background: "rgba(214,90,48,.1)", padding: "0.2rem 0.7rem", borderRadius: "9999px", textTransform: "none", letterSpacing: 0 }}>
                  {t("account.emailNotConfirmed")}
                </span>
              )}
            </div>

            <form action={changeEmailAction} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <input
                type="email"
                name="email"
                defaultValue={user.email || ""}
                required
                autoComplete="email"
                style={inputStyle}
              />
              <p style={{ fontSize: "1.15rem", color: "var(--ink-40)", margin: 0, lineHeight: 1.5 }}>
                {t("account.emailChangeHint")}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
                <SubmitButton
                  pendingLabel={t("account.emailSavePending")}
                  style={{
                    fontSize: "1.25rem",
                    padding: "0.7rem 1.4rem",
                    background: "var(--ink)",
                    color: "var(--paper)",
                    border: "none",
                    borderRadius: "9999px",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {t("account.emailSave")}
                </SubmitButton>
              </div>
            </form>

            {!user.emailIsConfirmed && (
              <form action={resendConfirmationAction} style={{ marginTop: "1rem" }}>
                <input type="hidden" name="email" value={user.email} />
                <SubmitButton
                  pendingLabel={t("account.resendPending")}
                  style={{
                    fontSize: "1.2rem",
                    padding: "0.55rem 1.2rem",
                    background: "none",
                    border: "1px solid var(--ink-20)",
                    borderRadius: "9999px",
                    color: "var(--ink-60)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {t("account.resendConfirmation")}
                </SubmitButton>
              </form>
            )}
          </div>

          {/* Profile form */}
          <form action={updateAccountAction}>
            <div style={{ padding: "2rem 3.2rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {t("account.sectionProfile")}
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("account.displayName")}</span>
                <input type="text" name="name" defaultValue={user.name || ""} style={inputStyle} />
              </label>

              {isResearcher && (
                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("account.researchInstitute")}</span>
                  <input type="text" name="institute" defaultValue={user.institute || ""} placeholder={t("account.institutePlaceholder")} style={inputStyle} />
                </label>
              )}

              <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>{t("account.languageLabel")}</span>
                <select
                  name="language"
                  defaultValue={user.language || "english"}
                  style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                >
                  <option value="english">English</option>
                  <option value="german">Deutsch</option>
                  <option value="dutch">Nederlands</option>
                  <option value="russian">Русский</option>
                  <option value="chinese">中文</option>
                  <option value="korean">한국어</option>
                  <option value="italian">Italiano</option>
                  <option value="french">Français</option>
                  <option value="spanish">Español</option>
                  <option value="portuguese">Português</option>
                  <option value="japanese">日本語</option>
                  <option value="turkish">Türkçe</option>
                  <option value="polish">Polski</option>
                  <option value="arabic">العربية</option>
                </select>
              </label>
            </div>

            <div style={{ padding: "0 3.2rem 2.4rem" }}>
              <SubmitButton
                pendingLabel={t("account.savePending")}
                style={{
                  padding: "1rem 2.4rem",
                  background: "var(--coral)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "9999px",
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                }}
              >
                {t("account.saveChanges")}
              </SubmitButton>
            </div>
          </form>

          {/* Participant studies */}
          {!isResearcher && (
            <div style={{ padding: "1.8rem 3.2rem", borderTop: "1px solid var(--ink-10)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                {t("account.sectionStudies")}
              </div>
              {(user.code?.id || user.samplyId) && (
                <div style={{ fontSize: "1.2rem", color: "var(--ink-40)", marginBottom: "1rem", fontFamily: "var(--font-mono)" }}>
                  ID: {user.code?.id || user.samplyId}
                </div>
              )}
              {(user.participant_projects?.length ?? 0) > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {(user.participant_projects ?? []).map((p: { _id: unknown; slug?: string; name?: string }) => {
                    const contact = contactByProject.get(String(p._id));
                    return (
                      <div key={String(p._id)} style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        <a
                          href={`/studies/${p.slug}`}
                          style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none" }}
                          className="hover:opacity-70 transition-opacity"
                        >
                          {p.name} →
                        </a>
                        {contact?.email && (
                          <div style={{ fontSize: "1.2rem", color: "var(--ink-60)" }}>
                            {t("participant.home.contactLabel")}{" "}
                            <a
                              href={`mailto:${contact.email}`}
                              style={{ color: "var(--ink)", textDecoration: "none" }}
                              className="hover:opacity-70 transition-opacity"
                            >
                              {contact.name ? `${contact.name} <${contact.email}>` : contact.email}
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0 }}>
                  {t("account.notParticipating")}
                </p>
              )}
            </div>
          )}

          {/* Payable account (Stripe Connect) — participants only */}
          {!isResearcher && (
            <div style={{ padding: "1.8rem 3.2rem", borderTop: "1px solid var(--ink-10)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                {t("participant.payable.title")}
              </div>
              <p style={{ fontSize: "1.3rem", color: "var(--ink-60)", margin: "0 0 1.4rem", lineHeight: 1.55 }}>
                {t("participant.payable.intro")}
              </p>

              {user.stripeAccountId && (
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.6rem 1.4rem", marginBottom: "1.4rem", fontSize: "1.3rem" }}>
                  <span style={{ color: "var(--ink-60)" }}>{t("participant.payable.statusCharges")}</span>
                  <span style={{ color: user.stripeInformation?.charges_enabled ? "var(--sage)" : "var(--ink-60)" }}>
                    {user.stripeInformation?.charges_enabled
                      ? "✓ " + t("participant.payable.enabled")
                      : t("participant.payable.disabled")}
                  </span>
                  <span style={{ color: "var(--ink-60)" }}>{t("participant.payable.statusDetails")}</span>
                  <span style={{ color: user.stripeInformation?.details_submitted ? "var(--sage)" : "var(--ink-60)" }}>
                    {user.stripeInformation?.details_submitted
                      ? "✓ " + t("participant.payable.submitted")
                      : t("participant.payable.notSubmitted")}
                  </span>
                  <span style={{ color: "var(--ink-60)" }}>{t("participant.payable.statusPayouts")}</span>
                  <span style={{ color: user.stripeInformation?.payouts_enabled ? "var(--sage)" : "var(--ink-60)" }}>
                    {user.stripeInformation?.payouts_enabled
                      ? "✓ " + t("participant.payable.enabled")
                      : t("participant.payable.disabled")}
                  </span>
                </div>
              )}

              {user.emailIsConfirmed ? (
                <form action={createPayableAccountAction}>
                  <SubmitButton
                    pendingLabel="…"
                    style={{
                      fontSize: "1.3rem",
                      padding: "0.9rem 1.8rem",
                      background: "var(--ink)",
                      color: "var(--paper)",
                      border: "none",
                      borderRadius: "9999px",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                    }}
                  >
                    {user.stripeAccountId
                      ? t("participant.payable.editButton")
                      : t("participant.payable.createButton")}
                  </SubmitButton>
                </form>
              ) : (
                <p style={{ fontSize: "1.25rem", color: "var(--coral)", margin: 0 }}>
                  {t("participant.payable.confirmEmailFirst")}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Privacy & Data (researchers only) */}
        {isResearcher && (
          <div style={{ marginTop: "2.8rem", paddingTop: "2rem", borderTop: "1px solid var(--ink-10)" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t("account.privacyTitle")}
            </div>
            <p style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.55, margin: "0 0 0.8rem" }}>
              {t("account.privacyIntro")}
            </p>
            <ul style={{ margin: "0 0 1rem", paddingLeft: "1.6rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <li style={{ fontSize: "1.25rem", color: "var(--ink)", lineHeight: 1.55 }}>{t("account.privacyPending")}</li>
              <li style={{ fontSize: "1.25rem", color: "var(--ink)", lineHeight: 1.55 }}>{t("account.privacyResults")}</li>
            </ul>
            <p style={{ fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.55, margin: "0 0 1rem" }}>
              {t("account.privacyExport")}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="/docs/policy" style={{ fontSize: "1.2rem", color: "var(--ink-60)", textDecoration: "underline" }}>{t("account.privacyPolicy")}</a>
              <a href="/docs/terms"  style={{ fontSize: "1.2rem", color: "var(--ink-60)", textDecoration: "underline" }}>{t("account.privacyTerms")}</a>
            </div>
          </div>
        )}

        {/* Danger zone */}
        <div style={{ marginTop: "2.8rem", paddingTop: "2rem", borderTop: "1px solid var(--ink-10)" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
            {t("account.dangerZone")}
          </div>
          {!isResearcher && (
            <p style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.55, margin: "0 0 1rem" }}>
              {t("participant.account.deleteIntro")}
            </p>
          )}
          <a
            href="/account/delete"
            style={{ fontSize: "1.3rem", color: "var(--coral)", textDecoration: "none", fontWeight: 500 }}
            className="hover:opacity-70 transition-opacity"
          >
            {isResearcher ? t("account.deleteAccount") : t("participant.account.deleteAccount")}
          </a>
        </div>
      </div>
    </main>
  );
}
