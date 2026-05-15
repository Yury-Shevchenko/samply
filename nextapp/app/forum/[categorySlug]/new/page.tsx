import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumCategory from "@/lib/models/forumCategory";
import { createThreadAction } from "@/app/forum/actions";
import { getT } from "@/lib/i18n.server";

export default async function NewThreadPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { categorySlug } = await params;
  await connectDB();
  const category = await ForumCategory.findOne({ slug: categorySlug }).lean();
  if (!category) notFound();

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "5.2rem var(--page-px) 9.6rem" }}>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginBottom: "1.2rem", letterSpacing: ".06em" }}>
          <a href="/forum" style={{ color: "var(--ink-40)", textDecoration: "none" }} className="hover:opacity-70">{t("forum.breadcrumb")}</a>
          <span style={{ margin: "0 0.6rem" }}>›</span>
          <a href={`/forum/${categorySlug}`} style={{ color: "var(--ink-40)", textDecoration: "none" }} className="hover:opacity-70">{category.name}</a>
          <span style={{ margin: "0 0.6rem" }}>›</span>
          {t("forum.newThreadBreadcrumb")}
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3rem", letterSpacing: "-0.03em", margin: "0 0 3.2rem" }}>
          {t("forum.newThreadTitle")}
        </h1>

        <form action={createThreadAction} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <input type="hidden" name="categorySlug" value={categorySlug} />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-60)" }}>
              {t("forum.titleLabel")}
            </label>
            <input
              name="title"
              required
              maxLength={200}
              placeholder={t("forum.titlePlaceholder")}
              style={{ padding: "1rem 1.4rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", fontSize: "1.4rem", fontFamily: "var(--font-body)", background: "var(--surface)", color: "var(--ink)", outline: "none", width: "100%", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <label style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-60)" }}>
              {t("forum.bodyLabel")} <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--ink-40)" }}>{t("forum.bodyMarkdown")}</span>
            </label>
            <textarea
              name="body"
              required
              rows={12}
              placeholder={t("forum.bodyPlaceholder")}
              style={{ padding: "1rem 1.4rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", fontSize: "1.3rem", fontFamily: "var(--font-mono)", background: "var(--surface)", color: "var(--ink)", outline: "none", resize: "vertical", width: "100%", boxSizing: "border-box", lineHeight: 1.6 }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
            <a
              href={`/forum/${categorySlug}`}
              style={{ padding: "0.9rem 1.8rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", fontSize: "1.2rem", fontFamily: "var(--font-body)", color: "var(--ink-60)", textDecoration: "none" }}
              className="hover:opacity-70 transition-opacity"
            >
              {t("forum.cancel")}
            </a>
            <button
              type="submit"
              style={{ padding: "0.9rem 2.2rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none", cursor: "pointer" }}
              className="hover:opacity-80 transition-opacity"
            >
              {t("forum.postThread")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
