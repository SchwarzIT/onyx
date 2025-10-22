export type RunQueryOptions = {
  query: string;
  variables?: Record<string, unknown>;
};

/**
 * Runs the given GraphQL query on the GitHub API.
 */
export async function runQuery<T>(options: RunQueryOptions, fetch = global.fetch) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: options.query,
      variables: options.variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error fetching data from GitHub: ${await response.text()}`);
  }

  const body = (await response.json()) as { data: T; errors?: unknown[] };

  if (body.errors?.length) {
    throw new Error(`GraphQL query failed: ${JSON.stringify(body.errors, null, 2)}`);
  }

  return body.data;
}
