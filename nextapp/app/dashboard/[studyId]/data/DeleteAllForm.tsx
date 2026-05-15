"use client";

import SubmitButton from "@/app/components/ui/SubmitButton";
import { useT } from "@/app/components/TranslationProvider";

export function DeleteAllForm({
  action,
  count,
}: {
  action: () => Promise<void>;
  count: number;
}) {
  const { t } = useT();
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(t("data.deleteAllConfirm", { n: count.toLocaleString() })))
          e.preventDefault();
      }}
    >
      <SubmitButton
        pendingLabel={t("data.deleteAllDeleting")}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.1rem",
          letterSpacing: ".06em",
          padding: "0.9rem 1.8rem",
          borderRadius: "9999px",
          border: "1px solid rgba(214,90,48,.35)",
          background: "rgba(214,90,48,.07)",
          color: "var(--coral)",
          flexShrink: 0,
        }}
        className="hover:opacity-70 transition-opacity"
      >
        {t("data.deleteAllButton")}
      </SubmitButton>
    </form>
  );
}
