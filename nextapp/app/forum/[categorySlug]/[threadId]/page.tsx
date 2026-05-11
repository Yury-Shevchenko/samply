import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumCategory from "@/lib/models/forumCategory";
import ForumThread from "@/lib/models/forumThread";
import ForumPost, { type IForumPost } from "@/lib/models/forumPost";
import MarkdownBody from "@/app/forum/MarkdownBody";
import mongoose from "mongoose";
import {
  createPostAction,
  voteThreadAction,
  votePostAction,
  markSolvedAction,
  pinThreadAction,
  lockThreadAction,
  deleteThreadAction,
  deletePostAction,
} from "@/app/forum/actions";
import { ForumConfirmButton } from "@/app/forum/ForumConfirmButton";

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

const DIVIDER = <div style={{ height: "1px", background: "var(--ink-10)", margin: "0" }} />;

function VoteForm({ action, votes, voted, label = "▲" }: { action: () => Promise<never>; votes: number; voted: boolean; label?: string }) {
  return (
    <form action={action} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", minWidth: "3.2rem" }}>
      <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: voted ? "var(--coral)" : "var(--ink-40)", padding: "0.2rem" }} className="hover:opacity-70 transition-opacity">
        {label}
      </button>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.1rem", color: voted ? "var(--coral)" : "var(--ink-40)", fontWeight: voted ? 600 : 400 }}>
        {votes}
      </span>
    </form>
  );
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ categorySlug: string; threadId: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { categorySlug, threadId } = await params;
  await connectDB();

  const [category, thread] = await Promise.all([
    ForumCategory.findOne({ slug: categorySlug }).lean(),
    ForumThread.findById(threadId).lean(),
  ]);
  if (!category || !thread) notFound();

  const posts = await ForumPost.find({ threadId }).sort({ createdAt: 1 }).lean();

  const uid = new mongoose.Types.ObjectId(session.user.id);
  const isAdmin = session.user.level > 100;
  const isAuthor = thread.authorId.equals(uid);
  const votedThread = thread.voters.some((v) => v.equals(uid));

  const voteThreadBound  = voteThreadAction.bind(null, threadId, categorySlug);
  const pinThreadBound   = pinThreadAction.bind(null, threadId, categorySlug);
  const lockThreadBound  = lockThreadAction.bind(null, threadId, categorySlug);
  const deleteThreadBound = deleteThreadAction.bind(null, threadId, categorySlug);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "5.2rem 4rem 9.6rem" }}>

        {/* Breadcrumb */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginBottom: "2rem", letterSpacing: ".06em" }}>
          <a href="/forum" style={{ color: "var(--ink-40)", textDecoration: "none" }} className="hover:opacity-70">Forum</a>
          <span style={{ margin: "0 0.6rem" }}>›</span>
          <a href={`/forum/${categorySlug}`} style={{ color: "var(--ink-40)", textDecoration: "none" }} className="hover:opacity-70">{category.name}</a>
        </div>

        {/* Thread card */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", overflow: "hidden", marginBottom: "2rem" }}>

          {/* Thread header */}
          <div style={{ padding: "2.4rem 2.4rem 2rem", display: "flex", gap: "1.6rem", alignItems: "flex-start" }}>
            <VoteForm action={voteThreadBound} votes={thread.votes} voted={votedThread} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center", marginBottom: "0.8rem" }}>
                {thread.pinned && <span style={{ fontSize: "1rem", fontFamily: "var(--font-mono)", color: "var(--coral)", background: "rgba(214,90,48,.08)", padding: "2px 8px", borderRadius: 999 }}>pinned</span>}
                {thread.locked && <span style={{ fontSize: "1rem", fontFamily: "var(--font-mono)", color: "var(--ink-40)", background: "var(--ink-10)", padding: "2px 8px", borderRadius: 999 }}>locked</span>}
                {thread.solvedPostId && <span style={{ fontSize: "1rem", fontFamily: "var(--font-mono)", color: "var(--sage)", background: "rgba(61,115,107,.08)", padding: "2px 8px", borderRadius: 999 }}>✓ solved</span>}
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2.4rem", letterSpacing: "-0.03em", margin: "0 0 0.6rem", lineHeight: 1.15 }}>
                {thread.title}
              </h1>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)" }}>
                {thread.authorName} · {fmt(thread.createdAt)}
              </div>
            </div>
          </div>

          {DIVIDER}

          <div style={{ padding: "2rem 2.4rem 2rem", paddingLeft: "calc(2.4rem + 3.2rem + 1.6rem)" }}>
            <MarkdownBody>{thread.body}</MarkdownBody>
          </div>

          {/* Admin controls on thread */}
          {isAdmin && (
            <>
              {DIVIDER}
              <div style={{ padding: "1.2rem 2rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                <form action={pinThreadBound}>
                  <button type="submit" style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", padding: "0.5rem 1.2rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", background: "none", cursor: "pointer", color: thread.pinned ? "var(--coral)" : "var(--ink-60)" }} className="hover:opacity-70 transition-opacity">
                    {thread.pinned ? "Unpin" : "Pin"}
                  </button>
                </form>
                <form action={lockThreadBound}>
                  <button type="submit" style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", padding: "0.5rem 1.2rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", background: "none", cursor: "pointer", color: thread.locked ? "var(--sage)" : "var(--ink-60)" }} className="hover:opacity-70 transition-opacity">
                    {thread.locked ? "Unlock" : "Lock"}
                  </button>
                </form>
                <ForumConfirmButton
                  action={deleteThreadBound}
                  message="Delete this thread and all its replies?"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", padding: "0.5rem 1.2rem", border: "1px solid rgba(214,90,48,.3)", borderRadius: "9999px", background: "none", cursor: "pointer", color: "var(--coral)" }}
                >
                  Delete thread
                </ForumConfirmButton>
              </div>
            </>
          )}
        </div>

        {/* Posts */}
        {posts.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {(posts as IForumPost[]).map((post) => {
              const votedPost    = post.voters.some((v) => v.equals(uid));
              const isSolved     = thread.solvedPostId?.equals(post._id);
              const votePostBound   = votePostAction.bind(null, String(post._id), threadId, categorySlug);
              const deletePostBound = deletePostAction.bind(null, String(post._id), threadId, categorySlug);
              const markSolvedBound = markSolvedAction.bind(null, threadId, String(post._id), categorySlug);

              return (
                <div
                  key={String(post._id)}
                  id={`post-${post._id}`}
                  style={{ background: isSolved ? "rgba(61,115,107,.04)" : "var(--surface)", border: isSolved ? "1px solid rgba(61,115,107,.25)" : "1px solid var(--ink-10)", borderRadius: "1rem", overflow: "hidden" }}
                >
                  <div style={{ padding: "1.8rem 2rem", display: "flex", gap: "1.4rem", alignItems: "flex-start" }}>
                    <VoteForm action={votePostBound} votes={post.votes} voted={votedPost} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {isSolved && (
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--sage)", fontWeight: 600, marginBottom: "0.8rem" }}>✓ Accepted answer</div>
                      )}
                      <MarkdownBody>{post.body}</MarkdownBody>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", marginTop: "1.2rem", display: "flex", gap: "1.4rem", flexWrap: "wrap", alignItems: "center" }}>
                        <span>{post.authorName} · {fmt(post.createdAt)}</span>
                        {(isAuthor || isAdmin) && !thread.locked && (
                          <form action={markSolvedBound} style={{ display: "inline" }}>
                            <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "1rem", color: isSolved ? "var(--sage)" : "var(--ink-40)", padding: 0 }} className="hover:opacity-70 transition-opacity">
                              {isSolved ? "✓ Solved" : "Mark as answer"}
                            </button>
                          </form>
                        )}
                        {isAdmin && (
                          <ForumConfirmButton
                            action={deletePostBound}
                            message="Delete this reply?"
                            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--coral)", padding: 0 }}
                          >
                            Delete
                          </ForumConfirmButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Reply form */}
        {!thread.locked ? (
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem", padding: "2rem 2.4rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-60)", marginBottom: "1.2rem" }}>
              Your reply
            </div>
            <form action={createPostAction} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <input type="hidden" name="threadId" value={threadId} />
              <input type="hidden" name="categorySlug" value={categorySlug} />
              <textarea
                name="body"
                required
                rows={6}
                placeholder="Write your reply… Markdown is supported."
                style={{ padding: "1rem 1.2rem", border: "1px solid var(--ink-20)", borderRadius: "0.6rem", fontSize: "1.3rem", fontFamily: "var(--font-mono)", background: "var(--paper)", color: "var(--ink)", outline: "none", resize: "vertical", width: "100%", boxSizing: "border-box", lineHeight: 1.6 }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  style={{ padding: "0.9rem 2rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "9999px", fontSize: "1.2rem", fontWeight: 500, fontFamily: "var(--font-body)", border: "none", cursor: "pointer" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  Post reply
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2.4rem", fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--ink-40)", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1rem" }}>
            This thread is locked — no new replies.
          </div>
        )}
      </div>
    </main>
  );
}
