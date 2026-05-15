"use client";

import { useState } from "react";
import { createDonationSession } from "./actions";
import { useT } from "@/app/components/TranslationProvider";

const PRESETS = [5, 10, 25, 50] as const;

export default function DonatePage({ cancelled }: { cancelled?: boolean }) {
  const { t } = useT();
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [selected, setSelected] = useState<number | "custom">(10);
  const [custom, setCustom] = useState("");

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      style={{
        padding: "0.6rem 1.6rem",
        borderRadius: "9999px",
        border: active ? "none" : "1px solid var(--ink-20)",
        background: active ? "var(--ink)" : "transparent",
        color: active ? "var(--paper)" : "var(--ink-60)",
        fontSize: "1.3rem",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        transition: "all .12s",
      }}
    >
      {label}
    </button>
  );

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "6rem var(--page-px) 8rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
          <div
            className="font-[family-name:var(--font-hand)]"
            style={{ fontSize: "1.8rem", color: "var(--coral)", marginBottom: "1rem" }}
          >
            {t("donate.eyebrow")}
          </div>
          <h1
            className="font-[family-name:var(--font-display)] font-bold"
            style={{ fontSize: "3.6rem", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 1.6rem" }}
          >
            {t("donate.title")}
          </h1>
          <p style={{ fontSize: "1.4rem", color: "var(--ink-60)", lineHeight: 1.65, margin: 0 }}>
            {t("donate.subtitle")}
          </p>
        </div>

        {cancelled && (
          <div style={{ background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "1rem", padding: "1.2rem 1.6rem", marginBottom: "2.4rem", fontSize: "1.25rem", color: "var(--coral)" }}>
            {t("donate.cancelled")}
          </div>
        )}

        <form action={createDonationSession}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "1.6rem", padding: "3.2rem", boxShadow: "0.2rem 0.3rem 0 rgba(35,32,26,.06)" }}>

            {/* Frequency toggle */}
            <div style={{ marginBottom: "2.8rem" }}>
              <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
                {t("donate.frequencyLabel")}
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                {pill(t("donate.oneTime"), frequency === "one-time", () => setFrequency("one-time"))}
                {pill(t("donate.monthly"), frequency === "monthly", () => setFrequency("monthly"))}
              </div>
              <input type="hidden" name="frequency" value={frequency} />
            </div>

            {/* Amount presets */}
            <div style={{ marginBottom: "2.4rem" }}>
              <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--ink-40)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
                {t("donate.amountLabel")}
              </div>
              <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
                {PRESETS.map((amt) => {
                  const isActive = selected === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelected(amt)}
                      style={{
                        padding: "1rem 2rem",
                        borderRadius: "0.8rem",
                        border: isActive ? "2px solid var(--ink)" : "1px solid var(--ink-20)",
                        background: isActive ? "var(--ink)" : "var(--paper)",
                        color: isActive ? "var(--paper)" : "var(--ink)",
                        fontSize: "1.5rem",
                        fontWeight: isActive ? 700 : 400,
                        cursor: "pointer",
                        fontFamily: "var(--font-display)",
                        transition: "all .1s",
                      }}
                    >
                      €{amt}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setSelected("custom")}
                  style={{
                    padding: "1rem 2rem",
                    borderRadius: "0.8rem",
                    border: selected === "custom" ? "2px solid var(--ink)" : "1px solid var(--ink-20)",
                    background: selected === "custom" ? "var(--ink)" : "var(--paper)",
                    color: selected === "custom" ? "var(--paper)" : "var(--ink-60)",
                    fontSize: "1.35rem",
                    fontWeight: 400,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all .1s",
                  }}
                >
                  {t("donate.custom")}
                </button>
              </div>

              {selected === "custom" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "0.8rem" }}>
                  <span style={{ fontSize: "1.6rem", color: "var(--ink-40)" }}>€</span>
                  <input
                    type="number"
                    name="customAmount"
                    min="1"
                    step="1"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder={t("donate.enterAmount")}
                    required={selected === "custom"}
                    style={{
                      fontSize: "1.5rem",
                      padding: "0.9rem 1.4rem",
                      borderRadius: "0.8rem",
                      border: "1px solid var(--ink-20)",
                      background: "var(--paper)",
                      color: "var(--ink)",
                      outline: "none",
                      width: "16rem",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>
              )}

              <input type="hidden" name="amount" value={selected === "custom" ? "custom" : String(selected)} />
            </div>

            {/* Summary */}
            <div style={{ background: "var(--paper)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", padding: "1.2rem 1.6rem", marginBottom: "2.4rem", fontSize: "1.25rem", color: "var(--ink-60)" }}>
              {selected === "custom"
                ? custom
                  ? `€${parseFloat(custom).toFixed(2)} ${frequency === "monthly" ? t("donate.perMonth") : t("donate.oneTimeLabel")}`
                  : t("donate.summaryEmpty")
                : `€${selected}.00 ${frequency === "monthly" ? t("donate.perMonth") : t("donate.oneTimeLabel")}`}
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "1.2rem",
                borderRadius: "9999px",
                border: "none",
                background: "var(--coral)",
                color: "#fff",
                fontSize: "1.5rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.01em",
              }}
            >
              {frequency === "monthly" ? t("donate.submitMonthly") : t("donate.submitOneTime")}
            </button>

            <p style={{ textAlign: "center", fontSize: "1.1rem", color: "var(--ink-40)", margin: "1.4rem 0 0" }}>
              {t("donate.poweredBy")}
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
