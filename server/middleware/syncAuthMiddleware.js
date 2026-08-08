// Guards the sync route with a shared secret rather than a user role —
// this is an infrastructure operation (refreshing the GitHub cache), not
// a user-facing feature, so there's no real user/session to check against.
// Anyone triggering a sync just needs to know this one value, kept only
// in your .env, never sent to the frontend.
export function requireSyncSecret(req, res, next) {
  const providedKey = req.headers["x-sync-key"];

  if (!process.env.SYNC_SECRET_KEY) {
    // Fails safe: if the env var itself is missing, refuse rather than
    // silently letting every request through unauthenticated.
    console.error("SYNC_SECRET_KEY is not set — refusing all sync requests.");
    return res.status(500).json({ message: "Sync is not configured" });
  }

  if (!providedKey || providedKey !== process.env.SYNC_SECRET_KEY) {
    return res.status(401).json({ message: "Not authorized to trigger sync" });
  }

  next();
}