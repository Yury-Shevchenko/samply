"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import ForumThread from "@/lib/models/forumThread";
import ForumPost from "@/lib/models/forumPost";
import ForumCategory from "@/lib/models/forumCategory";
import mongoose from "mongoose";

async function requireUser() {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  return session;
}

function requireAdmin(session: Awaited<ReturnType<typeof auth>>) {
  if (!session || session.user.level <= 100) redirect("/forum");
}

// ── Thread ────────────────────────────────────────────────────────────────────

export async function createThreadAction(formData: FormData) {
  const session = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const body  = String(formData.get("body")  ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  if (!title || !body || !categorySlug) return;

  await connectDB();
  const category = await ForumCategory.findOne({ slug: categorySlug }).lean();
  if (!category) return;

  const thread = await ForumThread.create({
    title,
    body,
    authorId:     session.user.id,
    authorName:   session.user.name ?? session.user.email ?? "User",
    categoryId:   category._id,
    categorySlug: category.slug,
  });

  redirect(`/forum/${categorySlug}/${thread._id}`);
}

export async function deleteThreadAction(threadId: string, categorySlug: string) {
  const session = await requireUser();
  requireAdmin(session);
  await connectDB();
  await Promise.all([
    ForumThread.deleteOne({ _id: threadId }),
    ForumPost.deleteMany({ threadId }),
  ]);
  redirect(`/forum/${categorySlug}`);
}

export async function pinThreadAction(threadId: string, categorySlug: string) {
  const session = await requireUser();
  requireAdmin(session);
  await connectDB();
  const thread = await ForumThread.findById(threadId);
  if (!thread) return;
  thread.pinned = !thread.pinned;
  await thread.save();
  redirect(`/forum/${categorySlug}/${threadId}`);
}

export async function lockThreadAction(threadId: string, categorySlug: string) {
  const session = await requireUser();
  requireAdmin(session);
  await connectDB();
  const thread = await ForumThread.findById(threadId);
  if (!thread) return;
  thread.locked = !thread.locked;
  await thread.save();
  redirect(`/forum/${categorySlug}/${threadId}`);
}

export async function voteThreadAction(threadId: string, categorySlug: string) {
  const session = await requireUser();
  await connectDB();
  const uid = new mongoose.Types.ObjectId(session.user.id);
  const thread = await ForumThread.findById(threadId);
  if (!thread) return;
  const idx = thread.voters.findIndex((v) => v.equals(uid));
  if (idx === -1) {
    thread.voters.push(uid);
    thread.votes += 1;
  } else {
    thread.voters.splice(idx, 1);
    thread.votes -= 1;
  }
  await thread.save();
  redirect(`/forum/${categorySlug}/${threadId}`);
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export async function createPostAction(formData: FormData) {
  const session = await requireUser();
  const body     = String(formData.get("body")     ?? "").trim();
  const threadId = String(formData.get("threadId") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  if (!body || !threadId) return;

  await connectDB();
  const thread = await ForumThread.findById(threadId);
  if (!thread || thread.locked) return;

  await ForumPost.create({
    threadId,
    body,
    authorId:   session.user.id,
    authorName: session.user.name ?? session.user.email ?? "User",
  });

  thread.replyCount += 1;
  thread.lastReplyAt = new Date();
  await thread.save();

  redirect(`/forum/${categorySlug}/${threadId}`);
}

export async function deletePostAction(postId: string, threadId: string, categorySlug: string) {
  const session = await requireUser();
  requireAdmin(session);
  await connectDB();
  await ForumPost.deleteOne({ _id: postId });
  await ForumThread.updateOne({ _id: threadId }, { $inc: { replyCount: -1 } });
  redirect(`/forum/${categorySlug}/${threadId}`);
}

export async function votePostAction(postId: string, threadId: string, categorySlug: string) {
  const session = await requireUser();
  await connectDB();
  const uid = new mongoose.Types.ObjectId(session.user.id);
  const post = await ForumPost.findById(postId);
  if (!post) return;
  const idx = post.voters.findIndex((v) => v.equals(uid));
  if (idx === -1) {
    post.voters.push(uid);
    post.votes += 1;
  } else {
    post.voters.splice(idx, 1);
    post.votes -= 1;
  }
  await post.save();
  redirect(`/forum/${categorySlug}/${threadId}`);
}

export async function markSolvedAction(threadId: string, postId: string, categorySlug: string) {
  const session = await requireUser();
  await connectDB();
  const thread = await ForumThread.findById(threadId);
  if (!thread) return;
  const isOwner = thread.authorId.equals(new mongoose.Types.ObjectId(session.user.id));
  const isAdmin = session.user.level > 100;
  if (!isOwner && !isAdmin) return;
  thread.solvedPostId = thread.solvedPostId?.equals(new mongoose.Types.ObjectId(postId))
    ? undefined
    : new mongoose.Types.ObjectId(postId);
  await thread.save();
  redirect(`/forum/${categorySlug}/${threadId}`);
}

// ── Admin: categories ─────────────────────────────────────────────────────────

export async function createCategoryAction(formData: FormData) {
  const session = await requireUser();
  requireAdmin(session);
  const name        = String(formData.get("name")        ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const order       = parseInt(String(formData.get("order") ?? "0")) || 0;
  if (!name) return;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  await connectDB();
  await ForumCategory.create({ name, slug, description, order });
  redirect("/admin/forum");
}

export async function updateCategoryAction(categoryId: string, formData: FormData) {
  const session = await requireUser();
  requireAdmin(session);
  const name        = String(formData.get("name")        ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const order       = parseInt(String(formData.get("order") ?? "0")) || 0;
  if (!name) return;
  await connectDB();
  await ForumCategory.updateOne({ _id: categoryId }, { $set: { name, description, order } });
  redirect("/admin/forum");
}

export async function deleteCategoryAction(categoryId: string) {
  const session = await requireUser();
  requireAdmin(session);
  await connectDB();
  const cat = await ForumCategory.findById(categoryId).lean();
  if (!cat) redirect("/admin/forum");
  const threadIds = await ForumThread.find({ categoryId }).distinct("_id");
  await Promise.all([
    ForumPost.deleteMany({ threadId: { $in: threadIds } }),
    ForumThread.deleteMany({ categoryId }),
    ForumCategory.deleteOne({ _id: categoryId }),
  ]);
  redirect("/admin/forum");
}
