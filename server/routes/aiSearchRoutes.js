import express from "express";
import { aiSearch } from "../controllers/aiSearchController.js";
import { protect } from "../middleware/authMiddleware.js";
import { aiSearchLimiter } from "../middleware/aiSearchLimiter.js";

const router = express.Router();

router.post("/search", protect, aiSearchLimiter, aiSearch);

export default router;