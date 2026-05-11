"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import mongoose from "mongoose";

async function requireSuperAdmin() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
}

export async function confirmUserEmailAction(userId: string) {
  await requireSuperAdmin();
  await connectDB();
  await User.updateOne({ _id: userId }, { $set: { emailIsConfirmed: true } });
  redirect(`/admin/users/${userId}`);
}

export async function deleteUserAction(userId: string) {
  await requireSuperAdmin();
  await connectDB();

  const user = await User.findById(userId).lean() as { samplyId?: string } | null;
  if (!user) redirect("/admin/users");

  const Result = mongoose.model("Result");
  const resultsCount = await Result.countDocuments({ samplyid: user.samplyId });

  if (resultsCount > 0) {
    await Promise.all([
      Result.deleteMany({ samplyid: user.samplyId }),
      User.deleteOne({ _id: userId }),
    ]);
  } else {
    await User.deleteOne({ _id: userId });
  }

  redirect("/admin/users");
}
