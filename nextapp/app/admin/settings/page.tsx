import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/db";
import { getSiteSettings } from "@/lib/models/siteSettings";
import { AdminPage } from "../shared";
import { setShowDonation, setShowSmaat, setShowTestimonials } from "./actions";

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
  const settings = await getSiteSettings();

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
      </div>
    </AdminPage>
  );
}
