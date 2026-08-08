import cron from "node-cron";
import { performSync } from "../controllers/syncController.js";

// Guards against overlapping runs — if a sync is still going (it can take
// 30-45+ minutes) when the next scheduled trigger fires, we skip that
// trigger entirely rather than starting a second sync on top of the first,
// which would double up on GitHub API usage for no benefit.
let isSyncRunning = false;

export function startScheduledSync() {
  // Every 12 hours, at minute 0 — e.g. 12:00 AM and 12:00 PM server time.
  // Cron syntax: "minute hour day month weekday" — "0 */12 * * *" reads as
  // "at minute 0, every 12th hour."
  cron.schedule("0 */12 * * *", async () => {
    if (isSyncRunning) {
      console.log("[scheduled-sync] Skipped — previous sync still running.");
      return;
    }

    isSyncRunning = true;
    console.log("[scheduled-sync] Starting scheduled sync...");
    const startedAt = Date.now();

    try {
      const totalSynced = await performSync({ skipIssueCounts: false });
      const minutes = ((Date.now() - startedAt) / 60000).toFixed(1);
      console.log(`[scheduled-sync] Completed — ${totalSynced} repos synced in ${minutes} min.`);
    } catch (err) {
      console.error("[scheduled-sync] Failed:", err.message);
    } finally {
      isSyncRunning = false;
    }
  });

  console.log("[scheduled-sync] Job registered — running every 12 hours.");
}