import Repo from "../models/Repo.js";
import { interpretSearchQuery } from "../utils/groqApi.js";
import { searchRepositoriesByQuery } from "../utils/githubApi.js";
import { delay } from "../utils/delay.js";

const SEARCH_API_DELAY_MS = 2100; // same 30/minute pacing as the sync job

function scoreResult(item, keywords) {
  let score = 0;
  const name = item.name.toLowerCase();
  const description = (item.description || "").toLowerCase();
  const topics = (item.topics || []).map((t) => t.toLowerCase());

  for (const keyword of keywords) {
    if (name.includes(keyword)) score += 5;
    if (topics.some((t) => t.includes(keyword) || keyword.includes(t))) score += 4;
    if (description.includes(keyword)) score += 2;
  }
  // Baseline popularity signal so a well-matched-but-tiny repo doesn't
  // always beat a hugely popular, slightly-less-perfectly-worded one.
  score += Math.log10(item.stargazers_count + 1);

  return score;
}

// Saves live-fetched repos into your own cache in the background, so
// repeated searches and future features (bookmarks, repo detail pages)
// benefit from this data too — without making the user wait for it.
async function cacheReposInBackground(items) {
  for (const item of items) {
    Repo.findOneAndUpdate(
      { githubId: item.id },
      {
        githubId: item.id,
        name: item.name,
        fullName: item.full_name,
        owner: item.owner.login,
        description: item.description || "",
        url: item.html_url,
        language: item.language,
        topics: item.topics || [],
        stars: item.stargazers_count,
        forks: item.forks_count,
        openIssuesCount: item.open_issues_count,
        license: item.license?.spdx_id || null,
        lastSyncedAt: new Date(),
      },
      { upsert: true }
    ).catch((err) => console.error("Background cache upsert failed:", err.message));
  }
}

export async function aiSearch(req, res) {
  try {
    const { query } = req.body;

    if (!query || query.trim().length < 3) {
      return res.status(400).json({ message: "Please enter a real search query" });
    }

    const interpretation = await interpretSearchQuery(query.trim());
    const searchQueries = interpretation.searchQueries?.slice(0, 3) || [query];
    const keywords = interpretation.keywords || [];

    // Run each generated query against live GitHub search, paced to respect
    // the 30/minute search limit. Sequential, not parallel — parallel calls
    // would burn through the per-minute budget just as fast, just messier.
    const allResults = [];
    for (const q of searchQueries) {
      const fullQuery = interpretation.language
        ? `${q} language:${interpretation.language}`
        : q;
      try {
        const items = await searchRepositoriesByQuery(fullQuery, { perPage: 20 });
        allResults.push(...items);
      } catch (err) {
        console.error(`Search failed for query "${q}":`, err.message);
        // One failed sub-query shouldn't kill the whole search — continue
        // with whatever the other queries returned.
      }
      await delay(SEARCH_API_DELAY_MS);
    }

    // Dedupe — the same popular repo often shows up across multiple
    // sub-queries (e.g. a great portfolio repo matching all 3 phrasings).
    const seen = new Set();
    const deduped = allResults.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

    const ranked = deduped
      .map((item) => ({ item, score: scoreResult(item, keywords) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((entry) => entry.item);

    // Shape live GitHub API results to match the same fields RepoCard
    // already expects from your cached Repo documents — so the frontend
    // doesn't need two different rendering paths.
    const repos = ranked.map((item) => ({
      _id: item.id,
      fullName: item.full_name,
      description: item.description || "",
      url: item.html_url,
      language: item.language,
      topics: item.topics || [],
      stars: item.stargazers_count,
      forks: item.forks_count,
      goodFirstIssueCount: 0, // not available on live results — see note above
    }));

    cacheReposInBackground(ranked); // fire-and-forget, doesn't block the response

    res.json({ interpretation, repos, total: repos.length });
  } catch (err) {
    console.error("AI search failed:", err);
    res.status(502).json({
      message: "AI search is temporarily unavailable. Please try again.",
    });
  }
}