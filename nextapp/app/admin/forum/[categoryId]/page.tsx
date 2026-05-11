import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumCategory from "@/lib/models/forumCategory";
import { updateCategoryAction } from "@/app/forum/actions";

export const metadata = { title: "Admin: Edit Forum Category — Samply" };

const INPUT = { padding: "0.9rem 1.2rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", fontSize: "1.3rem", fontFamily: "var(--font-body)", background: "var(--surface)", color: "var(--ink)", outline: "none", width: "100%", boxSizing: "border-box" } as React.CSSProperties;
const LABEL = { fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-60)", display: "block", marginBottom: "0.6rem" } as React.CSSProperties;

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { categoryId } = await params;
  await connectDB();
  const cat = await ForumCategory.findById(categoryId).lean();
  if (!cat) notFound();

  const updateAction = updateCategoryAction.bind(null, categoryId);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "5.2rem 4rem 9.6rem" }}>
        <a href="/admin/forum" style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", textDecoration: "none", display: "block", marginBottom: "2rem" }} className="hover:opacity-70">← Back</a>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3rem", letterSpacing: "-0.03em", margin: "0 0 3.2rem" }}>Edit category</h1>

        <form action={updateAction} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <label style={LABEL}>Name</label>
            <input name="name" required maxLength={80} defaultValue={cat.name} style={INPUT} />
          </div>
          <div>
            <label style={LABEL}>Description <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--ink-40)" }}>(optional)</span></label>
            <input name="description" maxLength={200} defaultValue={cat.description} style={INPUT} />
          </div>
          <div>
            <label style={LABEL}>Order <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--ink-40)" }}>(lower = first)</span></label>
            <input name="order" type="number" defaultValue={cat.order} style={{ ...INPUT, maxWidth: 120 }} />
          </div>
          <div style={{ padding: "1.2rem", background: "var(--ink-10)", borderRadius: "0.6rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)" }}>Slug (auto-generated, not editable): </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink)" }}>{cat.slug}</span>
          </div>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "0.8rem" }}>
            <a href="/admin/forum" style={{ padding: "0.9rem 1.8rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", fontSize: "1.2rem", fontFamily: "var(--font-body)", color: "var(--ink-60)", textDecoration: "none" }} className="hover:opacity-70 transition-opacity">Cancel</a>
            <button type="submit" style={{ padding: "0.9rem 2.2rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none", cursor: "pointer" }} className="hover:opacity-80 transition-opacity">Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}
