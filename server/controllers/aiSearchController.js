import Repo from "../models/Repo.js";
import { interpretSearchQuery } from "../utils/groqApi.js";
import { searchRepositoriesByQuery } from "../utils/githubApi.js";
import { delay } from "../utils/delay.js";

const SEARCH_API_DELAY_MS = 2100;

// Strips spaces, hyphens, and slashes so "e-commerce", "e commerce", and
// "ecommerce" are all treated as the same match — without this, a query
// typed with different punctuation than the repo name uses would miss a
// genuine match entirely.
function normalize(str) {
  return str.toLowerCase().replace(/[\s\-_/]/g, "");
}

// Returns a tier (1 = name match, 2 = description/topics match) plus a
// score within that tier. Tiering, not just a bigger number, is what
// guarantees every name match outranks every non-name match — a huge
// description-match score could otherwise still out-sum a small name
// match under pure additive scoring.
function scoreResult(item, rawQuery, keywords) {
  const normalizedName = normalize(item.name);
  const normalizedFullName = normalize(item.full_name);
  const normalizedQuery = normalize(rawQuery);

  const name = item.name.toLowerCase();
  const description = (item.description || "").toLowerCase();
  const topics = (item.topics || []).map((t) => t.toLowerCase());

  let nameScore = 0;

  // Exact name match (ignoring case/punctuation) is the strongest possible
  // signal — this is almost certainly exactly what the person is looking for.
  if (normalizedName === normalizedQuery) nameScore += 100;
  // Partial match: the query appears inside the name, or vice versa.
  else if (normalizedName.includes(normalizedQuery) || normalizedFullName.includes(normalizedQuery)) {
    nameScore += 50;
  }

  // Each individual keyword found in the name adds further weight — this
  // is what makes "e-commerce website" rank a repo named "ecommerce-store"
  // highly, even though the full phrase isn't an exact substring match.
  for (const keyword of keywords) {
    if (normalizedName.includes(normalize(keyword))) nameScore += 10;
  }

  if (nameScore > 0) {
    return { tier: 1, score: nameScore };
  }

  // Tier 2: no name match at all — score based on description/topics instead.
  let contentScore = 0;
  for (const keyword of keywords) {
    if (topics.some((t) => t.includes(keyword) || keyword.includes(t))) contentScore += 4;
    if (description.includes(keyword)) contentScore += 2;
  }
  contentScore += Math.log10(item.stargazers_count + 1);

  return { tier: 2, score: contentScore };
}

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

    const rawQuery = query.trim();
    const interpretation = await interpretSearchQuery(rawQuery);

    // Always include the literal, unmodified query as one of the searches —
    // this is what guarantees a specific project name like "CityCare" gets
    // searched for exactly as typed, not just as Groq's paraphrased version.
    const searchQueries = [rawQuery, ...(interpretation.searchQueries || [])].slice(0, 4);
    const keywords = interpretation.keywords || [];

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
      }
      await delay(SEARCH_API_DELAY_MS);
    }

    const seen = new Set();
    const deduped = allResults.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

    const ranked = deduped
      .map((item) => ({ item, ...scoreResult(item, rawQuery, keywords) }))
      // Sort by tier first (1 before 2), then by score within that tier —
      // this is the actual mechanism that enforces "all name matches
      // before any description-only match," not just a scoring hint.
      .sort((a, b) => a.tier - b.tier || b.score - a.score)
      .slice(0, 12)
      .map((entry) => entry.item);

    const repos = ranked.map((item) => ({
      _id: item.id,
      githubId: item.id, // added — needed so BookmarkButton has a consistent field to key on, whether the repo came from Explore's cache or a live search
      fullName: item.full_name,
      description: item.description || "",
      url: item.html_url,
      language: item.language,
      topics: item.topics || [],
      stars: item.stargazers_count,
      forks: item.forks_count,
      goodFirstIssueCount: 0,
    }));

    cacheReposInBackground(ranked);

    res.json({ interpretation, repos, total: repos.length });
  } catch (err) {
    console.error("AI search failed:", err);
    res.status(502).json({
      message: "AI search is temporarily unavailable. Please try again.",
    });
  }
}