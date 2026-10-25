/**
 * Groups Result rows into sampling occasions for the data export.
 *
 * An original send and the reminders it spawned are separate Result rows that
 * share a `finid` (generated per participant per send). The earliest row of a
 * group is the original; the rest are its reminders. The occasion id is the
 * original's messageId — the MESSAGE_ID the survey tool received, since a
 * reminder reuses the original's URL — so an export can be joined to survey
 * responses on it. Rows without a `finid` are an occasion of their own.
 *
 * The analytics counterpart is groupByOccasion in lib/data/analytics.ts.
 */
export interface OccasionInput {
  samplyid?: string;
  finid?: string;
  messageId?: string;
  created?: Date | string | number;
}

export interface OccasionLabel {
  occasionId: string;
  isReminder: boolean;
}

export function labelOccasions(rows: OccasionInput[]): OccasionLabel[] {
  const time = (r: OccasionInput) => (r.created ? new Date(r.created).getTime() : Infinity);

  // The original of each finid group: the earliest row, first in input order on a tie.
  const originals = new Map<string, number>();
  rows.forEach((r, i) => {
    if (!r.finid) return;
    const key = `${r.samplyid ?? ""}\u0000${r.finid}`;
    const current = originals.get(key);
    if (current === undefined || time(r) < time(rows[current])) originals.set(key, i);
  });

  return rows.map((r, i) => {
    if (!r.finid) return { occasionId: r.messageId ?? "", isReminder: false };
    const original = originals.get(`${r.samplyid ?? ""}\u0000${r.finid}`)!;
    return { occasionId: rows[original].messageId ?? "", isReminder: original !== i };
  });
}
