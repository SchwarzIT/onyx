import type {
  CreateClientOptions,
  GraphQLPageInfo,
  Iteration,
  ProjectItem,
  RunQueryOptions,
} from "../types.js";

/**
 * Creates a new client that can be used to collect metrics from a GitHub project / interact with the GitHub GraphQL API.
 */
export function createClient(options: CreateClientOptions) {
  /**
   * Runs the given GraphQL query on the GitHub API.
   */
  async function runQuery<T>(runOptions: RunQueryOptions) {
    const fetch = options.fetch ?? global.fetch;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify({ query: runOptions.query, variables: runOptions.variables }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.authToken}`,
      },
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

  /**
   * Gets all available iterations sorted ascending from the oldest to the newest.
   */
  async function getAllIterations(): Promise<Iteration[]> {
    type QueryResult = {
      organization: {
        projectV2: {
          field: {
            configuration: {
              completedIterations: Iteration[];
              iterations: Iteration[];
            };
          };
        };
      };
    };

    const query = `
  query GetAllIterationsByField(
    $org: String!
    $projectId: Int!
    $fieldName: String!
  ) {
    organization(login: $org) {
      projectV2(number: $projectId) {
        field(name: $fieldName) {
          ... on ProjectV2IterationField {
            configuration {
              completedIterations {
                title
                startDate
                duration
              }
              iterations {
                title
                startDate
                duration
              }
            }
          }
        }
      }
    }
  }`;

    const data = await runQuery<QueryResult>({
      query,
      variables: {
        org: options.organization,
        projectId: options.projectId,
        fieldName: options.fields.iteration,
      },
    });

    const iterations = [
      // in completedIterations, the latest iteration is the first item so we reverse
      // here to have all iterations be started from first to last.
      ...data.organization.projectV2.field.configuration.completedIterations.reverse(),
      ...data.organization.projectV2.field.configuration.iterations,
    ];

    return iterations;
  }

  /**
   * Gets a list of all available items in the project.
   */
  async function getAllItems(): Promise<ProjectItem[]> {
    type IterationField = {
      __typename: "ProjectV2ItemFieldIterationValue";
      title: string;
      field: {
        name: string;
      };
    };

    type NumberField = {
      __typename: "ProjectV2ItemFieldNumberValue";
      number: number;
      field: {
        name: string;
      };
    };

    type QueryResult = {
      organization: {
        projectV2: {
          items: {
            nodes: {
              fieldValues: {
                nodes: (IterationField | NumberField | { __typename?: never })[];
              };
            }[];
            pageInfo: GraphQLPageInfo;
          };
        };
      };
    };

    const query = `
query GetAllIssues(
  $org: String!
  $projectId: Int!
  $after: String
) {
  organization(login: $org) {
    projectV2(number: $projectId) {
      items(first: 100, after: $after) {
        nodes {
           fieldValues(first: 100) {
            nodes {
              ... on ProjectV2ItemFieldIterationValue {
                title
                __typename
                field {
                  ... on ProjectV2FieldCommon {
                    name
                  }
                }
              }
              ... on ProjectV2ItemFieldNumberValue {
                number
                __typename
                field {
                  ... on ProjectV2FieldCommon {
                    name
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
}`;

    const results: QueryResult[] = [];
    let endCursor: string | undefined;

    // fetch all items
    while (true) {
      const data = await runQuery<QueryResult>({
        variables: {
          org: options.organization,
          projectId: options.projectId,
          after: endCursor,
        },
        query,
      });
      results.push(data);

      if (data.organization.projectV2.items.pageInfo.hasNextPage) {
        endCursor = data.organization.projectV2.items.pageInfo.endCursor;
      } else {
        break;
      }
    }

    // map data to fit our unified type
    return results.flatMap((result) => {
      return result.organization.projectV2.items.nodes.map<ProjectItem>((node) => {
        const iterationField = node.fieldValues.nodes.find(
          (field): field is IterationField =>
            field.__typename === "ProjectV2ItemFieldIterationValue" &&
            field.field.name === options.fields.iteration,
        );

        const effortField = node.fieldValues.nodes.find(
          (field): field is NumberField =>
            field.__typename === "ProjectV2ItemFieldNumberValue" &&
            field.field.name === options.fields.effort,
        );

        return {
          iteration: iterationField?.title,
          effort: effortField?.number,
        };
      });
    });
  }

  return {
    /**
     * Options passed when the client was created.
     */
    options,
    runQuery,
    getAllIterations,
    getAllItems,
  };
}
