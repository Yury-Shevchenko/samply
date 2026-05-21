import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Hand from "@/app/components/ui/Hand";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import connectDB from "@/lib/db";
import Testimonial from "@/lib/models/testimonial";
import { getSiteSettings } from "@/lib/models/siteSettings";
import { getMessages } from "@/lib/i18n";
import { getT, getLocale } from "@/lib/i18n.server";

export const metadata = { title: "Samply — Experience Sampling Research" };

function HandUnderline({ width = 200 }: { width: number }) {
  const w = width;
  return (
    <svg
      width={w} height={14}
      viewBox={`0 0 ${w} 14`}
      style={{ display: "block", position: "absolute", left: 0, bottom: -6 }}
    >
      <path
        d={`M 4 9 Q ${w * 0.25} 4 ${w * 0.5} 8 T ${w - 4} 7`}
        fill="none" stroke="var(--coral)" strokeWidth={5} strokeLinecap="round" opacity={0.85}
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "1.8rem" }}>
      {children}
    </div>
  );
}

const INTEGRATIONS = ["Qualtrics", "REDCap", "LimeSurvey", "SurveyMonkey", "Your own URL", "Webhooks"];

// Method acronyms — kept in English as internationally recognised codes
const METHOD_CODES = ["ESM", "EMA", "DIARY", "AMBL", "BURST", "DCE"];

const SAMPLY_RESEARCH_APP_STORE = "https://apps.apple.com/app/samply-research/id1511062019";
const SAMPLY_RESEARCH_GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=org.js.samply";

