import express from "express";
import { aiSearch } from "../controllers/aiSearchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Gated — AI search is a personalized feature per the original spec
// ("JWT required only for personalized features"), and each call costs
// real money via the Grok API, so it shouldn't be open to anonymous spam.
router.post("/search", protect, aiSearch);

export default router;