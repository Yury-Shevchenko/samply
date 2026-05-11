import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

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

  const { id } = await params;
  const receipt = await fetchReceipt(id);

  return (
    <div className="inner">
      <div className="card">
        <h2>Push Receipt</h2>

        {receipt ? (
          <>
            <p>
              <strong>Note:</strong> Even if a receipt&apos;s status says &ldquo;ok&rdquo;, this
              doesn&apos;t guarantee that the device received the message. &ldquo;ok&rdquo; means the
              Android or iOS push notification service successfully received the notification — if the
              device is off, the service will try to deliver it later.
            </p>

            <table className="table">
              <tbody>
                <tr>
                  <td><strong>Receipt ID</strong></td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>{receipt.status}</td>
                </tr>
                {receipt.message && (
                  <tr>
                    <td><strong>Message</strong></td>
                    <td>{receipt.message}</td>
                  </tr>
                )}
                {receipt.details && (
                  <tr>
                    <td><strong>Details</strong></td>
                    <td>{JSON.stringify(receipt.details)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p>Push receipts are cleared after 24 hours.</p>
            <p>
              Expo recommends checking push receipts 15 minutes after sending notifications. If after
              15 minutes there is no receipt, this likely indicates an error with the push notification
              service.{" "}
              <a
                href="https://docs.expo.dev/push-notifications/sending-notifications/#check-push-receipts-for-errors"
                target="_blank"
                rel="noreferrer"
              >
                Read more about push receipts.
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
