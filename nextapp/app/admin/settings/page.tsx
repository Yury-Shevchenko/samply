import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { getSiteSettings } from "@/lib/models/siteSettings";
import { getRetentionCounts, PENDING_TTL_SECONDS, RESULTS_TTL_SECONDS } from "@/lib/data/retention";
import { AdminPage } from "../shared";
import { setShowDonation, setShowSmaat, setShowTestimonials, setRetentionEnabled } from "./actions";

export const metadata = { title: "Admin: Settings — Samply" };

function Toggle({
  label,
  description,
  enabled,
  action,
}: {
  label: string;
  description: string;
  enabled: boolean;
  action: (fd: FormData) => Promise<void>;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "3rem",
        padding: "2rem 2.4rem",
        background: "var(--surface)",
        border: "1px solid var(--ink-10)",
        borderRadius: "1rem",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.4rem" }}>
          {label}
        </div>
        <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.55 }}>
          {description}
        </div>
        <div
          style={{
            marginTop: "0.8rem",
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "1.05rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.25rem 0.8rem",
            borderRadius: "999rem",
            background: enabled ? "rgba(61,115,107,.10)" : "var(--ink-10)",
            color: enabled ? "var(--sage)" : "var(--ink-40)",
            fontWeight: 600,
          }}
        >
          {enabled ? "on" : "off"}
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.8rem", flexShrink: 0, alignItems: "center", paddingTop: "0.2rem" }}>
        <form action={action}>
          <input type="hidden" name="value" value="true" />
          <button
            type="submit"
            disabled={enabled}
            style={{
              padding: "0.7rem 1.6rem",
              borderRadius: "999rem",
              fontSize: "1.25rem",
              fontWeight: 500,
              cursor: enabled ? "default" : "pointer",
              border: "1px solid var(--ink-20)",
              background: enabled ? "var(--ink)" : "transparent",
              color: enabled ? "var(--paper)" : "var(--ink-60)",
              transition: "all 120ms",
            }}
          >
            Show
          </button>
        </form>
        <form action={action}>
          <input type="hidden" name="value" value="false" />
          <button
            type="submit"
            disabled={!enabled}
            style={{
              padding: "0.7rem 1.6rem",
              borderRadius: "999rem",
              fontSize: "1.25rem",
              fontWeight: 500,
              cursor: !enabled ? "default" : "pointer",
              border: "1px solid var(--ink-20)",
              background: !enabled ? "var(--ink)" : "transparent",
              color: !enabled ? "var(--paper)" : "var(--ink-60)",
              transition: "all 120ms",
            }}
          >
            Hide
          </button>
        </form>
      </div>
    </div>
  );
}

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  await connectDB();
  const [settings, retentionCounts] = await Promise.all([
    getSiteSettings(),
    getRetentionCounts(),
  ]);

  const pendingDays = Math.round(PENDING_TTL_SECONDS / 86400);
  const resultsDays = Math.round(RESULTS_TTL_SECONDS / 86400);

  return (
    <AdminPage title="Site settings">
      <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <Toggle
          label="Donation button"
          description='Shows the "♥ Donate" button in the navigation bar for all visitors. Disable to hide fundraising prompts temporarily without removing the /donate page.'
          enabled={settings.showDonation}
          action={setShowDonation}
        />
        <Toggle
          label="SMAAT advertisement"
          description='Shows the "Compare platforms" SMAAT cross-promotion banner at the bottom of the researcher dashboard. Disable to remove the banner without affecting the /smaat comparison page.'
          enabled={settings.showSmaat}
          action={setShowSmaat}
        />
        <Toggle
          label="Testimonials"
          description='Shows the testimonials section on the public homepage, the submission link on the researcher dashboard, and allows access to the /testimonial submission form. Disable to hide the feature entirely without deleting any submitted testimonials.'
          enabled={settings.showTestimonials}
          action={setShowTestimonials}
        />

        {/* ── Data Retention ──────────────────────────────────────────────── */}
        <div style={{ marginTop: "1.2rem", borderTop: "1px solid var(--ink-10)", paddingTop: "1.6rem" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Data Retention
          </div>
        </div>

        <Toggle
          label="Automatic data deletion"
          description={`When enabled, MongoDB automatically expires records beyond the retention windows below. Changes take effect within ~60 seconds. Default is OFF — enable only after confirming you have exported any data you wish to preserve.`}
          enabled={settings.retentionEnabled}
          action={setRetentionEnabled}
        />

        {/* Stats + period summary */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--ink-10)",
            borderRadius: "1rem",
            padding: "1.6rem 2.4rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            Retention periods &amp; eligible counts
          </div>

          {[
            {
              label: "Pending notification queue",
              period: `${pendingDays} days`,
              eligible: retentionCounts.pendingEligible,
            },
            {
              label: "Notification history &amp; responses",
              period: `${resultsDays} days (12 months)`,
              eligible: retentionCounts.resultsEligible,
            },
          ].map(({ label, period, eligible }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}
            >
              <div>
                <div style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--ink)" }} dangerouslySetInnerHTML={{ __html: label }} />
                <div style={{ fontSize: "1.15rem", color: "var(--ink-40)", fontFamily: "var(--font-mono)", marginTop: "0.2rem" }}>
                  limit: {period}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: eligible > 0 && settings.retentionEnabled ? "var(--coral)" : "var(--ink)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {eligible.toLocaleString()}
                </div>
                <div style={{ fontSize: "1.05rem", color: "var(--ink-40)", marginTop: "0.1rem" }}>
                  {eligible === 1 ? "record" : "records"} eligible for deletion
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "0.4rem", fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.55 }}>
            {settings.retentionEnabled
              ? "Automatic deletion is active. MongoDB TTL indexes expire records on a ~60-second cycle."
              : "Automatic deletion is disabled. Records accumulate until you enable this setting."}
          </div>
        </div>
      </div>
    </AdminPage>
  );
}
