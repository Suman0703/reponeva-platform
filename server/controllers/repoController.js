import Repo from "../models/Repo.js";
import { getRepositoryById, getLanguageBreakdown } from "../utils/githubApi.js";

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
// GET /api/repos/detail/:githubId — checks the cache first, falls back to
// a live GitHub call for repos AI Search returned that haven't finished
// being cached yet (see the fire-and-forget caching in aiSearchController).
export async function getRepoDetail(req, res) {
  try {
    const githubId = Number(req.params.githubId);
    let repo = await Repo.findOne({ githubId }).populate("category", "name slug");

    let languages = {};

    if (repo) {
      const raw = await getRepositoryById(githubId).catch(() => null);
      if (raw?.languages_url) {
        languages = await getLanguageBreakdown(raw.languages_url);
      }
    } else {
      // Not cached yet — fetch live and shape it the same way the sync
      // job would, without waiting to write it to the database first.
      const raw = await getRepositoryById(githubId);
      languages = raw.languages_url ? await getLanguageBreakdown(raw.languages_url) : {};

      repo = {
        githubId: raw.id,
        name: raw.name,
        fullName: raw.full_name,
        owner: raw.owner.login,
        description: raw.description || "",
        url: raw.html_url,
        language: raw.language,
        topics: raw.topics || [],
        stars: raw.stargazers_count,
        forks: raw.forks_count,
        openIssuesCount: raw.open_issues_count,
        goodFirstIssueCount: 0,
        license: raw.license?.spdx_id || null,
        category: null,
      };
    }

    res.json({ repo, languages });
  } catch (err) {
    console.error("Repo detail fetch failed:", err.message);
    res.status(404).json({ message: "Repo not found" });
  }
}