import jwt from "jsonwebtoken";

// Centralized so token expiry/secret logic lives in exactly one place.
// If you ever change expiry from 30d to 7d, this is the only line that changes.
export default function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}