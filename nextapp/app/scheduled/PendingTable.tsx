"use client";

import { useState, useTransition } from "react";
import { PendingActions } from "./PendingActions";
import { useT } from "@/app/components/TranslationProvider";

const STATUS_BG_COLOR: Record<string, { bg: string; color: string }> = {
  pending:    { bg: "rgba(180,140,40,.1)",  color: "#b48c28" },
  processing: { bg: "rgba(60,100,200,.1)",  color: "#3c64c8" },
  sent:       { bg: "rgba(61,115,107,.1)",  color: "var(--sage)" },
  failed:     { bg: "rgba(214,90,48,.1)",   color: "var(--coral)" },
  cancelled:  { bg: "var(--ink-10)",        color: "var(--ink-40)" },
};

const TH: React.CSSProperties = {
  padding: "0.7rem 1rem",
  textAlign: "left",
  fontFamily: "var(--font-mono)",
  fontSize: "0.9rem",
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--ink-40)",
  whiteSpace: "nowrap",
};

const TD: React.CSSProperties = {
  padding: "0.75rem 1rem",
  fontFamily: "var(--font-mono)",
  fontSize: "1.05rem",
  color: "var(--ink-60)",
  whiteSpace: "nowrap",
};

function fmt(d?: string | null): string {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtShort(d?: string | null): string {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export interface PendingTableRow {
  id: string;
  scheduledFor: string | null;
  status: string;
  title: string;
  isReminder: boolean;
  recipientGroupIds: string[];
  recipientUserIds: string[];
  deleteAction: () => Promise<void>;
  cancelAction: () => Promise<void>;
  reactivateAction: () => Promise<void>;
}

interface Props {
  rows: PendingTableRow[];
  participantCodeById: Record<string, string>;
  groupNameById: Record<string, string>;
  bulkDeleteAction: (ids: string[]) => Promise<void>;
  sortHrefs: { scheduledFor: string; status: string };
  pnSort: string;
  pnDir: string;
}

function SortArrow({ field, pnSort, pnDir }: { field: string; pnSort: string; pnDir: string }) {
  if (pnSort !== field) return <span style={{ opacity: 0.25, marginLeft: "0.3rem" }}>↕</span>;
  return <span style={{ marginLeft: "0.3rem" }}>{pnDir === "asc" ? "↑" : "↓"}</span>;
}

function RecipientCell({ recipientGroupIds, recipientUserIds, participantCodeById, groupNameById, allLabel }: {
  recipientGroupIds: string[];
  recipientUserIds: string[];
  participantCodeById: Record<string, string>;
  groupNameById: Record<string, string>;
  allLabel: string;
}) {
  if (recipientGroupIds.length) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {recipientGroupIds.map((gid) => (
          <span key={gid} style={{ fontSize: "0.9rem", padding: "0.1rem 0.6rem", borderRadius: "9999px", background: "var(--ink-10)", color: "var(--ink-60)" }}>
            {groupNameById[gid] ?? gid}
          </span>
        ))}
      </div>
    );
  }
  if (recipientUserIds.length) {
    return (
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", maxWidth: "14rem" }}>
        {recipientUserIds.map((id) => participantCodeById[id] ?? id).join(", ")}
      </span>
    );
  }
  return <span style={{ color: "var(--ink-40)" }}>{allLabel}</span>;
}

