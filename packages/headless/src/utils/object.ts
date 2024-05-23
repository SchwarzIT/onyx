/**
 * Check if every entry of a subset exists and matches the entry of a target object.
 * @returns `true`, if target contains the subset
 */
export const isSubsetMatching = (subset: object, target: object) =>
  Object.entries(subset).every(
    ([key, value]) => (target as Record<string, unknown>)[key] === value,
  );
