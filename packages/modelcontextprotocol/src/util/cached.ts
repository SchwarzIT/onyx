const cache = new Map<string, unknown>();

/**
 * Wrap a function to cache it's result based on the input arguments.
 */
export const cached =
  <TArgs extends unknown[], TReturn, TFunc extends (...args: TArgs) => Promise<TReturn>>(
    func: TFunc,
  ) =>
  async (...args: TArgs): Promise<TReturn> => {
    const cacheKey = JSON.stringify(args);
    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, await func(...args));
    }
    return cache.get(cacheKey) as TReturn;
  };
