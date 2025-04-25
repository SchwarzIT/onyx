/* eslint-disable no-console -- we want to be able to log output to the console */
import { mkdir, readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const CACHE_DIR = resolve(import.meta.dirname, "..", "node_modules", ".cache", "onyx-docs-fetch");

type CachedWrapper<T> = { timestamp: number; body: T };

/**
 * Converts a given string or stringifyable object to a file system compatible string.
 */
const makeFileSystemFriendly = (input: string | { toString: () => string }) =>
  input.toString().replace(/\W/gi, "_");

const buildPathForUrl = (url: URL) => {
  const fsFriendly = makeFileSystemFriendly(url);
  return resolve(CACHE_DIR, `${fsFriendly}.json`);
};

const writeCache = async <T>(url: URL, body: T) => {
  // we use recursive, so that we dont have to handle the `directory already exists` case
  await mkdir(CACHE_DIR, { recursive: true });
  const cacheFile = buildPathForUrl(url);
  await writeFile(
    cacheFile,
    JSON.stringify({ timestamp: Date.now(), body } satisfies CachedWrapper<T>),
  );
  console.info(`Updated cache for request ${url}.`);
};

const readCache = async <T>(url: URL): Promise<CachedWrapper<T> | undefined> => {
  // we use recursive, so that we dont have to handle the `directory already exists` case
  await mkdir(CACHE_DIR, { recursive: true });
  const cacheFile = buildPathForUrl(url);

  return readFile(cacheFile, "utf-8")
    .then(JSON.parse)
    .catch(() => {});
};

/**
 * Caches an async operation to the filesystem.
 * Default cache duration is 24 hours.
 */
export const cached = async <T>(url: URL, fetch: () => Promise<T>): Promise<T> => {
  const fromCache = await readCache<T>(url);
  if (fromCache?.timestamp && fromCache.timestamp >= Date.now() - 1000 * 60 * 60 * 24) {
    console.info(`Used cache for request ${url}.`);
    return fromCache.body;
  }

  const fromFetch = await fetch()
    .then((r) => {
      console.info(`Fetch request succeeded for ${url}.`);
      // we don't need to wait for the cache to be written
      writeCache(url, r);
      return r;
    })
    .catch((e) => {
      console.info(`Fetch request failed for ${url}.`);
      console.error(e);
      return undefined;
    });

  if (fromFetch) {
    console.info(`Using fetch result for ${url}.`);
    return fromFetch;
  }
  if (fromCache) {
    console.info(`Using cache result for ${url}.`);
    return fromCache.body;
  }
  throw new Error(`Failed to fetch and load from cache for ${url}!`);
};

/* eslint-enable */
