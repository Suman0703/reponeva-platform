import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  lastSentAt: { type: Date, required: true },
});

// TTL index — MongoDB automatically deletes the document once expiresAt
// has passed. This is cleanup only (it runs on a ~60s background sweep,
// not instantly), so we still check expiry manually in code for correctness —
// this just stops old OTP docs from piling up forever.
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;