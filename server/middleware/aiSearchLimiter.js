import rateLimit from "express-rate-limit";

// Each search burns 2-4 GitHub search calls. Capping per-IP prevents one
// person from accidentally (or deliberately) exhausting your shared
// GitHub token's 30/minute search budget for everyone else using the app
// at the same time.
export const aiSearchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 8,
  message: { message: "Too many searches. Please wait a few minutes and try again." },
  standardHeaders: true,
  legacyHeaders: false,
});