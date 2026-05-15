import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { fetchStudyBySlug } from "@/lib/data/studies";
import { getT } from "@/lib/i18n.server";

export default async function StudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { t } = await getT();
  const { project, author } = await fetchStudyBySlug(slug);

  if (!project) notFound();

  const qrUrl = `samply://--/study?id=${project._id}`;
  const qrDataUrl = await QRCode.toDataURL(qrUrl, { width: 220, margin: 2, color: { dark: "#23201a", light: "#faf1de" } });

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "82rem", margin: "0 auto", padding: "4.8rem var(--page-px) 8rem" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "2.8rem" }}>
          <a
            href="/studies"
            className="font-medium no-underline hover:opacity-70 transition-opacity"
            style={{ fontSize: "1.3rem", color: "var(--ink-60)", textDecoration: "none" }}
          >
            {t("studyDetail.allStudies")}
          </a>
        </div>

        {/* Two-column layout */}
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: "1fr 26rem", gap: "4.8rem" }}
        >
          {/* Left: study info */}
          <div>
            {/* Study image */}
            {project.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.name}
                style={{
                  width: "100%",
                  maxHeight: "28rem",
                  objectFit: "cover",
                  borderRadius: "1.2rem",
                  marginBottom: "2.4rem",
                  border: "1px solid var(--ink-10)",
                }}
              />
            )}

            {/* Status pill */}
            <div
              style={{
                display: "inline-block",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--sage)",
                background: "rgba(61,115,107,.1)",
                border: "1px solid rgba(61,115,107,.25)",
                borderRadius: "9999px",
                padding: "0.3rem 1rem",
                marginBottom: "1.4rem",
                letterSpacing: "0.04em",
              }}
            >
              {t("studyDetail.acceptingParticipants")}
            </div>

            {/* Title */}
            <h1
              className="font-[family-name:var(--font-display)] font-bold m-0"
              style={{ fontSize: "3.6rem", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "1.4rem" }}
            >
              {project.name}
            </h1>

            {/* Author */}
            {author && (
              <div style={{ marginBottom: "2.4rem" }}>
                <span
                  style={{
                    fontSize: "1.3rem",
                    color: "var(--ink-60)",
                    fontStyle: "italic",
                  }}
                >
                  {author.name}
                  {author.institute ? ` · ${author.institute}` : ""}
                </span>
              </div>
            )}

            {/* Description */}
            {project.description && (
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "var(--ink)",
                  lineHeight: 1.65,
                  maxWidth: "48rem",
                  marginBottom: "3.2rem",
                }}
              >
                {project.description}
              </div>
            )}

            {/* How to join steps */}
            <div
              style={{
                borderTop: "1px solid var(--ink-10)",
                paddingTop: "2.8rem",
              }}
            >
              <div
                className="font-[family-name:var(--font-hand)]"
                style={{ fontSize: "1.8rem", color: "var(--coral)", marginBottom: "1.6rem" }}
              >
                how to join
              </div>
              <ol
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.4rem",
                }}
              >
                {[
                  "Download the Samply Research app (iOS or Android).",
                  'Open the app and tap "Join a study".',
                  "Scan the QR code on this page — or tap the link on your phone.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-[1.4rem] items-start">
                    <span
                      className="font-[family-name:var(--font-display)] font-bold flex-shrink-0"
                      style={{
                        width: "2.6rem",
                        height: "2.6rem",
                        borderRadius: "50%",
                        background: "var(--ink)",
                        color: "var(--paper)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "1.35rem", color: "var(--ink-60)", lineHeight: 1.5, paddingTop: "0.4rem" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {/* App store links */}
              <div className="flex gap-[1.2rem] flex-wrap" style={{ marginTop: "2.4rem" }}>
                {[
                  { label: "App Store", href: "https://apps.apple.com/app/samply-research/id1511062019" },
                  { label: "Google Play", href: "https://play.google.com/store/apps/details?id=org.js.samply" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-medium no-underline transition-opacity hover:opacity-70"
                    style={{
                      fontSize: "1.25rem",
                      color: "var(--ink)",
                      background: "var(--surface)",
                      border: "1px solid var(--ink-20)",
                      borderRadius: "0.8rem",
                      padding: "0.8rem 1.4rem",
                      textDecoration: "none",
                    }}
                  >
                    ↓ {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: QR card */}
          <div
            style={{
              position: "sticky",
              top: "2.4rem",
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--ink-10)",
                borderRadius: "1.6rem",
                padding: "2.4rem 2rem",
                boxShadow: "0.2rem 0.3rem 0 rgba(35,32,26,.06)",
                textAlign: "center",
              }}
            >
              {/* Perforation top */}
              <div
                style={{
                  height: "0.4rem",
                  marginBottom: "1.8rem",
                  backgroundImage: "radial-gradient(circle, var(--ink-20) 1.5px, transparent 1.6px)",
                  backgroundSize: "8px 4px",
                  backgroundRepeat: "repeat-x",
                }}
              />

              <div
                className="font-[family-name:var(--font-hand)]"
                style={{ fontSize: "1.6rem", color: "var(--coral)", marginBottom: "1.2rem" }}
              >
                {t("studyDetail.scanToJoin")}
              </div>

              {/* QR code */}
              <div
                style={{
                  display: "inline-block",
                  padding: "1rem",
                  background: "var(--paper)",
                  borderRadius: "1rem",
                  border: "1px solid var(--ink-10)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt={`QR code to join ${project.name}`}
                  width={180}
                  height={180}
                  style={{ display: "block" }}
                />
              </div>

              <p style={{ margin: "1.4rem 0 0.8rem", fontSize: "1.15rem", color: "var(--ink-40)", lineHeight: 1.5 }}>
                {t("studyDetail.openWithApp")}
              </p>

              {/* Or enter code divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", margin: "1.2rem 0" }}>
                <div style={{ flex: 1, height: "1px", borderTop: "1px dashed var(--ink-20)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)" }}>
                  {t("studyDetail.orTypeCode")}
                </span>
                <div style={{ flex: 1, height: "1px", borderTop: "1px dashed var(--ink-20)" }} />
              </div>

              {/* Study code */}
              <div style={{
                background: "var(--paper)",
                border: "1px solid var(--ink-10)",
                borderRadius: "0.8rem",
                padding: "0.9rem 1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.8rem",
              }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-40)", marginBottom: "0.3rem" }}>
                    {t("studyDetail.studyCodeLabel")}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", fontWeight: 700, letterSpacing: ".14em", color: "var(--ink)" }}>
                    {project.slug?.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", lineHeight: 1.4, textAlign: "right", maxWidth: "9rem" }}>
                  {t("studyDetail.findStudyHint")}
                </div>
              </div>

              {/* Perforation bottom */}
              <div
                style={{
                  height: "0.4rem",
                  marginTop: "1.8rem",
                  backgroundImage: "radial-gradient(circle, var(--ink-20) 1.5px, transparent 1.6px)",
                  backgroundSize: "8px 4px",
                  backgroundRepeat: "repeat-x",
                }}
              />
            </div>

            {/* Direct link hint */}
            <p style={{ margin: "1.2rem 0 0", fontSize: "1.15rem", color: "var(--ink-40)", textAlign: "center" }}>
              {t("studyDetail.tapToOpen")}{" "}
              <a
                href={qrUrl}
                style={{ color: "var(--ink-60)", textDecoration: "underline" }}
              >
                {t("studyDetail.tapToOpenLink")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
