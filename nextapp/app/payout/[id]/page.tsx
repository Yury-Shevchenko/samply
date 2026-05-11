import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchParticipantBysamplyId } from "@/lib/data/participants";

export const metadata = { title: "Payout — Samply" };

export default async function PayoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");

  const { id: samplyId } = await params;

  const participant = await fetchParticipantBysamplyId(samplyId);
  if (!participant) notFound();

  const p = participant as unknown as {
    name?: string;
    email?: string;
    stripeInformation?: { payouts_enabled?: boolean };
  };

  return (
    <div className="inner">
      <p />
      <nav>
        <strong>Payouts</strong>
        {" | "}
        <a href={`/receipts/${samplyId}`}>Receipts</a>
      </nav>

      <h2>Participant info</h2>
      <div className="participantInformation">
        <div className="cell">Samply ID</div>
        <div className="cell">{samplyId}</div>
        {p.name && (
          <>
            <div className="cell">Name</div>
            <div className="cell">{p.name}</div>
          </>
        )}
        {p.stripeInformation?.payouts_enabled && (
          <>
            <div className="cell">Email</div>
            <div className="cell">{p.email}</div>
          </>
        )}
        <div className="cell">Payments</div>
        <div className="cell">
          {p.stripeInformation?.payouts_enabled ? "Enabled" : "Disabled"}
        </div>
      </div>

      {p.stripeInformation?.payouts_enabled ? (
        <>
          <h2>Send payment</h2>
          {/* Payment form still handled by Express Stripe integration */}
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="samplyid" value={samplyId} />

            <label htmlFor="currency">Currency</label>
            <div className="custom-select">
              <select name="currency" id="currency">
                <option value="eur">Euro</option>
                <option value="usd">USD</option>
              </select>
            </div>

            <label htmlFor="amount">Amount</label>
            <input type="text" name="amount" id="amount" placeholder="e.g. 5.00" required />

            <p />
            <input type="submit" className="button" value="Send payment" />
          </form>
        </>
      ) : (
        <p>This participant has not set up a payment account yet.</p>
      )}
    </div>
  );
}
