import express from "express";
import { runSync } from "../controllers/syncController.js";

const router = express.Router();

// No auth middleware yet, deliberately — flagged below.
router.post("/", runSync);

export default router;