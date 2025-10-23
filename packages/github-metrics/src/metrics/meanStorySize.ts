import type { BasicProjectsQueryOptions, PageInfo } from "../types.js";
import { runQuery } from "../utils/graphql.js";
import { findIterationByDate } from "../utils/iterations.js";

export type GetMeanStorySizeOptions = BasicProjectsQueryOptions & {
  /**
   * Name of the (numeric) field that contains the story size / estimation.
   *
   * @example "Effort"
   */
  field: string;
  /**
   * Iteration to consider for the calculation.
   * If unset, the current iteration will be detected automatically.
   */
  iteration?: Date;
};

/**
 * Calculates the mean / average story size of an item in the given GitHub project.
 * Items without an assigned size will be ignored.
 */
export async function getMeanStorySize(options: GetMeanStorySizeOptions): Promise<number> {
  type QueryResult = {
    organization: {
      projectV2: {
        items: {
          nodes: {
            fieldValues: {
              nodes: (
                | {
                    title: string;
                    __typename: "ProjectV2ItemFieldIterationValue";
                  }
                | {
                    number: number;
                    __typename: "ProjectV2ItemFieldNumberValue";
                    field: {
                      name: string;
                    };
                  }
                | { __typename?: never }
              )[];
            };
          }[];
          pageInfo: PageInfo;
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

  const iteration = await findIterationByDate(options, options.iteration);

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

  // filter out all items that are part of the current iteration
  const iterationItems = results
    .flatMap((result) => {
      return result.organization.projectV2.items.nodes.flatMap((item) => {
        const isCurrentIteration = item.fieldValues.nodes.some(
          (field) =>
            field.__typename === "ProjectV2ItemFieldIterationValue" &&
            field.title === iteration.title,
        );

        return isCurrentIteration ? item : undefined;
      });
    })
    .filter((item) => item != undefined);

  // filter data
  const storySizes = iterationItems
    .map((item) => {
      const field = item.fieldValues.nodes.find(
        (field): field is typeof field & { __typename: "ProjectV2ItemFieldNumberValue" } =>
          field.__typename === "ProjectV2ItemFieldNumberValue" &&
          field.field.name === options.field,
      );

      return field?.number;
    })
    .filter((size) => size != undefined);

  if (!storySizes.length) return 0;

  const totalSize = storySizes.reduce((total, size) => total + size, 0);
  return totalSize / storySizes.length;
}
