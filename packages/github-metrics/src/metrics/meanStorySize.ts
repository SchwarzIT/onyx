import type { BasicProjectsQueryOptions, PageInfo } from "../types.js";
import { runQuery } from "../utils/graphql.js";

export type GetMeanStorySizeOptions = BasicProjectsQueryOptions & {
  /**
   * Name of the (numeric) field that contains the story size / estimation.
   *
   * @example "Effort"
   */
  field: string;
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
          nodes: { fieldValueByName?: { number: number } }[];
          pageInfo: PageInfo;
        };
      };
    };
  };

  const query = `
query GetAllIssues($org: String!, $projectId: Int!, $fieldName: String!, $after: String) {
  organization(login: $org) {
    projectV2(number: $projectId) {
      items(first: 100, after: $after) {
        nodes {
          fieldValueByName(name: $fieldName) {
            ... on ProjectV2ItemFieldNumberValue {
              number
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
        fieldName: options.field,
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

  const storySizes = results
    .flatMap((result) =>
      result.organization.projectV2.items.nodes.map((node) => node.fieldValueByName?.number),
    )
    .filter((size) => size != undefined);

  if (!storySizes.length) return 0;

  const totalSize = storySizes.reduce((total, size) => total + size, 0);
  return totalSize / storySizes.length;
}
