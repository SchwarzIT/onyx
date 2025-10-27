import type { createClient } from "./utils/client.js";

export type CreateClientOptions = {
  /**
   * Name of the GitHub organization
   *
   * @example "SchwarzIT"
   */
  organization: string;
  /**
   * ID of the GitHub project.
   */
  projectId: number;
  /**
   * GitHub token to use for authentication.
   * It is recommended to use an environment variable for this and NOT include it in any public code or commit.
   *
   * To get a GitHub token, go to: https://github.com/settings/tokens and create a new token with scope "read:project".
   *
   * @example `authToken: process.env.GITHUB_TOKEN`
   */
  authToken: string;
  /**
   * Maps your custom project field names to functional names used by this client.
   */
  fields: ClientProjectFields;
  /**
   * Fetch function to use for making HTTP requests.
   *
   * @default `global.fetch``
   * @private Only intended for internal usage / testing
   */
  fetch?: typeof global.fetch;
};

export type ClientProjectFields = {
  /**
   * Name of the numeric field that represents your Story effort/size/estimation.
   *
   * @example "Effort"
   */
  effort: string;
  /**
   * Name of the iteration field that represents your iteration/sprint.
   *
   * @example "Sprint"
   */
  iteration: string;
};

export type RunQueryOptions = {
  query: string;
  variables?: Record<string, unknown>;
};

export type Client = ReturnType<typeof createClient>;

export type GraphQLPageInfo = {
  hasNextPage: boolean;
  endCursor?: string;
};

export type Iteration = {
  title: string;
  startDate: DateString;
  duration: number;
};

export type DateString = `${string}-${string}-${string}`;

export type ProjectItem = {
  /**
   * Title of the iteration that the item is assigned to.
   */
  iteration?: string;
  /**
   * Story effort/size/estimation.
   */
  effort?: number;
  /**
   * Type of the issue.
   */
  type?: IssueType;
};

export type IssueType = "Task" | "Feature" | "Bug";

export type IterationBasedMetricOptions = {
  client: Client;
  /**
   * Only items that are assigned to this iteration will be considered.
   * Any date can be passed, the matching iteration will be determined automatically.
   *
   * @default `new Date()`
   */
  iteration?: Date;
};