export function PendingTable({ rows, participantCodeById, groupNameById, bulkDeleteAction, sortHrefs, pnSort, pnDir }: Props) {
  const { t } = useT();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const someSelected = selected.size > 0 && !allSelected;

  const PN_STATUS_LABELS: Record<string, string> = {
    pending:    t("pendingTable.statusPending"),
    processing: t("pendingTable.statusProcessing"),
    sent:       t("pendingTable.statusSent"),
    failed:     t("pendingTable.statusFailed"),
    cancelled:  t("pendingTable.statusCancelled"),
  };

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleBulkDelete() {
    const plural = selected.size !== 1 ? "s" : "";
    if (!window.confirm(t("pendingTable.confirmDelete", { n: String(selected.size), plural }))) return;
    const ids = Array.from(selected);
    startTransition(async () => {
      await bulkDeleteAction(ids);
    });
  }

  return (
    <div>
      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem", padding: "0.7rem 1.2rem", background: "rgba(214,90,48,.06)", border: "1px solid rgba(214,90,48,.2)", borderRadius: "0.8rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-60)", flexShrink: 0 }}>
            {t("pendingTable.selected", { n: String(selected.size) })}
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={isPending}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 600, letterSpacing: ".06em", padding: "0.35rem 1.2rem", borderRadius: "9999px", border: "none", background: "var(--coral)", color: "#fff", cursor: isPending ? "wait" : "pointer" }}
            className="hover:opacity-90 transition-opacity"
          >
            {isPending ? t("pendingTable.deleting") : t("pendingTable.deleteN", { n: String(selected.size) })}
          </button>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--ink-40)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
            className="hover:text-[var(--ink)] transition-colors"
          >
            {t("pendingTable.clearSelection")}
          </button>
        </div>
      )}

      {/* ── Desktop table ── */}
      <div className="hidden sm:block" style={{ background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem", overflow: "hidden", boxShadow: "0 0.1rem 0 rgba(0,0,0,.03), 0 0.4rem 1.2rem rgba(60,40,20,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--ink-10)", background: "var(--paper)" }}>
              <th style={{ ...TH, padding: "0.7rem 0.6rem 0.7rem 1rem", width: "2rem" }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                  style={{ cursor: "pointer", accentColor: "var(--coral)", width: "1rem", height: "1rem" }}
                />
              </th>
              <th style={TH}>
                <a href={sortHrefs.scheduledFor} style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center" }}>
                  {t("pendingTable.colScheduledFor")}<SortArrow field="scheduledFor" pnSort={pnSort} pnDir={pnDir} />
                </a>
              </th>
              <th style={TH}>
                <a href={sortHrefs.status} style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center" }}>
                  {t("pendingTable.colStatus")}<SortArrow field="status" pnSort={pnSort} pnDir={pnDir} />
                </a>
              </th>
              <th style={TH}>{t("pendingTable.colTitle")}</th>
              <th style={{ ...TH, textAlign: "center" }}>{t("pendingTable.colReminder")}</th>
              <th style={TH}>{t("pendingTable.colTo")}</th>
              <th style={{ ...TH, width: "1%" }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const colors = STATUS_BG_COLOR[row.status] ?? STATUS_BG_COLOR.cancelled;
              const statusLabel = PN_STATUS_LABELS[row.status] ?? row.status;
              const isSelected = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: i < rows.length - 1 ? "1px solid var(--ink-10)" : "none",
                    background: isSelected ? "rgba(214,90,48,.03)" : undefined,
                  }}
                  className="hover:bg-[var(--paper)] transition-colors"
                >
                  <td style={{ padding: "0.75rem 0.6rem 0.75rem 1rem", width: "2rem" }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(row.id)}
                      style={{ cursor: "pointer", accentColor: "var(--coral)", width: "1rem", height: "1rem" }}
                    />
                  </td>
                  <td style={TD} suppressHydrationWarning>{fmt(row.scheduledFor)}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "0.2rem 0.7rem", borderRadius: "9999px", background: colors.bg, color: colors.color }}>
                      {statusLabel}
                    </span>
                  </td>
                  <td style={{ ...TD, maxWidth: "20rem" }}>
                    <div className="truncate">{row.title || "—"}</div>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                    {row.isReminder ? (
                      <span title={t("pendingTable.reminderBadge")} style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", fontWeight: 700, padding: "0.15rem 0.6rem", borderRadius: "9999px", background: "rgba(124,106,181,.12)", color: "#7c6ab5" }}>R</span>
                    ) : (
                      <span style={{ color: "var(--ink-20)", fontSize: "1rem" }}>—</span>
                    )}
                  </td>
                  <td style={{ ...TD, color: "var(--ink-40)", maxWidth: "20rem" }}>
                    <RecipientCell
                      recipientGroupIds={row.recipientGroupIds}
                      recipientUserIds={row.recipientUserIds}
                      participantCodeById={participantCodeById}
                      groupNameById={groupNameById}
                      allLabel={t("pendingTable.recipientAll")}
                    />
                  </td>
                  <td style={{ padding: "0.5rem 1rem", whiteSpace: "nowrap" }}>
                    <PendingActions
                      status={row.status}
                      scheduledFor={row.scheduledFor ?? undefined}
                      deleteAction={row.deleteAction}
                      cancelAction={row.cancelAction}
                      reactivateAction={row.reactivateAction}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className="block sm:hidden">
        {/* Select-all row */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem", padding: "0.6rem 1rem", background: "var(--surface)", border: "1px solid var(--ink-10)", borderRadius: "0.8rem" }}>
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => { if (el) el.indeterminate = someSelected; }}
            onChange={toggleAll}
            style={{ cursor: "pointer", accentColor: "var(--coral)", width: "1.1rem", height: "1.1rem" }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-40)" }}>
            {allSelected ? t("pendingTable.deselectAll") : t("pendingTable.selectAll")}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            <a href={sortHrefs.scheduledFor} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--ink-40)", textDecoration: "none", padding: "0.2rem 0.6rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", display: "inline-flex", alignItems: "center" }}>
              {t("pendingTable.sortDate")} <SortArrow field="scheduledFor" pnSort={pnSort} pnDir={pnDir} />
            </a>
            <a href={sortHrefs.status} style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--ink-40)", textDecoration: "none", padding: "0.2rem 0.6rem", border: "1px solid var(--ink-20)", borderRadius: "9999px", display: "inline-flex", alignItems: "center" }}>
              {t("pendingTable.sortStatus")} <SortArrow field="status" pnSort={pnSort} pnDir={pnDir} />
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {rows.map((row) => {
            const colors = STATUS_BG_COLOR[row.status] ?? STATUS_BG_COLOR.cancelled;
            const statusLabel = PN_STATUS_LABELS[row.status] ?? row.status;
            const isSelected = selected.has(row.id);
            return (
              <div
                key={row.id}
                style={{
                  background: isSelected ? "rgba(214,90,48,.04)" : "var(--surface)",
                  border: isSelected ? "1px solid rgba(214,90,48,.25)" : "1px solid var(--ink-10)",
                  borderRadius: "0.8rem",
                  padding: "1rem 1.1rem",
                  transition: "border-color .1s, background .1s",
                }}
              >
                {/* Card header: status + checkbox */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.55rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "0.15rem 0.65rem", borderRadius: "9999px", background: colors.bg, color: colors.color }}>
                      {statusLabel}
                    </span>
                    {row.isReminder && (
                      <span title={t("pendingTable.reminderBadge")} style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "9999px", background: "rgba(124,106,181,.12)", color: "#7c6ab5" }}>
                        {t("pendingTable.reminderBadge")}
                      </span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleRow(row.id)}
                    style={{ cursor: "pointer", accentColor: "var(--coral)", width: "1.1rem", height: "1.1rem", flexShrink: 0 }}
                  />
                </div>

                {/* Date */}
                <div suppressHydrationWarning style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.35rem" }}>
                  {fmtShort(row.scheduledFor)}
                </div>

                {/* Title */}
                {row.title && (
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--ink-60)", marginBottom: "0.55rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {row.title}
                  </div>
                )}

                {/* Recipients */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--ink-40)", marginBottom: "0.9rem" }}>
                  <RecipientCell
                    recipientGroupIds={row.recipientGroupIds}
                    recipientUserIds={row.recipientUserIds}
                    participantCodeById={participantCodeById}
                    groupNameById={groupNameById}
                    allLabel={t("pendingTable.recipientAll")}
                  />
                </div>

                {/* Actions */}
                <PendingActions
                  status={row.status}
                  scheduledFor={row.scheduledFor ?? undefined}
                  deleteAction={row.deleteAction}
                  cancelAction={row.cancelAction}
                  reactivateAction={row.reactivateAction}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
