import { FigmaVariablesApiResponse } from "../types/figma.js";

/**
 * Fetches the Figma Variables for the given file from the Figma API v1.
 *
 * @param fileKey File key. Example: https://www.figma.com/file/your-file-key-here
 * @param accessToken Personal access token with scope/permission `file_variables:read`
 */
export const fetchFigmaVariables = async (
  fileKey: string,
  accessToken: string,
): Promise<FigmaVariablesApiResponse> => {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
    headers: {
      "X-FIGMA-TOKEN": accessToken,
    },
  });

  const body = await response.json();

  if (response.status !== 200) {
    throw new Error(`Figma API request failed. Response body: ${JSON.stringify(body)}`);
  }

  return body as FigmaVariablesApiResponse;
};
