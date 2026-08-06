// Run with: node lib/reliability.test.js   (from Website/)
//
// Covers the Tier 3 reliability logic: how Expo receipts are classified, and
// how the mobile app's status queue behaves when the network is unreliable.
// The app module is ESM, so it is loaded dynamically.

const { classifyReceipt } = require("../services/receiptPoller");

let pass = 0, fail = 0;
function eq(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? "PASS " : "FAIL ") + name);
  if (!ok) { console.log("   got : " + JSON.stringify(got)); console.log("   want: " + JSON.stringify(want)); fail++; } else pass++;
}

// ── Receipt classification ───────────────────────────────────────────────────
{
  const ok = classifyReceipt({ status: "ok" });
  eq("ok receipt records acceptance", ok.events[0].status, "delivery-accepted");
  eq("ok receipt never deactivates a token", ok.deactivate, false);

  const dead = classifyReceipt({
    status: "error", message: "not registered",
    details: { error: "DeviceNotRegistered" },
  });
  eq("DeviceNotRegistered records a failure", dead.events[0].status, "delivery-failed");
  eq("DeviceNotRegistered retires the token", dead.deactivate, true);
  eq("the failure reason is kept", dead.events[0].data.error, "DeviceNotRegistered");

  const rate = classifyReceipt({
    status: "error", message: "slow down", details: { error: "MessageRateExceeded" },
  });
  eq("rate limiting records a failure", rate.events[0].status, "delivery-failed");
  eq("rate limiting must NOT disable the participant's device", rate.deactivate, false);

  const big = classifyReceipt({ status: "error", details: { error: "MessageTooBig" } });
  eq("oversized payload must NOT disable the device", big.deactivate, false);

  const vague = classifyReceipt({ status: "error", message: "?" });
  eq("an error with no details is still a failure", vague.events[0].status, "delivery-failed");
  eq("an error with no details does not deactivate", vague.deactivate, false);
  eq("unknown error reason is labelled", vague.events[0].data.error, "unknown");
}

// ── Status queue ────────────────────────────────────────────────────────────
function memoryStorage() {
  const map = new Map();
  return {
    getItem: async (k) => (map.has(k) ? map.get(k) : null),
    setItem: async (k, v) => { map.set(k, v); },
  };
}
const okRes = { ok: true, status: 200 };
const serverErr = { ok: false, status: 503 };
const rejected = { ok: false, status: 400 };

(async () => {
  const { createStatusQueue } = await import("../../App/utils/statusQueue.js");

  // Delivered events leave the queue.
  {
    const storage = memoryStorage();
    const calls = [];
    const q = createStatusQueue({
      storage,
      fetchImpl: async (url, opts) => { calls.push(JSON.parse(opts.body)); return okRes; },
    });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m1", status: "tapped" });
    eq("event is persisted before any network call", await q.pendingStatusCount(), 1);
    await q.flushStatusQueue("https://s");
    eq("delivered event is removed", await q.pendingStatusCount(), 0);
    eq("exactly one request was made", calls.length, 1);
    eq("request carries the event", calls[0], { messageId: "m1", status: "tapped" });
  }

  // A network failure keeps the event for the next flush. This is the case that
  // used to silently lose a participant's response.
  {
    const storage = memoryStorage();
    let online = false;
    const q = createStatusQueue({
      storage,
      fetchImpl: async () => { if (!online) throw new Error("offline"); return okRes; },
    });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m2", status: "tapped" });
    await q.flushStatusQueue("https://s");
    eq("event survives an offline flush", await q.pendingStatusCount(), 1);
    online = true;
    await q.flushStatusQueue("https://s");
    eq("event is delivered once back online", await q.pendingStatusCount(), 0);
  }

  // 5xx is retried; 4xx is not (the server understood and refused).
  {
    const storage = memoryStorage();
    const q = createStatusQueue({ storage, fetchImpl: async () => serverErr });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m3", status: "tapped" });
    await q.flushStatusQueue("https://s");
    eq("5xx keeps the event queued", await q.pendingStatusCount(), 1);
  }
  {
    const storage = memoryStorage();
    const q = createStatusQueue({ storage, fetchImpl: async () => rejected });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m4", status: "tapped" });
    await q.flushStatusQueue("https://s");
    eq("4xx is not retried forever", await q.pendingStatusCount(), 0);
  }

  // Duplicates would show up in the researcher's export — the server stamps its
  // own timestamp and cannot dedupe them.
  {
    const storage = memoryStorage();
    const q = createStatusQueue({ storage, fetchImpl: async () => okRes });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m5", status: "tapped" });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m5", status: "tapped" });
    eq("the same event is not queued twice", await q.pendingStatusCount(), 1);
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m5", status: "completed" });
    eq("a different status for the same message is kept", await q.pendingStatusCount(), 2);
  }

  // An event queued while a flush is in progress must not be discarded.
  {
    const storage = memoryStorage();
    let release;
    const gate = new Promise((r) => { release = r; });
    const q = createStatusQueue({
      storage,
      fetchImpl: async () => { await gate; return okRes; },
    });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m6", status: "tapped" });
    const flushing = q.flushStatusQueue("https://s");
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m7", status: "tapped" });
    release();
    await flushing;
    eq("event queued mid-flush is retained", await q.pendingStatusCount(), 1);
  }

  // Malformed calls must not poison the queue.
  {
    const storage = memoryStorage();
    const q = createStatusQueue({ storage, fetchImpl: async () => okRes });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: null, status: "tapped" });
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m8", status: null });
    eq("entries with no message id or status are ignored", await q.pendingStatusCount(), 0);
  }

  // Corrupt storage must not wedge the app.
  {
    const storage = memoryStorage();
    await storage.setItem("@status_queue", "{not json");
    const q = createStatusQueue({ storage, fetchImpl: async () => okRes });
    eq("corrupt queue reads as empty", await q.pendingStatusCount(), 0);
    await q.enqueueStatus({ serverUrl: "https://s", messageId: "m9", status: "tapped" });
    eq("queue recovers after corruption", await q.pendingStatusCount(), 1);
  }

  console.log("\n" + pass + " passed, " + fail + " failed");
  process.exit(fail ? 1 : 0);
})();
