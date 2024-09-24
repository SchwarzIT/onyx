import { FigmaComponentsApiResponse, FigmaVariablesApiResponse } from "../types/figma.js";

/**
 * Fetches the Figma Variables for the given file from the Figma API v1.
 *
 * @param fileKey File key. Example: https://www.figma.com/file/your-file-key-here
 * @param accessVariable Personal access variable with scope/permission `file_variables:read`
 * @see https://www.figma.com/developers/api#get-local-variables-endpoint
 */
export const fetchFigmaVariables = async (fileKey: string, accessVariable: string) => {
  return fetchFigma<FigmaVariablesApiResponse>(
    `https://api.figma.com/v1/files/${fileKey}/variables/local`,
    accessVariable,
  );
};

/**
 * Fetches the Figma components for the given file from the Figma API v1.
 *
 * @param fileKey File key. Example: https://www.figma.com/file/your-file-key-here
 * @param accessVariable Personal access variable with scope/permission `file_read` or `files:read`
 * @see https://www.figma.com/developers/api#get-file-components-endpoint
 */
export const fetchFigmaComponents = async (fileKey: string, accessVariable: string) => {
  return fetchFigma<FigmaComponentsApiResponse>(
    `https://api.figma.com/v1/files/${fileKey}/components`,
    accessVariable,
  );
};

export const fetchFigmaSVGs = async (
  fileKey: string,
  componentIds: string[],
  accessVariable: string,
) => {
  const result = await fetchFigma<{ images: Record<string, string> }>(
    `https://api.figma.com/v1/images/${fileKey}?ids=${componentIds.join()}&format=svg`,
    accessVariable,
  );

  await Promise.all(
    Object.entries(result.images).map(async ([id, imageUrl]) => {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch SVG content for component ${id}: ${response.statusText}`);
      }
      result.images[id] = await response.text();
    }),
  );

  return result.images;
};

/**
 * Generic utility to fetch Figma API routes.
 *
 * @param url API route, e.g. "https://api.figma.com/v1/files/${filekey}"
 * @param accessVariable Access variable for authentication
 * @throws Error if request was not successful
 */
export const fetchFigma = async <T = unknown>(url: string, accessVariable: string) => {
  const response = await fetch(url, {
    headers: {
      "X-FIGMA-VARIABLE": accessVariable,
    },
  });

  const body = await response.json();

  if (response.status !== 200) {
    throw new Error(`Figma API request failed. Response body: ${JSON.stringify(body)}`);
  }

  return body as T;
};
