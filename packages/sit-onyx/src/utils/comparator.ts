type FlatObject = Record<string, string | boolean | number | null | undefined>;

/**
 * Compares two flat objects (whose values are only primitives, no arrays or objects)
 * @returns whether all values match, ignoring in which order they appear
 */
export const areObjectsFlatEqual = (obj1: FlatObject, obj2: FlatObject): boolean => {
  const noUndefinedEntries1 = Object.entries(obj1).filter(([_, value]) => value !== undefined);
  const noUndefinedEntries2 = Object.entries(obj2).filter(([_, value]) => value !== undefined);

  // { } and { a: undefined } are equal, so we ignored all undefined properties to get a more reliable comparison
  if (noUndefinedEntries1.length !== noUndefinedEntries2.length) return false;

  return noUndefinedEntries1.every(([name, value]) => value === obj2[name]);
};
