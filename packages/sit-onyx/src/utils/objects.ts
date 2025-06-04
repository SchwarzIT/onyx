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

export const groupByKey = <TValue extends { [key in TKey]?: string }, TKey extends keyof TValue>(
  objects: TValue[],
  key: TKey,
) => {
  return objects.reduce(
    (acc, currOpt) => {
      const groupName = currOpt[key] ?? "";
      acc[groupName] = acc[groupName] || [];
      acc[groupName].push(currOpt);
      return acc;
    },
    {} as Record<string, TValue[]>,
  );
};

export const transformGroupedData = <
  TValue extends { [key in TKey]?: string },
  TKey extends keyof TValue,
>(
  data: Record<string, TValue[]>,
  firstGroup?: string,
) => {
  const entries = Object.entries(data);

  if (firstGroup) {
    entries.sort(([a], [b]) => {
      if (a === firstGroup) return -1;
      if (b === firstGroup) return 1;
      return 0;
    });
  }

  return entries.map(([groupName, items]) => ({
    name: groupName,
    items,
  }));
};

/**
 * Works like `Object.entries`, but considers all own keys of an object (including symbols).
 * @example
 * ```ts
 * allObjectEntries({ [Symbol()]: "a", "someKey": "b" }) // => [[Symbol(), "a"], ["someKey", "b"]]
 * ```
 */
export const allObjectEntries = <TValue extends Record<PropertyKey, unknown>>(target: TValue) =>
  Reflect.ownKeys(target).map((key) => [key, target[key]] as [keyof TValue, TValue[keyof TValue]]);
