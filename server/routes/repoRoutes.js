import express from "express";
import { listRepos, getRepoById } from "../controllers/repoController.js";

const router = express.Router();

router.get("/", listRepos);
router.get("/:id", getRepoById);

export default router;