import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumCategory from "@/lib/models/forumCategory";
import ForumThread from "@/lib/models/forumThread";

const PAGE_SIZE = 30;

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { categorySlug } = await params;
  const { page: pageStr = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  await connectDB();
  const category = await ForumCategory.findOne({ slug: categorySlug }).lean();
  if (!category) notFound();

  const [threads, count] = await Promise.all([
    ForumThread.find({ categoryId: category._id })
      .sort({ pinned: -1, lastReplyAt: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean(),
    ForumThread.countDocuments({ categoryId: category._id }),
  ]);

  const pages = Math.ceil(count / PAGE_SIZE);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5.2rem 4rem 9.6rem" }}>

        {/* Breadcrumb + header */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginBottom: "1.2rem", letterSpacing: ".06em" }}>
          <a href="/forum" style={{ color: "var(--ink-40)", textDecoration: "none" }} className="hover:opacity-70">Forum</a>
          <span style={{ margin: "0 0.6rem" }}>›</span>
          {category.name}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1.2rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "3.2rem", letterSpacing: "-0.03em", margin: "0 0 0.4rem" }}>
              {category.name}
            </h1>
            {category.description && (
              <p style={{ fontSize: "1.3rem", color: "var(--ink-60)", margin: 0 }}>{category.description}</p>
            )}
          </div>
          <a
            href={`/forum/${categorySlug}/new`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9rem 1.8rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, textDecoration: "none", fontFamily: "var(--font-body)", flexShrink: 0 }}
            className="hover:opacity-80 transition-opacity"
          >
            + New thread
          </a>
        </div>

        {/* Thread list */}
        {threads.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--ink-40)", fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}>
            No threads yet — be the first to post.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {threads.map((t) => (
              <a
                key={String(t._id)}
                href={`/forum/${categorySlug}/${t._id}`}
                style={{ display: "flex", alignItems: "center", gap: "1.6rem", padding: "1.4rem 1.8rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", textDecoration: "none", color: "inherit" }}
                className="hover:border-[var(--ink-40)] transition-colors"
              >
                {/* Votes */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", minWidth: "3.2rem", textAlign: "center", flexShrink: 0 }}>
                  ▲ {t.votes}
                </div>

                {/* Title + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                    {t.pinned && (
                      <span style={{ fontSize: "1rem", fontFamily: "var(--font-mono)", color: "var(--coral)", background: "rgba(214,90,48,.08)", padding: "1px 7px", borderRadius: 999, letterSpacing: ".06em" }}>pinned</span>
                    )}
                    {t.locked && (
                      <span style={{ fontSize: "1rem", fontFamily: "var(--font-mono)", color: "var(--ink-40)", background: "var(--ink-10)", padding: "1px 7px", borderRadius: 999, letterSpacing: ".06em" }}>locked</span>
                    )}
                    {t.solvedPostId && (
                      <span style={{ fontSize: "1rem", fontFamily: "var(--font-mono)", color: "var(--sage)", background: "rgba(61,115,107,.08)", padding: "1px 7px", borderRadius: 999, letterSpacing: ".06em" }}>solved</span>
                    )}
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.4rem", letterSpacing: "-0.01em", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t.title}
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)" }}>
                    {t.authorName} · {fmt(t.createdAt)}
                  </div>
                </div>

                {/* Reply count */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-40)", flexShrink: 0, textAlign: "right" }}>
                  <div>{t.replyCount} replies</div>
                  <div style={{ fontSize: "1rem", marginTop: "0.2rem" }}>{fmt(t.lastReplyAt)}</div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "3.2rem" }}>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/forum/${categorySlug}?page=${p}`}
                style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", padding: "0.5rem 1rem", borderRadius: "0.4rem", textDecoration: "none", background: p === page ? "var(--ink)" : "var(--surface)", color: p === page ? "var(--paper)" : "var(--ink-60)", border: "1px solid var(--ink-10)" }}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
