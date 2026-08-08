const GITHUB_API_BASE = "https://api.github.com";

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

// Searches GitHub for repos matching a topic, sorted by stars. Used by
// the sync job to populate your cached Repo collection.
export async function searchRepositoriesByTopic(topic, page = 1, perPage = 30) {
  const query = encodeURIComponent(`topic:${topic}`);
  const res = await fetch(
    `${GITHUB_API_BASE}/search/repositories?q=${query}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
    { headers: githubHeaders() }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`GitHub search failed (${res.status}): ${body.message || "unknown error"}`);
  }

  const data = await res.json();
  return data.items;
}

// Counts good-first-issue labeled issues for one repo. Used by the sync job.
export async function getGoodFirstIssueCount(owner, repoName) {
  const query = encodeURIComponent(
    `repo:${owner}/${repoName} label:"good first issue" state:open`
  );
  const res = await fetch(
    `${GITHUB_API_BASE}/search/issues?q=${query}`,
    { headers: githubHeaders() }
  );

  if (!res.ok) return 0;
  const data = await res.json();
  return data.total_count;
}

// Free-text search across GitHub's whole repository index — used by
// AI Search, unlike the topic-based search above which the sync job uses.
export async function searchRepositoriesByQuery(queryString, options = {}) {
  const { perPage = 25, minStars = 20 } = options;
  const query = encodeURIComponent(`${queryString} stars:>=${minStars}`);

  const res = await fetch(
    `${GITHUB_API_BASE}/search/repositories?q=${query}&sort=stars&order=desc&per_page=${perPage}`,
    { headers: githubHeaders() }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`GitHub search failed (${res.status}): ${body.message || "unknown error"}`);
  }

  const data = await res.json();
  return data.items;
}

export async function getRepositoryById(githubId) {
  const res = await fetch(`${GITHUB_API_BASE}/repositories/${githubId}`, {
    headers: githubHeaders(),
  });
  if (!res.ok) {
    throw new Error(`GitHub repo lookup failed (${res.status})`);
  }
  return res.json();
}

export async function getLanguageBreakdown(languagesUrl) {
  const res = await fetch(languagesUrl, { headers: githubHeaders() });
  if (!res.ok) return {};
  return res.json(); // { "JavaScript": 12345, "CSS": 456, ... } — byte counts per language
}