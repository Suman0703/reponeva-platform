import express from "express";
import {
  listBookmarks,
  listBookmarkedIds,
  addBookmark,
  removeBookmark,
} from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Every route here requires login — bookmarks are inherently tied to an
// account, there's no meaningful "anonymous bookmark" case to support.
router.use(protect);

router.get("/", listBookmarks);
router.get("/ids", listBookmarkedIds);
router.post("/", addBookmark);
router.delete("/:githubId", removeBookmark);

export default router;