export type BasicProjectsQueryOptions = {
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
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor?: string;
};
