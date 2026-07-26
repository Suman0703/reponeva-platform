import Category from "../models/Category.js";
import Repo from "../models/Repo.js";
import { searchRepositoriesByTopic, getGoodFirstIssueCount } from "../utils/githubApi.js";
import { delay } from "../utils/delay.js";

// 30 requests/minute = 1 every 2 seconds. Using 2.1s gives a small safety
// margin rather than sitting exactly on the boundary.
const SEARCH_API_DELAY_MS = 2100;

export async function runSync(req, res) {
  const skipIssueCounts = req.query.skipIssueCounts === "true";

  try {
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

    res.json({ message: "Sync complete", totalSynced, skipIssueCounts });
  } catch (err) {
    console.error("Sync failed:", err);
    res.status(500).json({ message: "Sync failed", error: err.message });
  }
}