import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumCategory from "@/lib/models/forumCategory";
import ForumThread from "@/lib/models/forumThread";
import { AdminPage, TD_STYLE, TD_MONO } from "../shared";
import { ConfirmDeleteButton } from "../ConfirmDeleteButton";
import { deleteCategoryAction } from "@/app/forum/actions";

export const metadata = { title: "Admin: Forum — Samply" };

export default async function AdminForumPage() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  await connectDB();
  const categories = await ForumCategory.find({}).sort({ order: 1, createdAt: 1 }).lean();

  const threadCounts = await Promise.all(
    categories.map((cat) => ForumThread.countDocuments({ categoryId: cat._id })),
  );

  return (
    <AdminPage title="Forum" count={categories.length}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.6rem" }}>
        <a
          href="/admin/forum/new"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.8rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--font-body)", textDecoration: "none" }}
          className="hover:opacity-80 transition-opacity"
        >
          + New category
        </a>
      </div>

      <div style={{ border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--ink)", color: "var(--paper)" }}>
              {["", "Order", "Name", "Slug", "Description", "Threads", ""].map((h) => (
                <th key={h} style={{ ...TD_STYLE, fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", padding: "1.1rem 1.4rem", textAlign: "left", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => {
              const deleteAction = deleteCategoryAction.bind(null, String(cat._id));
              return (
                <tr key={String(cat._id)} style={{ borderBottom: "1px solid var(--ink-10)", background: i % 2 === 0 ? "var(--surface)" : "var(--paper)" }}>
                  <td style={{ ...TD_STYLE, width: 36, padding: "9px 8px 9px 14px" }}>
                    <ConfirmDeleteButton
                      action={deleteAction}
                      message={`Delete category "${cat.name}" and all its threads? This cannot be undone.`}
                    />
                  </td>
                  <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{cat.order}</td>
                  <td style={{ ...TD_STYLE, fontWeight: 600 }}>{cat.name}</td>
                  <td style={{ ...TD_MONO, color: "var(--ink-60)" }}>{cat.slug}</td>
                  <td style={{ ...TD_STYLE, color: "var(--ink-60)", maxWidth: 280 }}>{cat.description || <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
                  <td style={{ ...TD_MONO }}>{threadCounts[i]}</td>
                  <td style={{ ...TD_STYLE, width: 80 }}>
                    <a href={`/admin/forum/${cat._id}`} style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)", textDecoration: "none" }} className="hover:opacity-70">Edit</a>
                  </td>
                </tr>
              );
            })}
            {categories.length === 0 && (
              <tr>
                <td colSpan={7} style={{ ...TD_STYLE, textAlign: "center", color: "var(--ink-20)", padding: "3rem" }}>
                  No categories yet. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "3.2rem" }}>
        <a href="/forum" style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", textDecoration: "none" }} className="hover:opacity-70">View forum →</a>
      </div>
    </AdminPage>
  );
}
