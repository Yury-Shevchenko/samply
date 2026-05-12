import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import connectDB from "@/lib/db";
import Donation from "@/lib/models/donation";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, secret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${(err as Error).message}` }, { status: 400 });
  }

  await connectDB();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const isSubscription = session.mode === "subscription";
    const subscriptionId = typeof session.subscription === "string" ? session.subscription : undefined;

    await Donation.updateOne(
      { stripeSessionId: session.id },
      {
        $set: {
          status: "completed",
          donorEmail: session.customer_details?.email ?? undefined,
          donorName: session.customer_details?.name ?? undefined,
          ...(subscriptionId && { stripeSubscriptionId: subscriptionId }),
          frequency: isSubscription ? "monthly" : "one-time",
        },
      },
      { upsert: true },
    );
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as unknown as { subscription?: string | null; amount_paid: number; currency: string; id: string };
    const subscriptionId = typeof invoice.subscription === "string" ? invoice.subscription : undefined;
    if (!subscriptionId) return NextResponse.json({ received: true });

    // Record renewal of a monthly subscription as a new donation row
    const existing = await Donation.findOne({ stripeSubscriptionId: subscriptionId, status: "completed" });
    if (existing) {
      await Donation.create({
        stripeSessionId: `${subscriptionId}_${invoice.id}`,
        stripeSubscriptionId: subscriptionId,
        donorEmail: existing.donorEmail,
        donorName: existing.donorName,
        amountCents: invoice.amount_paid,
        currency: invoice.currency,
        frequency: "monthly",
        status: "completed",
      });
    }
  }

  if (event.type === "checkout.session.expired" || event.type === "payment_intent.payment_failed") {
    const obj = event.data.object as { id?: string };
    if (obj.id) {
      await Donation.updateOne({ stripeSessionId: obj.id }, { $set: { status: "failed" } });
    }
  }

  return NextResponse.json({ received: true });
}
