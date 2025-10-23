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
  /**
   * Name of the iteration field that represents your iteration/sprint.
   * If unset, the first available iteration field will be used.
   *
   * This is only relevant for metrics that are iteration-based.
   */
  iterationFieldName?: string;
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor?: string;
};

export type Iteration = {
  id: string;
  title: string;
  startDate: DateString;
  duration: number;
};

export type DateString = `${string}-${string}-${string}`;
