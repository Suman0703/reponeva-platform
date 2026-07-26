import Repo from "../models/Repo.js";
import { interpretSearchQuery } from "../utils/groqApi.js"; 

export async function aiSearch(req, res) {
  try {
    const { query } = req.body;

    if (!query || query.trim().length < 3) {
      return res.status(400).json({ message: "Please enter a real search query" });
    }

    const interpretation = await interpretSearchQuery(query.trim());

    // Build a MongoDB filter from Grok's structured output. Each condition
    // only gets added if Grok actually returned it — an empty/null field
    // shouldn't accidentally filter out every repo.
    const filter = {};

    if (interpretation.language) {
      // Case-insensitive exact-ish match — GitHub's `language` field is
      // stored with its own casing convention (e.g. "JavaScript", "Rust")
      filter.language = new RegExp(`^${interpretation.language}$`, "i");
    }

    if (interpretation.topics?.length > 0) {
      filter.topics = { $in: interpretation.topics };
    }

    if (interpretation.skillLevel === "beginner") {
      filter.goodFirstIssueCount = { $gt: 0 };
    }

    const repos = await Repo.find(filter)
      .sort({ stars: -1 })
      .limit(12)
      .populate("category", "name slug");

    res.json({
      interpretation,
      repos,
      total: repos.length,
    });
  } catch (err) {
    console.error("AI search failed:", err);
    res.status(502).json({
      message: "AI search is temporarily unavailable. Please try again.",
    });
  }
}