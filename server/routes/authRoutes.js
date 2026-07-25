import express from "express";
import { registerUser, sendOtp, verifyOtp, getCurrentUser, logoutUser } from "../controllers/authController.js";
import {
  googleRedirect,
  googleCallback,
  githubRedirect,
  githubCallback,
} from "../controllers/oauthController.js";
import { otpRequestLimiter } from "../middleware/otpLimiter.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/send-otp", otpRequestLimiter, sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);
router.get("/github", githubRedirect);
router.get("/github/callback", githubCallback);

router.get("/me", protect, getCurrentUser);
router.post("/logout", logoutUser);

export default router;