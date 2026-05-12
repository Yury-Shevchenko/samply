import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import Project from "@/lib/models/project";
import SubmitButton from "@/app/components/ui/SubmitButton";

export const metadata = { title: "Delete Account — Samply" };

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

async function deleteAccountAction(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session) redirect("/login");

  if (formData.get("confirm") !== "delete") {
    redirect("/account/delete?error=" + encodeURIComponent("Type 'delete' to confirm."));
  }

  await connectDB();

  const projects = await Project.countDocuments({ creator: session.user.id });
  if (projects > 0) {
    redirect(
      "/account/delete?error=" +
        encodeURIComponent("Please delete all your studies before deleting your account."),
    );
  }

  await User.deleteOne({ _id: session.user.id });
  await signOut({ redirectTo: "/login" });
}

export default async function DeleteAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  await connectDB();
  const projects = await Project.find({ creator: session.user.id }, { name: 1, slug: 1 }).lean();
  const { error } = await searchParams;

  const hasProjects = projects.length > 0;

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--paper)", color: "var(--ink)", padding: "4rem 2.4rem" }}
    >
      <div style={{ width: "100%", maxWidth: "46rem" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "3.2rem" }}>
          <a
            href="/dashboard"
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
          {/* Header */}
          <div style={{ padding: "2.8rem 3.2rem 2rem", borderBottom: "1px solid var(--ink-10)" }}>
            <div
              className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2rem", letterSpacing: "-0.02em", color: "var(--coral)", marginBottom: "0.6rem" }}
            >
              Delete account
            </div>
            <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0 }}>
              This action is permanent and cannot be undone.
            </p>
          </div>

          <div style={{ padding: "2.4rem 3.2rem 2.8rem" }}>

            {/* Error banner */}
            {error && (
              <div style={{ background: "rgba(214,90,48,.08)", border: "1px solid rgba(214,90,48,.25)", borderRadius: "1rem", padding: "1.1rem 1.6rem", marginBottom: "2rem", fontSize: "1.35rem", color: "var(--coral)" }}>
                {error}
              </div>
            )}

            {hasProjects ? (
              <>
                {/* Blocking warning */}
                <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "1rem", padding: "1.4rem 1.8rem", marginBottom: "2rem" }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--coral)", marginBottom: "0.8rem" }}>
                    You must delete all studies first
                  </div>
                  <p style={{ fontSize: "1.3rem", color: "var(--ink-60)", margin: "0 0 1.2rem" }}>
                    The following studies are still associated with your account:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {projects.map((p) => {
                      const proj = p as { _id: unknown; name?: string; slug?: string };
                      return (
                        <div
                          key={String(proj._id)}
                          style={{ fontSize: "1.35rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.8rem" }}
                        >
                          <span style={{ width: "0.4rem", height: "0.4rem", borderRadius: "50%", background: "var(--coral)", flexShrink: 0, display: "inline-block" }} />
                          {proj.name}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <a
                  href="/dashboard"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "1rem 2rem",
                    background: "var(--ink)",
                    color: "var(--paper)",
                    borderRadius: "9999px",
                    fontSize: "1.35rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Go to my studies
                </a>
              </>
            ) : (
              <form action={deleteAccountAction} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                <p style={{ fontSize: "1.35rem", color: "var(--ink-60)", margin: 0 }}>
                  Are you absolutely sure? Your account and all associated data will be permanently deleted.
                </p>

                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--ink-60)" }}>
                    Type <span style={{ fontFamily: "var(--font-mono)", color: "var(--coral)", fontSize: "1.2rem" }}>delete</span> to confirm
                  </span>
                  <input
                    type="text"
                    name="confirm"
                    required
                    autoComplete="off"
                    placeholder="delete"
                    style={inputStyle}
                  />
                </label>

                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginTop: "0.4rem" }}>
                  <SubmitButton
                    pendingLabel="Deleting…"
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
                    Delete my account
                  </SubmitButton>
                  <a
                    href="/account"
                    style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    Cancel
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
