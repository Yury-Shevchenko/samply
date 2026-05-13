"use server";

import { redirect } from "next/navigation";
import stripe from "@/lib/stripe";
import connectDB from "@/lib/db";
import Donation from "@/lib/models/donation";

const ORIGIN = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export async function createDonationSession(formData: FormData) {
  const frequency = formData.get("frequency") as "one-time" | "monthly";
  const amountRaw = formData.get("amount");
  const customRaw = formData.get("customAmount");

  const amountEur = amountRaw === "custom"
    ? parseFloat(String(customRaw))
    : parseFloat(String(amountRaw));

  const MAX_DONATION_EUR = 10_000;
  if (!amountEur || isNaN(amountEur) || amountEur < 1 || amountEur > MAX_DONATION_EUR) {
    redirect("/donate?error=invalid_amount");
  }

  const amountCents = Math.round(amountEur * 100);
  const isMonthly = frequency === "monthly";

  const priceData = {
    currency: "eur",
    unit_amount: amountCents,
    product_data: {
      name: `Samply donation${isMonthly ? " (monthly)" : ""}`,
      description: "Support the open-source Samply research platform",
    },
    ...(isMonthly ? { recurring: { interval: "month" as const } } : {}),
  };

  await connectDB();

  const session = await stripe.checkout.sessions.create({
    mode: isMonthly ? "subscription" : "payment",
    line_items: [{ price_data: priceData, quantity: 1 }],
    success_url: `${ORIGIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ORIGIN}/donate?cancelled=1`,
    allow_promotion_codes: false,
    metadata: { frequency, amountCents: String(amountCents) },
  });

  // Create a pending donation record immediately so we don't rely solely on the webhook
  await Donation.create({
    stripeSessionId: session.id,
    amountCents,
    currency: "eur",
    frequency,
    status: "pending",
  });

  redirect(session.url!);
}
