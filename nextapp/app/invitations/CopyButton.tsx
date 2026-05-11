"use client";

export default function CopyButton({ targetId, label = "Copy link" }: { targetId: string; label?: string }) {
  function handleClick() {
    const el = document.getElementById(targetId) as HTMLInputElement | null;
    if (!el) return;
    el.select();
    navigator.clipboard.writeText(el.value).catch(() => document.execCommand("copy"));
  }

  return (
    <button type="button" className="button" onClick={handleClick}>
      {label}
    </button>
  );
}
