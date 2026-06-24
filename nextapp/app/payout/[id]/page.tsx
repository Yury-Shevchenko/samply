import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchParticipantBysamplyId, researcherCanAccessParticipant } from "@/lib/data/participants";
import { recordAccess } from "@/lib/data/audit";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Payout — Samply" };

export default async function PayoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const { id: samplyId } = await params;

  if (!(await researcherCanAccessParticipant(session.user.id, samplyId))) notFound();

  const participant = await fetchParticipantBysamplyId(samplyId);
  if (!participant) notFound();

  await recordAccess({
    actorUserId: session.user.id,
    actorEmail: session.user.email ?? undefined,
    action: "view_payout",
    targetSamplyId: samplyId,
  });

  const p = participant as unknown as {
    name?: string;
    email?: string;
    stripeInformation?: { payouts_enabled?: boolean };
  };

  return (
    <div className="inner">
      <p />
      <nav>
        <strong>{t("legacyPayouts.tabPayouts")}</strong>
        {" | "}
        <a href={`/receipts/${samplyId}`}>{t("legacyPayouts.tabReceipts")}</a>
      </nav>

      <h2>{t("legacyPayouts.participantInfo")}</h2>
      <div className="participantInformation">
        <div className="cell">{t("legacyPayouts.idLabel")}</div>
        <div className="cell">{samplyId}</div>
        {p.name && (
          <>
            <div className="cell">{t("legacyPayouts.nameLabel")}</div>
            <div className="cell">{p.name}</div>
          </>
        )}
        {p.stripeInformation?.payouts_enabled && (
          <>
            <div className="cell">{t("legacyPayouts.emailLabel")}</div>
            <div className="cell">{p.email}</div>
          </>
        )}
        <div className="cell">{t("legacyPayouts.paymentsLabel")}</div>
        <div className="cell">
          {p.stripeInformation?.payouts_enabled ? t("legacyPayouts.enabled") : t("legacyPayouts.disabled")}
        </div>
      </div>

      {p.stripeInformation?.payouts_enabled ? (
        <>
          <h2>{t("legacyPayouts.sendPayment")}</h2>
          {/* Payment form still handled by Express Stripe integration */}
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="samplyid" value={samplyId} />

            <label htmlFor="currency">{t("legacyPayouts.currencyLabel")}</label>
            <div className="custom-select">
              <select name="currency" id="currency">
                <option value="eur">Euro</option>
                <option value="usd">USD</option>
              </select>
            </div>

            <label htmlFor="amount">{t("legacyPayouts.amountLabel")}</label>
            <input type="text" name="amount" id="amount" placeholder="e.g. 5.00" required />

            <p />
            <input type="submit" className="button" value={t("legacyPayouts.sendButton")} />
          </form>
        </>
      ) : (
        <p>{t("legacyPayouts.notSetUp")}</p>
      )}
    </div>
  );
}
