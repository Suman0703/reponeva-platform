import User from "../models/User.js";
import Otp from "../models/Otp.js";
import generateToken from "../utils/generateToken.js";
import generateOtp from "../utils/generateOtp.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_TTL_MS = 5 * 60 * 1000;      // 5 minutes
const RESEND_COOLDOWN_MS = 30 * 1000;  // 30 seconds
const MAX_ATTEMPTS = 5;

// POST /api/auth/register
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Password gets hashed automatically by the pre("save") hook on User
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function sendOtp(req, res) {
  try {
    const { email } = req.body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({
        message: "No account found with this email. Please register first.",
      });
    }

    const existing = await Otp.findOne({ email: normalizedEmail });
    if (existing && Date.now() - existing.lastSentAt.getTime() < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil(
        (RESEND_COOLDOWN_MS - (Date.now() - existing.lastSentAt.getTime())) / 1000
      );
      return res.status(429).json({
        message: `Please wait ${waitSeconds}s before requesting another code`,
      });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    // upsert: replaces any previous OTP for this email — the old code
    // becomes invalid the instant a new one is generated, satisfying
    // "invalidate the previous OTP when a new one is generated"
    await Otp.findOneAndUpdate(
      { email: normalizedEmail },
      {
        otpHash,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
        attempts: 0,
        lastSentAt: new Date(),
      },
      { upsert: true }
    );

    await sendOtpEmail(normalizedEmail, otp);

    res.json({ message: "OTP sent to your email", expiresInSeconds: OTP_TTL_MS / 1000 });
  } catch (err) {
    console.error("OTP send failed:", err);
    res.status(502).json({
      message: "Unable to send OTP email right now. Please try again later.",
    });
  }
}

// POST /api/auth/verify-otp
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const record = await Otp.findOne({ email: normalizedEmail });

    if (!record) {
      return res.status(400).json({ message: "No OTP found. Please request a new one." });
    }

    if (Date.now() > record.expiresAt.getTime()) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(429).json({
        message: "Too many failed attempts. Please request a new OTP.",
      });
    }

    const isMatch = await bcrypt.compare(otp, record.otpHash);

    if (!isMatch) {
      record.attempts += 1;
      await record.save();
      return res.status(400).json({
        message: "Incorrect OTP",
        attemptsRemaining: MAX_ATTEMPTS - record.attempts,
      });
    }

    // OTP correct — it's one-time use, so delete it immediately regardless
    // of what happens next. A verified OTP must never be replayable.
    await Otp.deleteOne({ _id: record._id });

    const user = await User.findOne({ email: normalizedEmail });
    const token = generateToken(user._id);

    // HttpOnly: JS on the page (including any injected via XSS) cannot
    // read this cookie at all — it only ever travels in HTTP headers.
    // sameSite: "strict" stops the cookie being sent on cross-site requests,
    // which blocks a large class of CSRF attacks.
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS-only in prod
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, matches JWT expiry
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// GET /api/auth/me
// Called by the frontend on page load to check "is someone logged in,
// and who". Relies entirely on the httpOnly cookie the browser already
// sends automatically — no token handling needed on the frontend at all.
export async function getCurrentUser(req, res) {
  // `protect` middleware already verified the cookie and attached req.user
  // before this function ever runs — so if we're here, they're logged in.
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
}

// POST /api/auth/logout
export function logoutUser(req, res) {
  // Clearing a cookie means setting one with the same name that expires
  // immediately. The options here (httpOnly, sameSite, secure) must match
  // exactly what was used to set it originally, or some browsers won't
  // actually clear it.
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });
  res.json({ message: "Logged out successfully" });
}