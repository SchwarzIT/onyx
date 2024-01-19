type FlatObject = Record<string, string | boolean | number | null | undefined>;

/**
 * Compares two flat objects (whose values are only primitives, no arrays or objects)
 * @returns whether all values match, ignoring in which order they appear
 */
export const areObjectsFlatEqual = (obj1: FlatObject, obj2: FlatObject): boolean => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  const notEqualItems = Object.entries(obj1).filter(([name, value]) => {
    return value !== obj2[name];
  });
  return notEqualItems.length === 0;
};
