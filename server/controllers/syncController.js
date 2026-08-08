import Category from "../models/Category.js";
import Repo from "../models/Repo.js";
import { searchRepositoriesByTopic, getGoodFirstIssueCount } from "../utils/githubApi.js";
import { delay } from "../utils/delay.js";

const SEARCH_API_DELAY_MS = 2100;

// The actual sync work, with no knowledge of HTTP at all — this is what
// lets both the manual /api/sync route AND the scheduled cron job run
// the exact same logic, instead of the cron job reimplementing it
// separately and risking the two drifting out of sync with each other.
export async function performSync({ skipIssueCounts = false } = {}) {
  const categories = await Category.find();
  let totalSynced = 0;

  for (const category of categories) {
    for (const topic of category.githubTopics) {
      const repos = await searchRepositoriesByTopic(topic);
      await delay(SEARCH_API_DELAY_MS);

      for (const repo of repos) {
        const goodFirstIssueCount = skipIssueCounts
          ? 0
          : await getGoodFirstIssueCount(repo.owner.login, repo.name);
        if (!skipIssueCounts) await delay(SEARCH_API_DELAY_MS);

        await Repo.findOneAndUpdate(
          { githubId: repo.id },
          {
            githubId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            owner: repo.owner.login,
            description: repo.description || "",
            url: repo.html_url,
            language: repo.language,
            topics: repo.topics || [],
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            openIssuesCount: repo.open_issues_count,
            goodFirstIssueCount,
            license: repo.license?.spdx_id || null,
            category: category._id,
            lastSyncedAt: new Date(),
          },
          { upsert: true, returnDocument: "after" }
        );

        totalSynced += 1;
      }
    }
  }

  return totalSynced;
}

// Thin HTTP wrapper — the route handler's only job now is reading the
// query param and translating the result into a response.
export async function runSync(req, res) {
  const skipIssueCounts = req.query.skipIssueCounts === "true";
  try {
    const totalSynced = await performSync({ skipIssueCounts });
    res.json({ message: "Sync complete", totalSynced, skipIssueCounts });
  } catch (err) {
    console.error("Sync failed:", err);
    res.status(500).json({ message: "Sync failed", error: err.message });
  }
}