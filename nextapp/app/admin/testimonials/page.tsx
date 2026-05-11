import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import Testimonial, { type ITestimonial } from "@/lib/models/testimonial";
import { AdminPage, TD_STYLE, TD_MONO, fmt } from "../shared";
import { approveTestimonial, unapproveTestimonial, deleteTestimonial } from "./actions";
import { ConfirmDeleteButton } from "../ConfirmDeleteButton";

export const metadata = { title: "Admin: Testimonials — Samply" };

function ApprovalButton({ id, approved }: { id: string; approved: boolean }) {
  const action = approved
    ? unapproveTestimonial.bind(null, id)
    : approveTestimonial.bind(null, id);
  return (
    <form action={action} style={{ margin: 0 }}>
      <button
        type="submit"
        style={{
          padding: "0.3rem 1rem",
          borderRadius: "999rem",
          fontSize: "1.1rem",
          fontWeight: 600,
          cursor: "pointer",
          border: "1px solid",
          borderColor: approved ? "rgba(61,115,107,.35)" : "rgba(214,90,48,.35)",
          background: approved ? "rgba(61,115,107,.08)" : "rgba(214,90,48,.08)",
          color: approved ? "var(--sage)" : "var(--coral)",
        }}
      >
        {approved ? "Published" : "Approve"}
      </button>
    </form>
  );
}

export default async function AdminTestimonialsPage() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  await connectDB();
  const testimonials = await Testimonial.find({}).sort({ created: -1 }).lean() as unknown as ITestimonial[];

  const approvedCount = testimonials.filter((t) => t.approved).length;

  return (
    <AdminPage title="Testimonials" count={testimonials.length}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "published", value: approvedCount, color: "var(--sage)" },
          { label: "pending review", value: testimonials.length - approvedCount, color: "var(--coral)" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--ink-10)", color }}>
            <strong>{value}</strong> {label}
          </div>
        ))}
      </div>

      <div style={{ overflowX: "auto", borderRadius: "1.2rem", border: "1px solid var(--ink-10)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--surface)" }}>
          <thead>
            <tr>
              {["", "Date", "Status", "Name", "Role", "Institution", "Testimonial"].map((h) => (
                <th key={h || "del"} style={{ padding: "0.9rem 1.4rem", textAlign: "left", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--paper)", whiteSpace: "nowrap", borderBottom: "1px solid var(--ink-10)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => {
              const id = String(t._id);
              const deleteAction = deleteTestimonial.bind(null, id);
              return (
                <tr key={id} style={{ borderBottom: "1px solid var(--ink-10)" }}>
                  <td style={{ ...TD_STYLE, width: 36, padding: "9px 8px 9px 14px" }}>
                    <ConfirmDeleteButton
                      action={deleteAction}
                      message={`Delete testimonial from "${t.name}"?`}
                    />
                  </td>
                  <td style={TD_MONO}>{fmt(t.created)}</td>
                  <td style={{ ...TD_STYLE, paddingRight: "0.6rem" }}>
                    <ApprovalButton id={id} approved={t.approved} />
                  </td>
                  <td style={{ ...TD_STYLE, fontWeight: 600, color: "var(--ink)" }}>{t.name}</td>
                  <td style={TD_STYLE}>{t.role ?? <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
                  <td style={TD_STYLE}>{t.institute ?? <span style={{ color: "var(--ink-20)" }}>—</span>}</td>
                  <td style={{ ...TD_STYLE, maxWidth: "36rem", whiteSpace: "normal", fontSize: "1.2rem", lineHeight: 1.5 }}>
                    {t.text}
                  </td>
                </tr>
              );
            })}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={7} style={{ ...TD_STYLE, textAlign: "center", color: "var(--ink-20)", padding: "3rem" }}>
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminPage>
  );
}
