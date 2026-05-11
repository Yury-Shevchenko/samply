"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Testimonial from "@/lib/models/testimonial";
import mongoose from "mongoose";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");
}

export async function approveTestimonial(id: string) {
  await requireAdmin();
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  await Testimonial.findByIdAndUpdate(id, { approved: true });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function unapproveTestimonial(id: string) {
  await requireAdmin();
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  await Testimonial.findByIdAndUpdate(id, { approved: false });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
