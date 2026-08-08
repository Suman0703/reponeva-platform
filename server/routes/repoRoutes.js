import express from "express";
import { listRepos, getRepoById, getRepoDetail } from "../controllers/repoController.js";

const router = express.Router();

router.get("/", listRepos);
router.get("/:id", getRepoById);
router.get("/detail/:githubId", getRepoDetail);

export default router;