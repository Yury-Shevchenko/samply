import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProjectForm from "@/app/components/ProjectForm";
import { createProjectAction } from "../actions";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";

export const metadata = { title: "New Study — Samply" };

export default async function NewProjectPage() {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();
  const userDoc = await User.findById(session.user.id, { emailIsConfirmed: 1 }).lean() as { emailIsConfirmed?: boolean } | null;
  if (!userDoc?.emailIsConfirmed) redirect("/dashboard?emailUnconfirmed=1");

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "68rem", margin: "0 auto", padding: "var(--page-pt) var(--page-px) 8rem" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2rem" }}>
          <a
            href="/dashboard"
            style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
            className="hover:opacity-70 transition-opacity"
          >
            ← Dashboard
          </a>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2.4rem" }}>
          <div
            className="font-[family-name:var(--font-hand)]"
            style={{ fontSize: "1.8rem", color: "var(--coral)", marginBottom: "0.4rem" }}
          >
            let&apos;s get started
          </div>
          <h1
            className="font-[family-name:var(--font-display)] font-bold m-0"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", letterSpacing: "-0.025em" }}
          >
            New study
          </h1>
          <p style={{ margin: "0.6rem 0 0", fontSize: "1.35rem", color: "var(--ink-60)" }}>
            Fill in the basics — you can always change these later.
          </p>
        </div>

        <ProjectForm
          action={createProjectAction}
          submitLabel="Create study →"
          cancelHref="/dashboard"
        />
      </div>
    </main>
  );
}
