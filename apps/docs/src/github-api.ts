/**
 * Executes a GET request to the given GitHub API route.
 *
 * @param apiRoute API route without "https://api.github.com/". Must not start with a trailing slash.
 * @throws Error if API request was not successful
 * @returns JSON response body.
 */
export const executeGitHubRequest = async (apiRoute: string) => {
  // we only want to fetch the data from GitHub / npmjs API on build, not when running locally
  // to improve the startup time and prevent rate limits
  if (shouldSkipRemoteFetches()) {
    return { skipped: true };
  }

  // GitHub token can be used to have a higher rate limit (useful if used in CI)
  // see: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#about-primary-rate-limits
  const accessToken = process.env.VITEPRESS_GITHUB_ACCESS_TOKEN;

  const response = await fetch(`https://api.github.com/${apiRoute}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
  const body = await response.json();

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`GitHub request failed. Response body: ${JSON.stringify(body)}`);
  }

  return { skipped: false, body };
};

/**
 * Where all remote fetches, e.g. to GitHub should be skipped to avoid rate limits or failed CI pipelines.
 */
export const shouldSkipRemoteFetches = () => process.env.VITEPRESS_SKIP_REMOTE_FETCH === "true";
