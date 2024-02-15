type Permutation<T extends Record<string, readonly string[]>> = {
  [key in keyof T]: T[key][number];
};

const _generatePermutations = <
  T extends Readonly<Record<string, readonly string[]>>,
  K extends keyof T,
  R extends Permutation<T>,
>(
  obj: T,
  keys: K[],
  current: Partial<R> = {},
  result: R[] = [],
): R[] => {
  if (keys.length === 0) {
    result.push({ ...current } as R);
  } else {
    const [key, ...restKeys] = keys;
    const values = obj[key];
    for (const value of values) {
      current[key] = value as R[K];
      _generatePermutations(obj, restKeys, current, result);
    }
  }
  return result;
};

/**
 * Creates an array of all possible permutations of the values of an object
 */
export const generatePermutations = <T extends Record<string, readonly string[]>>(obj: T) => {
  const keys = Object.keys(obj) as (keyof T)[];
  return _generatePermutations(obj, keys);
};
