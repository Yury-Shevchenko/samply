"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Donation from "@/lib/models/donation";

export async function deleteDonationAction(id: string) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
  await connectDB();
  await Donation.deleteOne({ _id: id });
  redirect("/admin/donations");
}
