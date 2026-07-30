import Repo from "../models/Repo.js";
import { interpretSearchQuery } from "../utils/groqApi.js";

// Scores one repo against the expanded keyword list. Different fields
// matching are weighted differently, since a keyword appearing in the repo
// NAME is a much stronger relevance signal than one buried in a long
// description — this weighting is what turns "any match at all" into
// something that actually ranks well vs. loosely.
function scoreRepo(repo, keywords) {
  let score = 0;
  const name = repo.name.toLowerCase();
  const description = (repo.description || "").toLowerCase();
  const topics = repo.topics.map((t) => t.toLowerCase());

  for (const keyword of keywords) {
    if (name.includes(keyword)) score += 5;
    if (topics.some((t) => t.includes(keyword) || keyword.includes(t))) score += 4;
    if (description.includes(keyword)) score += 2;
  }

  return score;
}

export async function aiSearch(req, res) {
  try {
    const { query } = req.body;

    if (!query || query.trim().length < 3) {
      return res.status(400).json({ message: "Please enter a real search query" });
    }

    const interpretation = await interpretSearchQuery(query.trim());
    const keywords = interpretation.keywords || [];

    if (keywords.length === 0) {
      return res.json({ interpretation, repos: [], total: 0 });
    }

    // Build one big OR condition across name/description/topics for every
    // keyword — this is the "broad recall" step. Using regex (not $in) for
    // name/description since those are free text, not exact tags like topics.
    const orConditions = [];
    for (const keyword of keywords) {
      const pattern = new RegExp(keyword.replace(/-/g, "[-\\s]?"), "i");
      // ^ allows "personal-website" to also match "personal website" (space
      // instead of hyphen) in free-text fields, without needing two keywords.
      orConditions.push({ name: pattern });
      orConditions.push({ description: pattern });
      orConditions.push({ topics: pattern });
    }

    const dbFilter = { $or: orConditions };
    if (interpretation.language) {
      dbFilter.language = new RegExp(`^${interpretation.language}$`, "i");
    }
    if (interpretation.skillLevel === "beginner") {
      dbFilter.goodFirstIssueCount = { $gt: 0 };
    }

    // Cap candidates from the DB before scoring in JS — scoring is cheap
    // per-document, but we don't want to pull thousands of loosely-matching
    // rows into memory for a broad query like "business".
    const candidates = await Repo.find(dbFilter)
      .limit(200)
      .populate("category", "name slug");

    const ranked = candidates
      .map((repo) => ({ repo, score: scoreRepo(repo, keywords) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || b.repo.stars - a.repo.stars)
      .slice(0, 12)
      .map((entry) => entry.repo);

    res.json({
      interpretation,
      repos: ranked,
      total: ranked.length,
    });
  } catch (err) {
    console.error("AI search failed:", err);
    res.status(502).json({
      message: "AI search is temporarily unavailable. Please try again.",
    });
  }
}