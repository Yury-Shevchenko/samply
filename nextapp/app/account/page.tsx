import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import SubmitButton from "@/app/components/ui/SubmitButton";

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
  user.language = (formData.get("language") as string) || user.language;
  await user.save();

  redirect("/account?notice=" + encodeURIComponent("Profile updated."));
}

async function resendConfirmationAction(formData: FormData) {
  "use server";
  const expressUrl = process.env.EXPRESS_URL ?? "http://localhost";
  const appBaseUrl = (process.env.NEXTAUTH_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const email = formData.get("email") as string;

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

  redirect("/account?notice=" + encodeURIComponent("Confirmation email sent. Check your inbox."));
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
  const isResearcher = user.level > 10;
  const initial = (user.name?.[0] || user.email?.[0] || "?").toUpperCase();

  const joinDate = user.created
    ? new Date(user.created).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4.8rem var(--page-px) 8rem" }}
    >
      <div style={{ maxWidth: "52rem", margin: "0 auto" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2.8rem" }}>
          <a
            href="/dashboard"
            style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
            className="hover:opacity-70 transition-opacity"
          >
            ← Dashboard
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
                  {isResearcher ? "researcher" : "participant"}
                </span>
              </div>
              {joinDate && (
                <div style={{ fontSize: "1.15rem", color: "var(--ink-40)", marginTop: "0.3rem" }}>
                  Member since {joinDate}
                </div>
              )}
            </div>
          </div>

          {/* Email confirmation */}
          <div style={{ padding: "1.8rem 3.2rem", borderBottom: "1px solid var(--ink-10)" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Email
            </div>
            {user.emailIsConfirmed ? (
              <div className="flex items-center gap-[8px]">
                <span style={{ fontSize: "1.35rem", color: "var(--ink)" }}>{user.email}</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--sage)", background: "rgba(61,115,107,.1)", padding: "0.2rem 0.8rem", borderRadius: "9999px" }}>
                  ✓ confirmed
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-[8px]" style={{ marginBottom: "1rem" }}>
                  <span style={{ fontSize: "1.35rem", color: "var(--ink)" }}>{user.email}</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--coral)", background: "rgba(214,90,48,.1)", padding: "0.2rem 0.8rem", borderRadius: "9999px" }}>
                    not confirmed
                  </span>
                </div>
                <form action={resendConfirmationAction}>
                  <input type="hidden" name="email" value={user.email} />
                  <SubmitButton
                    pendingLabel="Sending…"
                    style={{
                      fontSize: "1.25rem",
                      padding: "0.7rem 1.4rem",
                      background: "none",
                      border: "1px solid var(--ink-20)",
                      borderRadius: "9999px",
                      color: "var(--ink-60)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Resend confirmation email
                  </SubmitButton>
                </form>
              </div>
            )}
          </div>

          {/* Profile form */}
          <form action={updateAccountAction}>
            <div style={{ padding: "2rem 3.2rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Profile
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>Display name</span>
                <input type="text" name="name" defaultValue={user.name || ""} style={inputStyle} />
              </label>

              {isResearcher && (
                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>Research institute</span>
                  <input type="text" name="institute" defaultValue={user.institute || ""} placeholder="University of…" style={inputStyle} />
                </label>
              )}

              <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>Language</span>
                <select
                  name="language"
                  defaultValue={user.language || "english"}
                  style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                >
                  <option value="english">English</option>
                  <option value="german">Deutsch</option>
                  <option value="dutch">Nederlands</option>
                </select>
              </label>
            </div>

            <div style={{ padding: "0 3.2rem 2.4rem" }}>
              <SubmitButton
                pendingLabel="Saving…"
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
                Save changes
              </SubmitButton>
            </div>
          </form>

          {/* Participant studies */}
          {!isResearcher && (
            <div style={{ padding: "1.8rem 3.2rem", borderTop: "1px solid var(--ink-10)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Studies
              </div>
              {(user.code?.id || user.samplyId) && (
                <div style={{ fontSize: "1.2rem", color: "var(--ink-40)", marginBottom: "1rem", fontFamily: "var(--font-mono)" }}>
                  ID: {user.code?.id || user.samplyId}
                </div>
              )}
              {(user.participant_projects?.length ?? 0) > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {(user.participant_projects ?? []).map((p: { _id: unknown; slug?: string; name?: string }) => (
                    <a
                      key={String(p._id)}
                      href={`/studies/${p.slug}`}
                      style={{ fontSize: "1.35rem", color: "var(--ink)", textDecoration: "none" }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {p.name} →
                    </a>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0 }}>
                  Not currently participating in any studies.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Danger zone */}
        {isResearcher && (
          <div style={{ marginTop: "2.8rem", paddingTop: "2rem", borderTop: "1px solid var(--ink-10)" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Danger zone
            </div>
            <a
              href="/account/delete"
              style={{ fontSize: "1.3rem", color: "var(--coral)", textDecoration: "none", fontWeight: 500 }}
              className="hover:opacity-70 transition-opacity"
            >
              Delete my account →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
