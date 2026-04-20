// ─────────────────────────────────────────────
// Helper: parse username & repoName from URL
// Supports:
//   https://github.com/username/repo-name
//   https://github.com/username/repo-name.git
//   github.com/username/repo-name
// ─────────────────────────────────────────────
export const parseGithubUrl = (
  url: string,
): { username: string; repoName: string } | null => {
  try {
    const cleaned = url.replace(/\.git$/, "").trim();
    const parsed = new URL(
      cleaned.startsWith("http") ? cleaned : `https://${cleaned}`,
    );
    if (parsed.hostname !== "github.com") return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { username: parts[0], repoName: parts[1] };
  } catch {
    return null;
  }
};

// ─────────────────────────────────────────────
// Helper: fetch repo data from GitHub REST API
// ─────────────────────────────────────────────
export const fetchGithubRepoData = async (
  username: string,
  repoName: string,
) => {
  const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Use token from env if available to avoid rate limiting
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(apiUrl, { headers });

  if (res.status === 404) {
    return null; // repo not found or private
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
};
