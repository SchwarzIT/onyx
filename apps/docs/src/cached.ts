import { mkdir, readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const CACHE_DIR = resolve(import.meta.dirname, "..", "node_modules", ".cache", "onyx-docs-fetch");

type CachedWrapper<T> =
  | { timestamp: number; body: T }
  | { timestamp?: undefined; body?: undefined };

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
  // eslint-disable-next-line no-console
  console.info(`Updated cache for request ${url}.`);
};

const readCache = async <T>(url: URL, validAfter: Date): Promise<T | undefined> => {
  // we use recursive, so that we dont have to handle the `directory already exists` case
  await mkdir(CACHE_DIR, { recursive: true });
  const cacheFile = buildPathForUrl(url);

  const { timestamp, body }: CachedWrapper<T> = await readFile(cacheFile, "utf-8")
    .then(JSON.parse)
    .catch(() => ({}));

  if (timestamp && new Date(timestamp) > validAfter) {
    // eslint-disable-next-line no-console
    console.info(`Used cache for request ${url}.`);
    return body;
  }
};

/**
 * Caches an async operation to the filesystem.
 * Default cache duration is 24 hours.
 */
export const cached = async <T>(
  url: URL,
  fetch: () => Promise<T>,
  duration = 24 * 60 * 60 * 1000,
): Promise<T> => {
  const result = await readCache<T>(url, new Date(Date.now() - duration));
  if (result) {
    return result;
  }

  const body = await fetch();
  // eslint-disable-next-line no-console
  console.info(`Fetched ${url}.`);

  // we don't need to wait for the cache to be written
  writeCache(url, body);

  return body;
};
