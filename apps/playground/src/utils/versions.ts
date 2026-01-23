/**
 * Gets a list of versions for the given npm package.
 * Deprecated versions will be filtered out.
 */
export const fetchVersions = async (packageName: string): Promise<string[]> => {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  if (!response.ok) return [];

  const json: { versions: Record<string, { version: string; deprecated?: string }> } =
    await response.json();

  return Object.values(json.versions)
    .filter(({ deprecated }) => !deprecated)
    .map(({ version }) => version)
    .reverse();
};
