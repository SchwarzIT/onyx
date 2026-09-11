import browserslist from "browserslist";
import { defineLoader } from "vitepress";
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
  /**
   * Image URL for the browser logo.
   */
  image: string;
};

export interface Data {
  browsers: Browser[];
}

declare const data: Data;
export { data };

/**
 * Resolves our browserslist config to the minimum supported browser versions.
 */
export default defineLoader({
  watch: ["../../../../.browserslistrc"],
  async load(watchedFiles): Promise<Data> {
    const queries = browserslist.loadConfig({ path: watchedFiles[0] });
    if (!queries) throw new Error("could not read .browserslistrc file");

    /**
     * Key = browser ID, value: supported versions
     */
    const versionsByBrowser = new Map<string, Set<string>>();

    for (const entry of browserslist(queries)) {
      const [id, version] = entry.split(" ");

      // filter out unwanted browsers
      if (["and_chr", "ios_saf", "node"].includes(id)) continue;

      const set = versionsByBrowser.get(id) ?? new Set();
      set.add(version);
      versionsByBrowser.set(id, set);
    }

    const browsers = Array.from(versionsByBrowser.entries()).reduce((obj, [id, versions]) => {
      const version = sortVersions(Array.from(versions).sort())[0];
      obj.push({
        id,
        version,
        name: capitalize(id),
        image: `/images/browsers/${id}.svg`,
      });
      return obj;
    }, [] as Browser[]);

    return { browsers };
  },
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
