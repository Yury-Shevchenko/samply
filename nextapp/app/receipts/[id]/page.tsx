import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { fetchParticipantBysamplyId, fetchReceipts } from "@/lib/data/participants";
import type { IReceipt } from "@/lib/models/receipt";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Receipts — Samply" };

function fmt(date: Date | string) {
  return new Date(date).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ReceiptsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const { id: samplyId } = await params;

  const participant = await fetchParticipantBysamplyId(samplyId);
  if (!participant) notFound();

  const p = participant as unknown as {
    name?: string;
    email?: string;
    stripeInformation?: { payouts_enabled?: boolean };
  };

  const receipts = await fetchReceipts(samplyId, session.user.id);

  return (
    <div className="inner">
      <p />
      <nav>
        <a href={`/payout/${samplyId}`}>{t("legacyPayouts.tabPayouts")}</a>
        {" | "}
        <strong>{t("legacyPayouts.tabReceipts")}</strong>
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

      <h2>{t("legacyPayouts.tabReceipts")}</h2>

      <p>
        <a href={`/downloadreceipts/${samplyId}`}>⬇ Download CSV</a>
      </p>

      {receipts.length === 0 ? (
        <p>{t("legacyPayouts.noReceipts")}</p>
      ) : (
        <div className="card">
          <div className="users">
            <table className="table">
              <thead>
                <tr>
                  <td>№</td>
                  <td>{t("legacyPayouts.colDate")}</td>
                  <td>{t("legacyPayouts.colReceiptId")}</td>
                  <td>{t("legacyPayouts.colStatus")}</td>
                  <td>{t("legacyPayouts.colCurrency")}</td>
                  <td>{t("legacyPayouts.colAmount")}</td>
                  <td>{t("legacyPayouts.colFee")}</td>
                  <td>{t("legacyPayouts.colUrl")}</td>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r: IReceipt, i: number) => (
                  <tr key={String(r._id)}>
                    <td>{i + 1}</td>
                    <td>{fmt(r.created)}</td>
                    <td>{r.receiptId}</td>
                    <td>{r.status}</td>
                    <td>{r.paymentInfo?.currency}</td>
                    <td>{r.paymentInfo?.amount}</td>
                    <td>{r.paymentInfo?.fee}</td>
                    <td>
                      {r.paymentInfo?.url && (
                        <a href={r.paymentInfo.url} target="_blank" rel="noreferrer">
                          Link
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
