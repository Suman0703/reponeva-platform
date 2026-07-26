import Repo from "../models/Repo.js";

// GET /api/repos?category=<id>&language=js&sort=stars&page=1
export async function listRepos(req, res) {
  try {
    const { category, language, sort = "stars", page = 1, limit = 12 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (language) filter.language = language;

    const sortMap = { stars: { stars: -1 }, newest: { createdAt: -1 } };

    const repos = await Repo.find(filter)
      .sort(sortMap[sort] || sortMap.stars)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("category", "name slug"); // pulls in just the category's name/slug, not the whole document

    const total = await Repo.countDocuments(filter);

    res.json({ repos, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function getRepoById(req, res) {
  try {
    const repo = await Repo.findById(req.params.id).populate("category", "name slug");
    if (!repo) return res.status(404).json({ message: "Repo not found" });
    res.json(repo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}