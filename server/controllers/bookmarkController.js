import Bookmark from "../models/Bookmark.js";

// GET /api/bookmarks — full saved-project data, for the Bookmarks page
export async function listBookmarks(req, res) {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// GET /api/bookmarks/ids — just the githubIds, cheap and fast, so any page
// showing repo cards can mark which ones are already saved without
// fetching every bookmark's full data every time.
export async function listBookmarkedIds(req, res) {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).select("githubId");
    res.json(bookmarks.map((b) => b.githubId));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// POST /api/bookmarks — body is the repo data itself (same shape RepoCard
// already receives), not just an id, since we need the snapshot to save.
export async function addBookmark(req, res) {
  try {
    const { githubId, fullName, description, url, language, topics, stars, forks } = req.body;

    if (!githubId || !fullName || !url) {
      return res.status(400).json({ message: "Missing required repo data" });
    }

    const bookmark = await Bookmark.findOneAndUpdate(
      { user: req.user._id, githubId },
      { user: req.user._id, githubId, fullName, description, url, language, topics, stars, forks },
      { upsert: true, returnDocument: "after" }
    );

    res.status(201).json(bookmark);
  } catch (err) {
    // A duplicate-key error here means the unique index caught a race —
    // treat it as a success rather than an error, since the end state
    // ("this repo is bookmarked") is exactly what the user wanted anyway.
    if (err.code === 11000) {
      const existing = await Bookmark.findOne({ user: req.user._id, githubId: req.body.githubId });
      return res.status(200).json(existing);
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// DELETE /api/bookmarks/:githubId
export async function removeBookmark(req, res) {
  try {
    await Bookmark.findOneAndDelete({
      user: req.user._id,
      githubId: Number(req.params.githubId),
    });
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}