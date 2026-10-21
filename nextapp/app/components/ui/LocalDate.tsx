"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Formats a timestamp in the browser, never on the server: server rendering
// would use the server's timezone (Europe/Berlin), and suppressHydrationWarning
// keeps that server text instead of re-rendering it. The server snapshot is
// false, so SSR and the hydration pass render an empty span and the client
// fills it in right after.
//
// Pass `timeZone` to show the time in a fixed zone (e.g. a schedule's own
// timezone) with a zone label; the viewer's local time goes in the tooltip.
export function LocalDate({
  value,
  options,
  timeZone,
  fallback = "—",
}: {
  value?: Date | string | null;
  options?: Intl.DateTimeFormatOptions;
  timeZone?: string;
  fallback?: string;
}) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  if (!value) return <>{fallback}</>;
  const date = new Date(value);
  if (isNaN(date.getTime())) return <>{fallback}</>;
  if (!isClient) return <span />;

  if (!timeZone) return <span>{date.toLocaleString(undefined, options)}</span>;

  let text: string;
  try {
    text = date.toLocaleString(undefined, { ...options, timeZone, timeZoneName: "short" });
  } catch {
    // Unknown IANA name stored on an old schedule — fall back to local time.
    return <span>{date.toLocaleString(undefined, options)}</span>;
  }
  const local = date.toLocaleString(undefined, { ...options, timeZoneName: "short" });
  return <span title={local !== text ? local : undefined}>{text}</span>;
}
