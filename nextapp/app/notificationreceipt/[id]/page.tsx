import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Push Receipt — Samply" };

interface ExpoReceipt {
  status: "ok" | "error";
  message?: string;
  details?: { error?: string };
}

async function fetchReceipt(id: string): Promise<ExpoReceipt | null> {
  try {
    const res = await fetch("https://exp.host/--/api/v2/push/getReceipts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
      cache: "no-store",
    });
    const json = (await res.json()) as { data?: Record<string, ExpoReceipt> };
    return json?.data?.[id] ?? null;
  } catch {
    return null;
  }
}

export default async function NotificationReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 10) redirect("/login");
  const { t } = await getT();

  const { id } = await params;
  const receipt = await fetchReceipt(id);

  return (
    <div className="inner">
      <div className="card">
        <h2>{t("pushReceipt.title")}</h2>

        {receipt ? (
          <>
            <p>{t("pushReceipt.note")}</p>

            <table className="table">
              <tbody>
                <tr>
                  <td><strong>{t("pushReceipt.receiptId")}</strong></td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td><strong>{t("pushReceipt.status")}</strong></td>
                  <td>{receipt.status}</td>
                </tr>
                {receipt.message && (
                  <tr>
                    <td><strong>{t("pushReceipt.message")}</strong></td>
                    <td>{receipt.message}</td>
                  </tr>
                )}
                {receipt.details && (
                  <tr>
                    <td><strong>{t("pushReceipt.details")}</strong></td>
                    <td>{JSON.stringify(receipt.details)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p>{t("pushReceipt.cleared")}</p>
            <p>
              {t("pushReceipt.missingPre")}{" "}
              <a
                href="https://docs.expo.dev/push-notifications/sending-notifications/#check-push-receipts-for-errors"
                target="_blank"
                rel="noreferrer"
              >
                {t("pushReceipt.missingLink")}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
