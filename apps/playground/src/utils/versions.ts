/**
 * Gets a list of versions for the given npm package.
 */
export const fetchVersions = async (packageName: string): Promise<string[]> => {
  const response = await fetch(`https://data.jsdelivr.com/v1/package/npm/${packageName}`);
  const json: { versions: string[] } = await response.json();
  return json.versions;
};
