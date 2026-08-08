import express from "express";
import { runSync } from "../controllers/syncController.js";
import { requireSyncSecret } from "../middleware/syncAuthMiddleware.js";

const router = express.Router();

router.post("/", requireSyncSecret, runSync);

export default router;