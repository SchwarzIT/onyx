/**
 * Check if every entry of a subset exists and matches the entry of a target object.
 * @returns `true`, if target contains the subset
 */
export const isSubsetMatching = (
  subset: Record<string, unknown>,
  target: Record<string, unknown>,
) => Object.entries(subset).every(([key, value]) => target[key] === value);
