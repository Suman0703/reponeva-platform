import rateLimit from "express-rate-limit";

// Caps OTP requests per IP address — a blunt but necessary layer on top of
// the per-email cooldown in the controller. Without this, someone could
// hammer the endpoint using many different emails and still spam your SMTP
// provider (which usually has its own sending-rate penalties/bans).
export const otpRequestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: { message: "Too many OTP requests. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});