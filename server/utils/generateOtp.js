import crypto from "crypto";

// crypto.randomInt is cryptographically secure — unlike Math.random(),
// its output can't be predicted even if an attacker knows prior outputs.
// That matters here specifically because OTPs are a security boundary.
export default function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}