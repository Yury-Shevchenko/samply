import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumThread, { type IForumThread } from "@/lib/models/forumThread";
import type { Types } from "mongoose";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Forum Search — Samply" };

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function ForumSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { q = "" } = await searchParams;
  const query = q.trim();

  let results: (IForumThread & { _id: Types.ObjectId })[] = [];
  if (query.length >= 2) {
    await connectDB();
    results = await ForumThread.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(40)
      .lean() as (IForumThread & { _id: Types.ObjectId })[];
  }

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5.2rem var(--page-px) 9.6rem" }}>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginBottom: "1.2rem", letterSpacing: ".06em" }}>
          <a href="/forum" style={{ color: "var(--ink-40)", textDecoration: "none" }} className="hover:opacity-70">{t("forum.breadcrumb")}</a>
          <span style={{ margin: "0 0.6rem" }}>›</span>
          {t("forum.searchBreadcrumb")}
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3.2rem", letterSpacing: "-0.03em", margin: "0 0 2.8rem" }}>
          {t("forum.searchTitle")}
        </h1>

        {/* Search form */}
        <form method="get" style={{ display: "flex", gap: "1rem", marginBottom: "3.6rem" }}>
          <input
            name="q"
            defaultValue={query}
            autoFocus
            placeholder={t("forum.searchPlaceholder")}
            style={{ flex: 1, padding: "1rem 1.4rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", fontSize: "1.4rem", fontFamily: "var(--font-body)", background: "var(--surface)", color: "var(--ink)", outline: "none" }}
          />
          <button
            type="submit"
            style={{ padding: "1rem 2rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.3rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
            className="hover:opacity-80 transition-opacity"
          >
            {t("forum.searchButton")}
          </button>
        </form>

        {/* Results */}
        {query.length >= 2 ? (
          results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--ink-40)", fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}>
              {t("forum.noResults", { query })}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginBottom: "0.4rem" }}>
                {t(results.length === 1 ? "forum.resultsCount" : "forum.resultsCountPlural", { n: results.length })} for &ldquo;{query}&rdquo;
              </div>
              {results.map((thread) => (
                <a
                  key={String(thread._id)}
                  href={`/forum/${thread.categorySlug}/${thread._id}`}
                  style={{ display: "block", padding: "1.4rem 1.8rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", textDecoration: "none", color: "inherit" }}
                  className="hover:border-[var(--ink-40)] transition-colors"
                >
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.4rem", letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "0.3rem" }}>
                    {thread.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)" }}>
                    {thread.authorName} · {fmt(thread.createdAt)} · {thread.replyCount} replies
                    {thread.solvedPostId && <span style={{ marginLeft: "0.8rem", color: "var(--sage)" }}>{t("forum.solvedBadge")}</span>}
                  </div>
                </a>
              ))}
            </div>
          )
        ) : query.length > 0 ? (
          <div style={{ textAlign: "center", color: "var(--ink-40)", fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}>
            {t("forum.tooShort")}
          </div>
        ) : null}
      </div>
    </main>
  );
}
