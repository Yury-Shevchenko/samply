"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Testimonial from "@/lib/models/testimonial";

export async function submitTestimonial(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const text      = String(formData.get("text") ?? "").trim();
  const name      = String(formData.get("name") ?? "").trim();
  const role      = String(formData.get("role") ?? "").trim();
  const institute = String(formData.get("institute") ?? "").trim();

  if (!text || !name) return;

  await connectDB();
  await Testimonial.create({
    text,
    name,
    role:      role || undefined,
    institute: institute || undefined,
    authorId:  session.user.id,
    approved:  false,
  });

  redirect("/testimonial?submitted=1");
}
