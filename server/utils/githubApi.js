const GITHUB_API_BASE = "https://api.github.com";

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

// Searches GitHub for repos matching a topic, sorted by stars. This is the
// core "discovery" call — one topic search can return hundreds of repos
// in a single request, which is far more efficient than fetching repos
// one at a time.
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
  return data.items; // array of repo objects
}

// Separate, lightweight call specifically for counting good-first-issue
// labeled issues — GitHub's repo search response doesn't include this,
// so it needs its own request per repo.
export async function getGoodFirstIssueCount(owner, repoName) {
  const query = encodeURIComponent(
    `repo:${owner}/${repoName} label:"good first issue" state:open`
  );
  const res = await fetch(
    `${GITHUB_API_BASE}/search/issues?q=${query}`,
    { headers: githubHeaders() }
  );

  if (!res.ok) return 0; // non-critical — don't let one failed count break the whole sync
  const data = await res.json();
  return data.total_count;
}