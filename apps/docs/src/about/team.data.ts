import { defineLoader } from "vitepress";
import { executeGitHubRequest } from "../github-api.js";

/**
 * Build-time data for the team page
 */
export type TeamPageData = {
  /** All onyx contributors */
  contributors: GithubContributor[];
};

declare const data: TeamPageData;
export { data };

/**
 * Build-Time data loader to get the github data
 * @see https://vitepress.dev/guide/data-loading
 */
export default defineLoader({
  async load(): Promise<TeamPageData> {
    return {
      contributors: (await getContributors()) ?? [],
    };
  },
});

type GithubContributor = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: "User" | "Bot";
  user_view_type: string;
  site_admin: false;
  contributions: number;
};

/**
 * Lists all github contributors
 */
const getContributors = async (): Promise<GithubContributor[]> => {
  const body = await executeGitHubRequest(`repos/SchwarzIT/onyx/contributors`);

  if (typeof body !== "object" && !Array.isArray(body)) {
    throw new Error(
      `GitHub contributor listing is not an array. Response body: ${JSON.stringify(body)}`,
    );
  }
  return body;
};