export default async function RootPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  await connectDB();
  const [testimonials, { showTestimonials }] = await Promise.all([
    Testimonial.find({ approved: true }).sort({ created: -1 }).lean() as Promise<Array<{
      _id: unknown; text: string; name: string; role?: string; institute?: string;
    }>>,
    getSiteSettings(),
  ]);

  const locale = await getLocale();
  const { t } = await getT();
  const msgs = getMessages(locale);

  const howSteps = msgs.home.howItWorks.steps;
  const timingCards = msgs.home.timingRules.cards;
  const methodCards = msgs.home.methods.cards;
  const defaultRows = msgs.home.defaults.rows;

  return (
    <main className="min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: "82rem", margin: "0 auto", padding: "5.6rem var(--page-px) 8rem" }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div style={{ marginTop: "4.8rem", position: "relative" }}>
          <Hand size={18} rotate={-1.5} className="mb-[1rem] block">{t("home.hero.greeting")}</Hand>
          <h1 className="font-[family-name:var(--font-display)] font-bold hero-headline"
            style={{ lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0, color: "var(--ink)" }}>
            {t("home.hero.headline1")}<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              {t("home.hero.headline2")}
              <HandUnderline width={264} />
            </span>
            <br />
            {t("home.hero.headline3")}
          </h1>
          <p style={{ marginTop: "2.4rem", fontSize: "1.65rem", lineHeight: 1.55, maxWidth: "48rem", color: "var(--ink-60)" }}>
            {t("home.hero.subtitle")}
          </p>
          <div className="flex items-center gap-[1.8rem]" style={{ marginTop: "2.4rem" }}>
            <Button kind="primary" href="/register">{t("home.hero.cta")}</Button>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)" }}>{t("home.hero.freeLabel")}</span>
          </div>

          {/* Postmark stamp */}
          <div className="home-postmark" style={{ position: "absolute", right: 0, top: "-1rem" }}>
            <div className="relative rounded-full border-[1.5px] border-[var(--coral)] text-[var(--coral)] flex flex-col items-center justify-center font-[family-name:var(--font-display)] font-bold"
              style={{ width: "8.4rem", height: "8.4rem", transform: "rotate(-12deg)" }}>
              <div className="absolute rounded-full border border-dashed border-[var(--coral)] opacity-60" style={{ inset: "0.4rem" }} />
              <div style={{ fontSize: "1.1rem", lineHeight: 1, textAlign: "center" }}>{t("home.hero.stampYear")}</div>
              <div style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem", opacity: 0.85 }}>{t("home.hero.stampLabel")}</div>
            </div>
          </div>
        </div>

        {/* ── How it works ──────────────────────────────────────── */}
        <div style={{ marginTop: "8rem" }}>
          <div style={{ marginBottom: "0.6rem" }}>
            <Hand size={18} rotate={-1.5} className="block" style={{ marginBottom: "0.8rem" }}>{t("home.howItWorks.eyebrow")}</Hand>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3.6rem", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              {t("home.howItWorks.heading")}
            </h2>
          </div>
          <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", marginTop: "1.4rem", marginBottom: "2.8rem", maxWidth: "52rem", lineHeight: 1.55 }}>
            {t("home.howItWorks.subtitle")}
          </p>
          <div className="home-how-grid">
            {howSteps.map((s, i) => (
              <Card key={i} tilt={[-1.0, 0.6, -0.5, 0.8][i] ?? 0} pad="1.8rem" className="flex flex-col gap-[1rem]" style={{ minHeight: "20rem" }}>
                <Hand size={16}>{String(i + 1).padStart(2, "0")}</Hand>
                <div className="font-[family-name:var(--font-display)] font-bold"
                  style={{ fontSize: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{s.body}</div>
                <div style={{ paddingTop: "1rem", borderTop: "1px dashed var(--ink-20)", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", letterSpacing: ".08em", textTransform: "uppercase" }}>
                  {t("home.howItWorks.stepOf", { n: i + 1, total: howSteps.length })}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Step 01 in detail: timing rules ───────────────────── */}
        <div style={{ marginTop: "7.2rem" }}>
          <div className="flex justify-between items-baseline">
            <div>
              <SectionLabel>{t("home.timingRules.sectionLabel")}</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "3rem", margin: 0, letterSpacing: "-0.02em" }}>
                {t("home.timingRules.heading")}
              </h2>
            </div>
            <Hand size={18} className="home-section-deco">{t("home.timingRules.pickOne")}</Hand>
          </div>
          <div className="home-timing-grid" style={{ marginTop: "2.2rem" }}>
            {timingCards.map((c, i) => (
              <Card key={i} tilt={[-1.4, 0.9, -0.6][i] ?? 0} pad="2rem" className="flex flex-col gap-[1rem]">
                <Hand size={17}>{c.eyebrow}</Hand>
                <div className="font-[family-name:var(--font-display)] font-bold"
                  style={{ fontSize: "1.9rem", letterSpacing: "-0.015em", lineHeight: 1.15 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.5 }}>{c.body}</div>
                {/* Timing visualisations — kept in English as they are technical/code strings */}
                <div className="home-timing-vis" style={{ marginTop: "0.6rem", paddingTop: "1rem", borderTop: "1px dashed var(--ink-20)" }}>
                  {i === 0 && (
                    <div className="font-[family-name:var(--font-mono)] text-[1.1rem]" style={{ color: "var(--ink-60)" }}>
                      09:00 ──●──────────●────────●──●───●── 21:00
                    </div>
                  )}
                  {i === 1 && (
                    <div className="flex gap-[0.8rem]">
                      {["09:00", "15:00", "21:00"].map((time) => (
                        <span key={time} className="text-[1.1rem] px-[1.1rem] py-[0.5rem] rounded-[999rem] font-[family-name:var(--font-body)]"
                          style={{ border: "1px solid var(--ink-20)", color: "var(--ink)" }}>{time}</span>
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div className="font-[family-name:var(--font-mono)] text-[1.1rem]" style={{ color: "var(--coral)", padding: "0.6rem 0" }}>
                      on(activity.end) → ping(reflection)
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Steps 02 + 03 in detail: phone ────────────────────── */}
        <div className="home-phone-grid" style={{ marginTop: "6.4rem" }}>
          <div>
            <SectionLabel>{t("home.mobileSection.sectionLabel")}</SectionLabel>

            {/* Product wordmark — Samply Research brand prominence */}
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "clamp(3.6rem, 6vw, 5.2rem)", letterSpacing: "-0.035em", lineHeight: 1, color: "var(--coral)", marginTop: "0.4rem" }}>
              {t("home.mobileSection.productName")}
            </div>
            <Hand size={17} className="block" style={{ marginTop: "0.6rem", marginBottom: "1.4rem" }}>
              {t("home.mobileSection.productTagline")}
            </Hand>

            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "2.6rem", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 0" }}>
              {t("home.mobileSection.heading")}
            </h2>
            <p style={{ fontSize: "1.45rem", lineHeight: 1.55, marginTop: "1.2rem", maxWidth: "38rem", color: "var(--ink-60)" }}>
              {t("home.mobileSection.body")}
            </p>

            {/* App-store buttons */}
            <div className="flex gap-[1.2rem] flex-wrap" style={{ marginTop: "2rem" }}>
              {[
                { label: t("home.mobileSection.downloadAppStore"), href: SAMPLY_RESEARCH_APP_STORE },
                { label: t("home.mobileSection.downloadGooglePlay"), href: SAMPLY_RESEARCH_GOOGLE_PLAY },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center font-medium no-underline transition-opacity hover:opacity-70"
                  style={{
                    fontSize: "1.35rem",
                    color: "var(--ink)",
                    background: "var(--surface)",
                    border: "1px solid var(--ink-20)",
                    borderRadius: "0.8rem",
                    padding: "0.9rem 1.6rem",
                    textDecoration: "none",
                  }}
                >
                  ↓ {label}
                </a>
              ))}
            </div>

            <div className="flex gap-[0.8rem] flex-wrap" style={{ marginTop: "1.6rem" }}>
              {[t("home.mobileSection.badgePlatforms"), t("home.mobileSection.badgeTZ")].map((badge) => (
                <span key={badge} className="text-[1.1rem] px-[1.1rem] py-[0.5rem] rounded-[999rem]"
                  style={{ border: "1px solid var(--ink-20)", color: "var(--ink)" }}>{badge}</span>
              ))}
            </div>
            <div style={{ marginTop: "0.8rem", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink-60)" }}>
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>{t("home.mobileSection.languagesLabel")}</span>{" "}
              English · Deutsch · Français · Español · Português · Italiano · Nederlands · Polski · Русский · Türkçe · 中文 · 日本語 · 한국어 · العربية
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative overflow-hidden"
            style={{ width: "20rem", height: "33.2rem", borderRadius: "2.2rem", border: "1.5px solid var(--ink)", background: "var(--surface)", boxShadow: "0.2rem 0.3rem 0 rgba(0,0,0,.08)" }}>
            <div className="absolute" style={{ top: "0.6rem", left: "50%", transform: "translateX(-50%)", width: "3.8rem", height: "0.5rem", borderRadius: "0.3rem", background: "var(--ink)", opacity: 0.5 }} />
            <div style={{ paddingTop: "2.2rem", paddingInline: "0.8rem", paddingBottom: "0.8rem", height: "100%", boxSizing: "border-box" }}>
              <div className="flex justify-between" style={{ fontSize: "0.9rem", color: "var(--ink-60)" }}>
                <span>9:41</span><span>●●●</span>
              </div>
              <div className="relative" style={{ marginTop: "1.4rem", padding: "1.2rem", background: "var(--paper)", borderRadius: "1.4rem" }}>
                <div className="absolute" style={{ top: "-0.2rem", left: "0.8rem", right: "0.8rem", height: "0.4rem", backgroundImage: "radial-gradient(circle, var(--ink) 1.2px, transparent 1.4px)", backgroundSize: "7px 4px", backgroundRepeat: "repeat-x", opacity: 0.6 }} />
                <div style={{ fontSize: "0.9rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--coral)", fontWeight: 600 }}>{t("home.mobileSection.mockupApp")}</div>
                <div className="font-[family-name:var(--font-display)] font-bold" style={{ fontSize: "1.4rem", marginTop: "0.4rem", letterSpacing: "-0.015em" }}>
                  {t("home.mobileSection.mockupQuestion")}
                </div>
                <div style={{ fontSize: "1.05rem", color: "var(--ink-60)", marginTop: "0.4rem" }}>{t("home.mobileSection.mockupHint")}</div>
                <div className="absolute" style={{ bottom: "-0.2rem", left: "0.8rem", right: "0.8rem", height: "0.4rem", backgroundImage: "radial-gradient(circle, var(--ink) 1.2px, transparent 1.4px)", backgroundSize: "7px 4px", backgroundRepeat: "repeat-x", opacity: 0.6 }} />
              </div>
              <Hand size={15} className="block text-center" style={{ marginTop: "1.2rem" }}>{t("home.mobileSection.mockupNote")}</Hand>
            </div>
          </div>
        </div>

        {/* ── Step 04 in detail: integrations ───────────────────── */}
        <div style={{ marginTop: "6.4rem" }}>
          <SectionLabel>{t("home.integrations.sectionLabel")}</SectionLabel>
          <div className="flex justify-between items-baseline" style={{ marginBottom: "1.8rem" }}>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3rem", margin: 0, letterSpacing: "-0.02em" }}>
              {t("home.integrations.heading")}
            </h2>
            <Hand size={18} className="home-section-deco">{t("home.integrations.note")}</Hand>
          </div>
          <div className="flex gap-[1.2rem] flex-wrap">
            {INTEGRATIONS.map((tool) => (
              <div key={tool} className="font-medium"
                style={{ background: "var(--surface)", border: "1px solid var(--ink-20)", borderRadius: "0.8rem", padding: "1.1rem 1.8rem", fontSize: "1.4rem", color: "var(--ink)" }}>
                {tool}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.4rem", fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", padding: "1rem 0" }}>
            /survey?pid=&lt;PID&gt;&amp;ping=&lt;PING&gt;&amp;ts=&lt;TS&gt;
          </div>
        </div>

        {/* ── Methods ───────────────────────────────────────────── */}
        <div style={{ marginTop: "8rem" }}>
          <Hand size={18} rotate={-1.5} className="block" style={{ marginBottom: "0.8rem" }}>{t("home.methods.eyebrow")}</Hand>
          <div className="flex justify-between items-baseline" style={{ marginBottom: "0.8rem" }}>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3.6rem", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              {t("home.methods.heading")}
            </h2>
            <div className="home-section-deco" style={{ position: "relative" }}>
              <div style={{
                width: "7.2rem", height: "7.2rem", borderRadius: "50%",
                border: "1.5px solid var(--coral)", color: "var(--coral)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 700,
                transform: "rotate(-12deg)", position: "relative",
              }}>
                <div style={{ position: "absolute", inset: "0.4rem", borderRadius: "50%", border: "1px dashed var(--coral)", opacity: 0.6 }} />
                <div style={{ fontSize: "1.4rem", lineHeight: 1 }}>ESM</div>
                <div style={{ fontSize: "0.8rem", letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.85, marginTop: "0.2rem" }}>{t("home.methods.stampLabel")}</div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", marginTop: "1rem", marginBottom: "2.8rem", maxWidth: "52rem", lineHeight: 1.55 }}>
            {t("home.methods.subtitle")}
          </p>

          {/* Method cards grid */}
          <div className="home-methods-grid">
            {methodCards.map((m, i) => (
              <Card key={i} tilt={[-1.2, 0.8, -0.5, 0.9, -0.8, 0.5][i] ?? 0} pad="1.8rem" className="flex flex-col gap-[0.8rem]">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", color: "var(--ink-60)" }}>
                  {METHOD_CODES[i]}
                </div>
                <div className="font-[family-name:var(--font-display)] font-bold"
                  style={{ fontSize: "1.7rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                  {m.title}
                </div>
                <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.55 }}>{m.body}</div>
              </Card>
            ))}
          </div>

          {/* Defaults table */}
          <div className="home-defaults-grid" style={{ marginTop: "4rem" }}>
            <div>
              <Hand size={17}>{t("home.defaults.eyebrow")}</Hand>
              <h3 className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", margin: "0.8rem 0 1rem", lineHeight: 1.1 }}>
                {t("home.defaults.heading")}
              </h3>
              <p style={{ fontSize: "1.35rem", lineHeight: 1.6, color: "var(--ink-60)", maxWidth: "28rem" }}>
                {t("home.defaults.subtitle")}
              </p>
            </div>
            <Card tilt={0} pad={0} style={{ overflow: "hidden" }}>
              <div className="grid" style={{ gridTemplateColumns: "1fr 0.8fr 1.4fr", padding: "1rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-60)", borderBottom: "1px solid var(--ink-10)" }}>
                <span>{t("home.defaults.colSetting")}</span>
                <span>{t("home.defaults.colDefault")}</span>
                <span>{t("home.defaults.colWhy")}</span>
              </div>
              {defaultRows.map(({ k, v, w }, i) => (
                <div key={k} className="grid" style={{ gridTemplateColumns: "1fr 0.8fr 1.4fr", padding: "1.2rem 1.8rem", alignItems: "center", borderBottom: i < defaultRows.length - 1 ? "1px solid var(--ink-10)" : "none", fontSize: "1.3rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--ink)" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--coral)", fontWeight: 500, fontSize: "1.2rem" }}>{v}</span>
                  <span style={{ color: "var(--ink-60)", fontSize: "1.2rem" }}>{w}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* IRB strip */}
          <div className="home-irb-grid" style={{ marginTop: "2.4rem", background: "rgba(61,115,107,.08)", border: "1px solid rgba(61,115,107,.25)", borderRadius: "1rem", padding: "1.8rem 2.2rem" }}>
            <div style={{ width: "4.4rem", height: "4.4rem", borderRadius: "50%", background: "var(--sage)", color: "var(--paper)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              IRB
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)] font-bold" style={{ fontSize: "1.6rem", letterSpacing: "-0.015em" }}>{t("home.irb.heading")}</div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", marginTop: "0.2rem" }}>{t("home.irb.sub")}</div>
            </div>
            <a href="/docs/irb" style={{ fontSize: "1.25rem", color: "var(--sage)", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }} className="hover:opacity-70 transition-opacity">
              {t("home.irb.link")}
            </a>
          </div>
        </div>

        {/* ── Testimonials ──────────────────────────────────────── */}
        {showTestimonials && testimonials.length > 0 && (
          <div style={{ marginTop: "8rem" }}>
            <Hand size={18} rotate={-1.5} className="block" style={{ marginBottom: "0.8rem" }}>{t("home.testimonials.eyebrow")}</Hand>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3.2rem", margin: "0 0 2.8rem", letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              {t("home.testimonials.heading")}
            </h2>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(28rem, 1fr))", gap: "1.8rem" }}>
              {testimonials.map((testimonial, i) => {
                const tilts = [-1.1, 0.7, -0.5, 0.9, -0.8, 0.6];
                const tilt = tilts[i % tilts.length];
                return (
                  <Card key={String(testimonial._id)} tilt={tilt} pad="2rem" className="flex flex-col gap-[1rem]">
                    <div style={{ fontSize: "2rem", lineHeight: 1, color: "var(--coral)", fontFamily: "var(--font-display)", fontWeight: 700, opacity: 0.4 }}>&ldquo;</div>
                    <p style={{ margin: 0, fontSize: "1.35rem", lineHeight: 1.65, color: "var(--ink)", flex: 1 }}>{testimonial.text}</p>
                    <div style={{ paddingTop: "1rem", borderTop: "1px dashed var(--ink-20)" }}>
                      <div style={{ fontWeight: 600, fontSize: "1.3rem", color: "var(--ink)" }}>{testimonial.name}</div>
                      {(testimonial.role || testimonial.institute) && (
                        <div style={{ fontSize: "1.15rem", color: "var(--ink-60)", marginTop: "0.2rem" }}>
                          {[testimonial.role, testimonial.institute].filter(Boolean).join(" · ")}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CTA band ──────────────────────────────────────────── */}
        <div className="home-cta-band flex justify-between items-center relative overflow-hidden"
          style={{ marginTop: "6.4rem", background: "var(--ink)", color: "var(--paper)", borderRadius: "1.4rem", padding: "3.2rem" }}>
          <div>
            <div className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3rem", letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              {t("home.cta.heading")}
            </div>
            <div style={{ fontSize: "1.35rem", opacity: 0.75, marginTop: "0.6rem" }}>
              {t("home.cta.sub")}
            </div>
          </div>
          <Button kind="primary" href="/register">{t("home.cta.button")}</Button>
        </div>

        {/* ── Footer ────────────────────────────────────────────── */}
        <div className="flex gap-[24px] justify-center flex-wrap"
          style={{ marginTop: "4.8rem", paddingTop: "2.4rem", borderTop: "1px solid var(--ink-20)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
          <a href="/docs/intro" style={{ color: "inherit" }}>{t("home.footer.docs")}</a>
          <a href="/studies" style={{ color: "inherit" }}>{t("home.footer.studies")}</a>
          <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{t("home.footer.github")}</a>
          <a href="https://link.springer.com/article/10.3758/s13428-020-01527-9" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{t("home.footer.publication")}</a>
          <span>{t("home.footer.copyright")}</span>
        </div>
      </div>
    </main>
  );
}
