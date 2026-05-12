import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Hand from "@/app/components/ui/Hand";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import connectDB from "@/lib/db";
import Testimonial from "@/lib/models/testimonial";
import { getSiteSettings } from "@/lib/models/siteSettings";

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

// ── How it works data ────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    n: "01",
    t: "Schedule",
    b: "Pick a timing rule — random, fixed, or event-contingent. Draw a window on the day, set quiet hours and a minimum gap.",
    tilt: -1.0,
  },
  {
    n: "02",
    t: "Ping",
    b: "Samply runs the cron. Each participant receives a small push notification in their timezone, on the Samply Research app.",
    tilt: 0.6,
  },
  {
    n: "03",
    t: "Tap",
    b: "They tap. Samply attaches their participant ID and ping ID, then forwards the tap to the URL you specified.",
    tilt: -0.5,
  },
  {
    n: "04",
    t: "Survey",
    b: "Your existing tool — Qualtrics, REDCap, LimeSurvey, your own URL — handles the rest. Samply records that the tap landed.",
    tilt: 0.8,
  },
];

// ── Timing rules data ────────────────────────────────────────────────────────
const TIMING_CARDS = [
  {
    eyebrow: "01 · random",
    title: "Five surprise pings, sometime today.",
    body: "Set a window, a count, a minimum gap. Samply scatters the prompts so participants can't predict the next one.",
    tilt: -1.4,
    vis: (
      <div className="font-[family-name:var(--font-mono)] text-[1.1rem]" style={{ color: "var(--ink-60)" }}>
        09:00 ──●──────────●────────●──●───●── 21:00
      </div>
    ),
  },
  {
    eyebrow: "02 · fixed",
    title: "Every evening at 9, a one-minute diary.",
    body: "Pick the times that fit your protocol — 9 a.m., 3 p.m., bedtime — and let participants build the habit.",
    tilt: 0.9,
    vis: (
      <div className="flex gap-[0.8rem]">
        {["09:00", "15:00", "21:00"].map((t) => (
          <span key={t} className="text-[1.1rem] px-[1.1rem] py-[0.5rem] rounded-[999rem] font-[family-name:var(--font-body)]"
            style={{ border: "1px solid var(--ink-20)", color: "var(--ink)" }}>{t}</span>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "03 · event",
    title: "Right after they finish a workout.",
    body: "Trigger pings from upstream signals — wearables, web hooks, participant tap.",
    tilt: -0.6,
    vis: (
      <div className="font-[family-name:var(--font-mono)] text-[1.1rem]" style={{ color: "var(--coral)", padding: "0.6rem 0" }}>
        on(activity.end) → ping(reflection)
      </div>
    ),
  },
];

// ── Methods data ─────────────────────────────────────────────────────────────
const METHODS = [
  { code: "ESM",   t: "Experience sampling",            b: "Random pings within blocks; 4–8 per day; 7–21 days. Probably what you mean.",                              tilt: -1.2 },
  { code: "EMA",   t: "Ecological momentary assessment", b: "Same as ESM with a clinical accent. Compliance bands, drop-out tracking, audit trail.",                    tilt:  0.8 },
  { code: "DIARY", t: "End-of-day diary",               b: "A single fixed-time prompt, often at 21:00 local. The slow cousin.",                                       tilt: -0.5 },
  { code: "AMBL",  t: "Ambulatory assessment",          b: "Event-contingent prompts triggered by wearables, geofences, or webhooks.",                                 tilt:  0.9 },
  { code: "BURST", t: "Measurement-burst",              b: "Two or three weeks of dense sampling, repeated at quarterly intervals.",                                    tilt: -0.8 },
  { code: "DCE",   t: "Discrete-choice experiment",     b: "Pre-randomised conditions, attached as embedded data on the route URL.",                                    tilt:  0.5 },
];

const METHOD_DEFAULTS = [
  { k: "Min gap",          v: "45 min",        w: "Below 30, response styles bleed across pings." },
  { k: "Window",           v: "09:00–21:00",   w: "Quiet hours respected per-participant timezone." },
  { k: "Pings / day",      v: "5",             w: "Five is the sweet spot for ESM in adults." },
  { k: "Burst length",     v: "14 days",       w: "Long enough for within-person variance." },
  { k: "Compliance floor", v: "40%",           w: "Below 40% triggers a soft re-engagement." },
  { k: "Token format",     v: "pid · ping · ts", w: "Three variables, every time, in every URL." },
];

const INTEGRATIONS = ["Qualtrics", "REDCap", "LimeSurvey", "SurveyMonkey", "Your own URL", "Webhooks"];

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

  return (
    <main className="min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)", fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: "82rem", margin: "0 auto", padding: "5.6rem var(--page-px) 8rem" }}>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div style={{ marginTop: "4.8rem", position: "relative" }}>
          <Hand size={18} rotate={-1.5} className="mb-[1rem] block">hello, researcher ✉</Hand>
          <h1 className="font-[family-name:var(--font-display)] font-bold hero-headline"
            style={{ lineHeight: 1.0, letterSpacing: "-0.035em", margin: 0, color: "var(--ink)" }}>
            Send little<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              postcards
              <HandUnderline width={264} />
            </span>
            <br />
            to your participants.
          </h1>
          <p style={{ marginTop: "2.4rem", fontSize: "1.65rem", lineHeight: 1.55, maxWidth: "48rem", color: "var(--ink-60)" }}>
            Schedule notifications that land on participants&apos; phones — random, fixed, or
            event-contingent — and route each tap to the survey or task you already use.
          </p>
          <div className="flex items-center gap-[1.8rem]" style={{ marginTop: "2.4rem" }}>
            <Button kind="primary" href="/register">Start a study →</Button>
            <span style={{ fontSize: "1.3rem", color: "var(--ink-60)" }}>Free for academic use</span>
          </div>

          {/* Postmark stamp */}
          <div className="home-postmark" style={{ position: "absolute", right: 0, top: "-1rem" }}>
            <div className="relative rounded-full border-[1.5px] border-[var(--coral)] text-[var(--coral)] flex flex-col items-center justify-center font-[family-name:var(--font-display)] font-bold"
              style={{ width: "8.4rem", height: "8.4rem", transform: "rotate(-12deg)" }}>
              <div className="absolute rounded-full border border-dashed border-[var(--coral)] opacity-60" style={{ inset: "0.4rem" }} />
              <div style={{ fontSize: "1.1rem", lineHeight: 1, textAlign: "center" }}>EST · 2020</div>
              <div style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem", opacity: 0.85 }}>for research</div>
            </div>
          </div>
        </div>

        {/* ── How it works ──────────────────────────────────────── */}
        <div style={{ marginTop: "8rem" }}>
          <div style={{ marginBottom: "0.6rem" }}>
            <Hand size={18} rotate={-1.5} className="block" style={{ marginBottom: "0.8rem" }}>four moving parts</Hand>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3.6rem", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              From schedule to{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                survey,
                <HandUnderline width={122} />
              </span>
              {" "}without lifting a finger.
            </h2>
          </div>
          <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", marginTop: "1.4rem", marginBottom: "2.8rem", maxWidth: "52rem", lineHeight: 1.55 }}>
            Samply is the bit between your study design and your survey tool. It runs the cron, lands the notification, and routes the tap.
          </p>
          <div className="home-how-grid">
            {HOW_STEPS.map((s, i) => (
              <Card key={s.n} tilt={s.tilt} pad="1.8rem" className="flex flex-col gap-[1rem]" style={{ minHeight: "20rem" }}>
                <Hand size={16}>{s.n}</Hand>
                <div className="font-[family-name:var(--font-display)] font-bold"
                  style={{ fontSize: "2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  {s.t}
                </div>
                <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.55, flex: 1 }}>{s.b}</div>
                <div style={{ paddingTop: "1rem", borderTop: "1px dashed var(--ink-20)", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", letterSpacing: ".08em", textTransform: "uppercase" }}>
                  step {i + 1} of 4
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Step 01 in detail: timing rules ───────────────────── */}
        <div style={{ marginTop: "7.2rem" }}>
          <div className="flex justify-between items-baseline">
            <div>
              <SectionLabel>step 01 · in detail</SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "3rem", margin: 0, letterSpacing: "-0.02em" }}>
                You draw windows on the day. We fill them.
              </h2>
            </div>
            <Hand size={18} className="home-section-deco">→ pick one, or mix</Hand>
          </div>
          <div className="home-timing-grid" style={{ marginTop: "2.2rem" }}>
            {TIMING_CARDS.map((c) => (
              <Card key={c.eyebrow} tilt={c.tilt} pad="2rem" className="flex flex-col gap-[1rem]">
                <Hand size={17}>{c.eyebrow}</Hand>
                <div className="font-[family-name:var(--font-display)] font-bold"
                  style={{ fontSize: "1.9rem", letterSpacing: "-0.015em", lineHeight: 1.15 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.5 }}>{c.body}</div>
                <div className="home-timing-vis" style={{ marginTop: "0.6rem", paddingTop: "1rem", borderTop: "1px dashed var(--ink-20)" }}>{c.vis}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Steps 02 + 03 in detail: phone ────────────────────── */}
        <div className="home-phone-grid" style={{ marginTop: "6.4rem" }}>
          <div>
            <SectionLabel>steps 02 + 03 · in detail</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3.6rem", lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 0" }}>
              The phone is the easy part.
            </h2>
            <p style={{ fontSize: "1.45rem", lineHeight: 1.55, marginTop: "1.2rem", maxWidth: "38rem", color: "var(--ink-60)" }}>
              The Samply Research app on the participant&apos;s phone receives the schedule and shows the prompt. Tap it,
              and they land in your survey with their ID attached.
            </p>
            <div className="flex gap-[0.8rem] flex-wrap" style={{ marginTop: "1.6rem" }}>
              {["iOS · Android", "14 languages", "Offline-resilient", "Per-participant TZ", "Quiet hours"].map((t) => (
                <span key={t} className="text-[1.1rem] px-[1.1rem] py-[0.5rem] rounded-[999rem]"
                  style={{ border: "1px solid var(--ink-20)", color: "var(--ink)" }}>{t}</span>
              ))}
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
                <div style={{ fontSize: "0.9rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--coral)", fontWeight: 600 }}>Samply · now</div>
                <div className="font-[family-name:var(--font-display)] font-bold" style={{ fontSize: "1.4rem", marginTop: "0.4rem", letterSpacing: "-0.015em" }}>
                  How are you, right now?
                </div>
                <div style={{ fontSize: "1.05rem", color: "var(--ink-60)", marginTop: "0.4rem" }}>tap to begin · ≈ 90s</div>
                <div className="absolute" style={{ bottom: "-0.2rem", left: "0.8rem", right: "0.8rem", height: "0.4rem", backgroundImage: "radial-gradient(circle, var(--ink) 1.2px, transparent 1.4px)", backgroundSize: "7px 4px", backgroundRepeat: "repeat-x", opacity: 0.6 }} />
              </div>
              <Hand size={15} className="block text-center" style={{ marginTop: "1.2rem" }}>→ that&apos;s it.</Hand>
            </div>
          </div>
        </div>

        {/* ── Step 04 in detail: integrations ───────────────────── */}
        <div style={{ marginTop: "6.4rem" }}>
          <SectionLabel>step 04 · in detail</SectionLabel>
          <div className="flex justify-between items-baseline" style={{ marginBottom: "1.8rem" }}>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3rem", margin: 0, letterSpacing: "-0.02em" }}>
              Then we hand the tap to your survey.
            </h2>
            <Hand size={18} className="home-section-deco">plays nicely with</Hand>
          </div>
          <div className="flex gap-[1.2rem] flex-wrap">
            {INTEGRATIONS.map((t) => (
              <div key={t} className="font-medium"
                style={{ background: "var(--surface)", border: "1px solid var(--ink-20)", borderRadius: "0.8rem", padding: "1.1rem 1.8rem", fontSize: "1.4rem", color: "var(--ink)" }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.4rem", fontFamily: "var(--font-mono)", fontSize: "1.15rem", color: "var(--coral)", padding: "1rem 0" }}>
            /survey?pid=&lt;PID&gt;&amp;ping=&lt;PING&gt;&amp;ts=&lt;TS&gt;
          </div>
        </div>

        {/* ── Methods ───────────────────────────────────────────── */}
        <div style={{ marginTop: "8rem" }}>
          <Hand size={18} rotate={-1.5} className="block" style={{ marginBottom: "0.8rem" }}>for the working researcher</Hand>
          <div className="flex justify-between items-baseline" style={{ marginBottom: "0.8rem" }}>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3.6rem", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              The{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                methods
                <HandUnderline width={130} />
              </span>
              {" "}we were built for.
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
                <div style={{ fontSize: "0.8rem", letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.85, marginTop: "0.2rem" }}>EMA · diary</div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", marginTop: "1rem", marginBottom: "2.8rem", maxWidth: "52rem", lineHeight: 1.55 }}>
            Samply has opinions about timing, gaps, and quiet hours — borrowed from the methodologists who taught us. Here are the protocols we know inside-out.
          </p>

          {/* Method cards grid */}
          <div className="home-methods-grid">
            {METHODS.map((m) => (
              <Card key={m.code} tilt={m.tilt} pad="1.8rem" className="flex flex-col gap-[0.8rem]">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", color: "var(--ink-60)" }}>
                  {m.code}
                </div>
                <div className="font-[family-name:var(--font-display)] font-bold"
                  style={{ fontSize: "1.7rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                  {m.t}
                </div>
                <div style={{ fontSize: "1.25rem", color: "var(--ink-60)", lineHeight: 1.55 }}>{m.b}</div>
              </Card>
            ))}
          </div>

          {/* Defaults table */}
          <div className="home-defaults-grid" style={{ marginTop: "4rem" }}>
            <div>
              <Hand size={17}>defaults · borrowed from the literature</Hand>
              <h3 className="font-[family-name:var(--font-display)] font-bold"
                style={{ fontSize: "2.6rem", letterSpacing: "-0.02em", margin: "0.8rem 0 1rem", lineHeight: 1.1 }}>
                Sensible numbers, on by default.
              </h3>
              <p style={{ fontSize: "1.35rem", lineHeight: 1.6, color: "var(--ink-60)", maxWidth: "28rem" }}>
                We pre-fill the knobs that researchers most often get wrong. Override any of them per-study.
              </p>
            </div>
            <Card tilt={0} pad={0} style={{ overflow: "hidden" }}>
              <div className="grid" style={{ gridTemplateColumns: "1fr 0.8fr 1.4fr", padding: "1rem 1.8rem", fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-60)", borderBottom: "1px solid var(--ink-10)" }}>
                <span>setting</span><span>default</span><span>why</span>
              </div>
              {METHOD_DEFAULTS.map(({ k, v, w }, i) => (
                <div key={k} className="grid" style={{ gridTemplateColumns: "1fr 0.8fr 1.4fr", padding: "1.2rem 1.8rem", alignItems: "center", borderBottom: i < METHOD_DEFAULTS.length - 1 ? "1px solid var(--ink-10)" : "none", fontSize: "1.3rem" }}>
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
              <div className="font-[family-name:var(--font-display)] font-bold" style={{ fontSize: "1.6rem", letterSpacing: "-0.015em" }}>An IRB-friendly footprint.</div>
              <div style={{ fontSize: "1.3rem", color: "var(--ink-60)", marginTop: "0.2rem" }}>EU-hosted, GDPR DPIA on file, BAA available. Nothing leaves your survey tool. Plain-English data flow on request.</div>
            </div>
            <a href="/docs/policy" style={{ fontSize: "1.25rem", color: "var(--sage)", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }} className="hover:opacity-70 transition-opacity">
              Read the brief →
            </a>
          </div>
        </div>

        {/* ── Testimonials ──────────────────────────────────────── */}
        {showTestimonials && testimonials.length > 0 && (
          <div style={{ marginTop: "8rem" }}>
            <Hand size={18} rotate={-1.5} className="block" style={{ marginBottom: "0.8rem" }}>from the community</Hand>
            <h2 className="font-[family-name:var(--font-display)] font-bold"
              style={{ fontSize: "3.2rem", margin: "0 0 2.8rem", letterSpacing: "-0.025em", lineHeight: 1.05 }}>
              Researchers who use Samply.
            </h2>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(28rem, 1fr))", gap: "1.8rem" }}>
              {testimonials.map((t, i) => {
                const tilts = [-1.1, 0.7, -0.5, 0.9, -0.8, 0.6];
                const tilt = tilts[i % tilts.length];
                return (
                  <Card key={String(t._id)} tilt={tilt} pad="2rem" className="flex flex-col gap-[1rem]">
                    <div style={{ fontSize: "2rem", lineHeight: 1, color: "var(--coral)", fontFamily: "var(--font-display)", fontWeight: 700, opacity: 0.4 }}>&ldquo;</div>
                    <p style={{ margin: 0, fontSize: "1.35rem", lineHeight: 1.65, color: "var(--ink)", flex: 1 }}>{t.text}</p>
                    <div style={{ paddingTop: "1rem", borderTop: "1px dashed var(--ink-20)" }}>
                      <div style={{ fontWeight: 600, fontSize: "1.3rem", color: "var(--ink)" }}>{t.name}</div>
                      {(t.role || t.institute) && (
                        <div style={{ fontSize: "1.15rem", color: "var(--ink-60)", marginTop: "0.2rem" }}>
                          {[t.role, t.institute].filter(Boolean).join(" · ")}
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
              See it in your own protocol.
            </div>
            <div style={{ fontSize: "1.35rem", opacity: 0.75, marginTop: "0.6rem" }}>
              Free for academic use.
            </div>
          </div>
          <Button kind="primary" href="/register">Start a study →</Button>
        </div>

        {/* ── Footer ────────────────────────────────────────────── */}
        <div className="flex gap-[24px] justify-center flex-wrap"
          style={{ marginTop: "4.8rem", paddingTop: "2.4rem", borderTop: "1px solid var(--ink-20)", fontSize: "1.2rem", color: "var(--ink-60)" }}>
          <a href="/docs/intro" style={{ color: "inherit" }}>Documentation</a>
          <a href="/studies" style={{ color: "inherit" }}>Studies</a>
          <a href="https://github.com/Yury-Shevchenko/samply" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>GitHub</a>
          <a href="https://link.springer.com/article/10.3758/s13428-020-01527-9" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>Publication</a>
          <span>© Samply</span>
        </div>
      </div>
    </main>
  );
}
