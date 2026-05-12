import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { getSiteSettings } from "@/lib/models/siteSettings";
import { submitTestimonial } from "./actions";

export const metadata = { title: "Share your experience — Samply" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "1rem 1.2rem",
  fontSize: "1.35rem",
  color: "var(--ink)",
  background: "var(--surface)",
  border: "1px solid var(--ink-20)",
  borderRadius: "0.8rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-body)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "var(--ink-60)",
  marginBottom: "0.5rem",
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

export default async function TestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();
  const { showTestimonials } = await getSiteSettings();
  if (!showTestimonials) notFound();

  const { submitted } = await searchParams;

  const user = await User.findById(session.user.id, { name: 1, institute: 1 }).lean() as {
    name?: string; institute?: string;
  } | null;

  if (submitted) {
    return (
      <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
        <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "8rem 4rem", textAlign: "center" }}>
          <div style={{ fontSize: "3.2rem", marginBottom: "1.2rem" }}>✉</div>
          <h1 className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 1rem" }}>
            Thank you.
          </h1>
          <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.6, marginBottom: "2.4rem" }}>
            Your testimonial has been submitted and will appear on the site after review.
          </p>
          <a
            href="/dashboard"
            style={{ fontSize: "1.3rem", color: "var(--coral)", textDecoration: "none", fontFamily: "var(--font-mono)" }}
          >
            ← Back to dashboard
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "6rem var(--page-px) 10rem" }}>

        <a href="/dashboard" style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          ← dashboard
        </a>

        <div style={{ marginTop: "3.2rem", marginBottom: "3.6rem" }}>
          <div className="font-[family-name:var(--font-hand)]"
            style={{ fontSize: "1.8rem", color: "var(--coral)", marginBottom: "0.4rem", transform: "rotate(-0.5deg)", display: "inline-block" }}>
            your words
          </div>
          <h1 className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "3.6rem", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 1rem", lineHeight: 1.05 }}>
            Share your experience.
          </h1>
          <p style={{ fontSize: "1.45rem", color: "var(--ink-60)", lineHeight: 1.6, margin: 0, maxWidth: "44rem" }}>
            Tell us how you use Samply and what it has enabled in your research.
            Approved testimonials appear on the Samply homepage.
          </p>
        </div>

        <form action={submitTestimonial} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <label style={labelStyle}>Your testimonial *</label>
            <textarea
              name="text"
              required
              rows={5}
              placeholder="We used Samply to run a 14-day ESM study across three countries..."
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem" }}>
            <div>
              <label style={labelStyle}>Display name *</label>
              <input
                name="name"
                type="text"
                required
                defaultValue={user?.name ?? ""}
                placeholder="Dr. Jane Smith"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Role / title</label>
              <input
                name="role"
                type="text"
                placeholder="Associate Professor"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Institution</label>
            <input
              name="institute"
              type="text"
              defaultValue={user?.institute ?? ""}
              placeholder="University of Example"
              style={inputStyle}
            />
          </div>

          <div style={{ paddingTop: "0.4rem" }}>
            <button
              type="submit"
              style={{
                padding: "1rem 2.8rem",
                background: "var(--ink)",
                color: "var(--paper)",
                border: "none",
                borderRadius: "999rem",
                fontSize: "1.35rem",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Submit testimonial →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
