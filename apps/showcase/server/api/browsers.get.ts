import browserslist from "browserslist";
import { capitalize } from "vue";

export type Browser = {
  /**
   * Browser ID.
   */
  id: string;
  /**
   * User-friendly browser name.
   */
  name: string;
  /**
   * Minimum supported version.
   */
  version: string;
};

let cachedBrowsers: Browser[] | undefined;

export default defineEventHandler((event): Browser[] => {
  if (cachedBrowsers) return cachedBrowsers;

  const { browserslistrc } = useRuntimeConfig(event);
  const config = browserslist.parseConfig(browserslistrc);

  /**
   * Key = browser ID, value: supported versions
   */
  const versionsByBrowser = new Map<string, Set<string>>();

  for (const entry of browserslist(config.defaults)) {
    const [id = "", version = ""] = entry.split(" ");

    // filter out unwanted browsers
    if (["and_chr", "ios_saf"].includes(id)) continue;

    const set = versionsByBrowser.get(id) ?? new Set();
    set.add(version);
    versionsByBrowser.set(id, set);
  }

  cachedBrowsers = Array.from(versionsByBrowser.entries()).reduce((obj, [id, versions]) => {
    const version = sortVersions(Array.from(versions).sort())[0]!;
    obj.push({
      id,
      version,
      name: capitalize(id),
    });
    return obj;
  }, [] as Browser[]);

  return cachedBrowsers;
});

/**
 * Sorts the given versions ascending.
 */
function sortVersions(versions: string[]) {
  return versions.toSorted((a, b) => {
    // split the version strings into arrays of numbers
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);

    // find the maximum length to ensure we compare all segments (e.g., 1.0 vs 1.0.1)
    const maxLength = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < maxLength; i++) {
      // fallback to 0 if a version string has fewer segments (e.g., treat '1' as '1.0.0')
      const aVal = aParts[i] ?? 0;
      const bVal = bParts[i] ?? 0;

      if (aVal !== bVal) {
        return aVal - bVal; // ascending order (smallest first)
      }
    }

    return 0; // versions are identical
  });
}
