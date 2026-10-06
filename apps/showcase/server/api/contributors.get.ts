import type { Endpoints } from "@octokit/types";

type GetContributorsQuery = Endpoints["GET /repos/{owner}/{repo}/contributors"]["parameters"];
type GetContributorsResponse =
  Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"];

export default defineCachedEventHandler(
  async () => {
    const [teamMembers, contributors] = await Promise.all([
      $fetch("/api/team"),
      $fetch<GetContributorsResponse>("https://api.github.com/repos/SchwarzIT/onyx/contributors", {
        query: {
          per_page: 100,
        } satisfies Partial<GetContributorsQuery>,
        headers: {
          "X-GitHub-Api-Version": "2026-03-10",
        },
      }),
    ]);

    // list of known bots that are marked as "User" from GitHub but we still want to exclude
    const blocklist = ["rhoggs-bot-test-account", "step-security-bot"];

    // filter out bots and team members
    return contributors.filter(
      (contributor) =>
        contributor.type === "User" &&
        !blocklist.includes(contributor.login ?? "") &&
        !teamMembers.some((member) => member.login === contributor.login),
    );
  },
  {
    // unauthenticated GitHub requests are rate limited so we use a cached API route here since the contributors do not change too often
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2026-03-10#primary-rate-limit-for-unauthenticated-users
    maxAge: 60 * 60 * 24, // 1 day
    getKey: (event) => `${event.path}-${event.method}`,
  },
);
