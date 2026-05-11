import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Donation, { type IDonation } from "@/lib/models/donation";
import { AdminPage, AdminTable, AdminPagination, TD_STYLE, TD_MONO } from "../shared";
import { ConfirmDeleteButton } from "../ConfirmDeleteButton";
import { deleteDonationAction } from "./actions";

export const metadata = { title: "Admin: Donations — Samply" };

const PAGE_SIZE = 50;

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    completed: { bg: "rgba(61,115,107,.10)", color: "var(--sage)" },
    pending:   { bg: "rgba(214,90,48,.10)",  color: "var(--coral)" },
    failed:    { bg: "rgba(214,90,48,.18)",  color: "var(--coral)" },
  };
  const s = styles[status] ?? styles.pending;
  return (
    <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, ...s }}>
      {status}
    </span>
  );
}

export default async function AdminDonationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  const { page: pageStr = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageStr) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  await connectDB();

  const [donations, count] = await Promise.all([
    Donation.find({}).sort({ created: -1 }).skip(skip).limit(PAGE_SIZE).lean(),
    Donation.countDocuments({}),
  ]);

  const pages = Math.ceil(count / PAGE_SIZE);

  const completed = donations.filter((d) => d.status === "completed");
  const totalEur = completed.reduce((s, d) => s + d.amountCents / 100, 0);
  const monthlyDonors = new Set(
    completed.filter((d) => d.frequency === "monthly").map((d) => d.donorEmail ?? d.stripeSubscriptionId),
  ).size;

  return (
    <AdminPage title="Donations" count={count}>

      {/* Summary chips */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "total received", value: `€${totalEur.toFixed(2)}`, color: "var(--sage)" },
          { label: "monthly donors", value: monthlyDonors, color: "var(--ink-60)" },
          { label: "completed",      value: completed.length, color: "var(--ink-40)" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{ fontSize: 12, padding: "5px 12px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--ink-10)", color }}
          >
            <strong>{value}</strong> {label}
          </div>
        ))}
      </div>

      <AdminTable headers={["", "#", "Date", "Status", "Frequency", "Amount", "Donor email", "Donor name"]}>
        {(donations as unknown as IDonation[]).map((d, i) => {
          const deleteAction = deleteDonationAction.bind(null, String(d._id));
          const label = d.donorEmail ?? d.donorName ?? `${d.currency.toUpperCase()} ${(d.amountCents / 100).toFixed(2)}`;
          return (
            <tr key={String(d._id)} style={{ borderBottom: "1px solid var(--ink-10)" }}>
              <td style={{ ...TD_STYLE, width: 36, padding: "9px 8px 9px 14px" }}>
                <ConfirmDeleteButton
                  action={deleteAction}
                  message={`Delete donation record from "${label}"? This only removes the local record — the Stripe transaction is unaffected.`}
                />
              </td>
              <td style={{ ...TD_MONO, color: "var(--ink-40)" }}>{i + 1 + skip}</td>
              <td style={{ ...TD_STYLE }}>{fmt(d.created)}</td>
              <td style={{ ...TD_STYLE }}><StatusBadge status={d.status} /></td>
              <td style={{ ...TD_STYLE }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: d.frequency === "monthly" ? "rgba(124,106,181,.1)" : "var(--ink-10)", color: d.frequency === "monthly" ? "#7c6ab5" : "var(--ink-40)" }}>
                  {d.frequency}
                </span>
              </td>
              <td style={{ ...TD_MONO, fontWeight: 600, color: "var(--ink)" }}>
                {d.currency.toUpperCase()} {(d.amountCents / 100).toFixed(2)}
              </td>
              <td style={{ ...TD_STYLE }}>{d.donorEmail ?? <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
              <td style={{ ...TD_STYLE }}>{d.donorName ?? <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
            </tr>
          );
        })}
        {donations.length === 0 && (
          <tr>
            <td colSpan={8} style={{ ...TD_STYLE, textAlign: "center", color: "var(--ink-20)", padding: "3rem" }}>
              No donations yet.
            </td>
          </tr>
        )}
      </AdminTable>

      <AdminPagination page={page} pages={pages} count={count} buildHref={(p) => `/admin/donations?page=${p}`} />
    </AdminPage>
  );
}
