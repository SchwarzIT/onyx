export const isSubsetMatching = (
  subset: Record<string, unknown>,
  compared: Record<string, unknown>,
) => Object.entries(subset).every(([key, value]) => compared[key] === value);
