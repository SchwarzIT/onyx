import type { BasicProjectsQueryOptions, Iteration } from "../types.js";
import { runQuery } from "./graphql.js";

/**
 * Gets all available iterations. If a iterationFieldName is defined, it will use it as source.
 * Otherwise, the first found field of type "iteration" will be used (limited to max. 100 fields. If you have more than 100 fields, you should define the iterationFieldName).
 */
export function getIterations(options: BasicProjectsQueryOptions) {
  if (options.iterationFieldName) return getIterationsByField(options);
  return findIterationsByFirstField(options);
}

/**
 * Finds the iteration where the given date (default = today) is part of.
 */
export async function findIterationByDate(options: BasicProjectsQueryOptions, date = new Date()) {
  const iterations = await getIterations(options);

  const iteration = iterations.find((iteration) => {
    const start = new Date(iteration.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + iteration.duration);
    end.setHours(23, 59, 59, 999);
    return date >= start && date <= end;
  });

  if (!iteration) {
    throw new Error(`No iteration found for the given date: ${date}`);
  }

  return iteration;
}

/**
 * Gets all iterations for a defined field name.
 */
async function getIterationsByField(options: BasicProjectsQueryOptions) {
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
              id
              title
              startDate
              duration
            }
            iterations {
              id
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
      fieldName: options.iterationFieldName,
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
 * Finds the first available field of type "iteration" and gets all iterations from it.
 * Will only consider the first 100 fields.
 */
async function findIterationsByFirstField(options: BasicProjectsQueryOptions) {
  type QueryResult = {
    organization: {
      projectV2: {
        fields: {
          nodes: {
            configuration?: {
              completedIterations: Iteration[];
              iterations: Iteration[];
            };
          }[];
        };
      };
    };
  };

  const query = `
query GetAllIterations($org: String!, $projectId: Int!) {
  organization(login: $org) {
    projectV2(number: $projectId) {
      fields(first: 100) {
        nodes {
          ... on ProjectV2IterationField {
            configuration {
              completedIterations {
                id
                title
                startDate
                duration
              }
              iterations {
                id
                title
                startDate
                duration
              }
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
    },
  });

  const firstMatch = data.organization.projectV2.fields.nodes.find(
    (node): node is Required<typeof node> => !!node.configuration,
  );

  if (!firstMatch) {
    throw new Error("No iteration field found in the project");
  }

  const iterations = [
    // in completedIterations, the latest iteration is the first item so we reverse
    // here to have all iterations be started from first to last.
    ...firstMatch.configuration.completedIterations.reverse(),
    ...firstMatch.configuration.iterations,
  ];

  return iterations;
}
