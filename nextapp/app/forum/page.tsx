import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumCategory from "@/lib/models/forumCategory";
import ForumThread from "@/lib/models/forumThread";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Forum — Samply" };

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function ForumPage() {
  const { t } = await getT();
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  await connectDB();

  const categories = await ForumCategory.find({}).sort({ order: 1, createdAt: 1 }).lean();

  const threadStats = await Promise.all(
    categories.map(async (cat) => {
      const [count, latest] = await Promise.all([
        ForumThread.countDocuments({ categoryId: cat._id }),
        ForumThread.findOne({ categoryId: cat._id }).sort({ lastReplyAt: -1 }).lean(),
      ]);
      return { categoryId: String(cat._id), count, latest };
    }),
  );
  const statsMap = new Map(threadStats.map((s) => [s.categoryId, s]));

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5.2rem var(--page-px) 9.6rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.6rem" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.8rem" }}>
              {t("forum.communityLabel")}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "4rem", letterSpacing: "-0.03em", margin: 0, lineHeight: 1 }}>
              {t("forum.title")}
            </h1>
          </div>
          <a href="/forum/search" style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", letterSpacing: ".06em", color: "var(--ink-60)", textDecoration: "none", padding: "0.7rem 1.4rem", border: "1px solid var(--ink-20)", borderRadius: "9999px" }} className="hover:opacity-70 transition-opacity">
            {t("forum.search")}
          </a>
        </div>

        {/* Category list */}
        {categories.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--ink-40)", fontFamily: "var(--font-mono)", fontSize: "1.2rem" }}>
            {t("forum.noCategories")}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {categories.map((cat) => {
              const stats = statsMap.get(String(cat._id));
              return (
                <a
                  key={String(cat._id)}
                  href={`/forum/${cat.slug}`}
                  style={{ display: "block", padding: "2rem 2.4rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", textDecoration: "none", color: "inherit" }}
                  className="hover:border-[var(--ink-40)] transition-colors"
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.7rem", letterSpacing: "-0.02em", marginBottom: "0.5rem", color: "var(--ink)" }}>
                        {cat.name}
                      </div>
                      {cat.description && (
                        <div style={{ fontSize: "1.2rem", color: "var(--ink-60)", lineHeight: 1.5 }}>
                          {cat.description}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: "var(--ink-60)" }}>
                        {t("forum.threads", { n: stats?.count ?? 0 })}
                      </div>
                      {stats?.latest && (
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginTop: "0.3rem" }}>
                          {fmt(stats.latest.lastReplyAt)}
                        </div>
                      )}
                    </div>
                  </div>
                  {stats?.latest && (
                    <div style={{ marginTop: "1.2rem", paddingTop: "1.2rem", borderTop: "1px solid var(--ink-10)", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {t("forum.latest", { title: stats.latest.title })}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
