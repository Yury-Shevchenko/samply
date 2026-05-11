import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import stripe from "@/lib/stripe";
import Donation from "@/lib/models/donation";

export const metadata = { title: "Thank you — Samply" };

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/donate");

  await connectDB();

  // Retrieve session from Stripe to get donor info and confirm payment
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["customer_details"],
    });
  } catch {
    redirect("/donate");
  }

  // Update our donation record with confirmed data
  const donorEmail = session.customer_details?.email ?? undefined;
  const donorName = session.customer_details?.name ?? undefined;
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : undefined;

  await Donation.updateOne(
    { stripeSessionId: session_id },
    {
      $set: {
        status: "completed",
        ...(donorEmail && { donorEmail }),
        ...(donorName && { donorName }),
        ...(subscriptionId && { stripeSubscriptionId: subscriptionId }),
      },
    },
  );

  const amountEur = (session.amount_total ?? 0) / 100;
  const isMonthly = session.mode === "subscription";

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "8rem 4rem", textAlign: "center" }}>
        <div style={{ fontSize: "5rem", marginBottom: "2rem" }}>♥</div>
        <h1
          className="font-[family-name:var(--font-display)] font-bold"
          style={{ fontSize: "3.2rem", letterSpacing: "-0.025em", marginBottom: "1.4rem" }}
        >
          Thank you!
        </h1>
        <p style={{ fontSize: "1.5rem", color: "var(--ink-60)", lineHeight: 1.65, marginBottom: "3rem" }}>
          Your {isMonthly ? "monthly " : ""}donation of{" "}
          <strong style={{ color: "var(--ink)" }}>€{amountEur.toFixed(2)}</strong>{" "}
          {isMonthly ? "subscription is now active" : "has been received"}.
          It goes directly toward keeping Samply free and open for researchers everywhere.
        </p>
        {isMonthly && (
          <p style={{ fontSize: "1.25rem", color: "var(--ink-40)", marginBottom: "3rem" }}>
            You can manage or cancel your subscription at any time — just contact us.
          </p>
        )}
        <a
          href="/dashboard"
          style={{
            display: "inline-block",
            padding: "0.9rem 2.4rem",
            borderRadius: "9999px",
            background: "var(--ink)",
            color: "var(--paper)",
            fontSize: "1.3rem",
            fontWeight: 500,
            textDecoration: "none",
            fontFamily: "var(--font-body)",
          }}
        >
          Back to dashboard
        </a>
      </div>
    </main>
  );
}
