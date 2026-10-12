import path from "node:path";
import { fileURLToPath } from "node:url";
import browserslist from "browserslist";
import { capitalize } from "./string.js";

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

/**
 * Gets a list of supported browsers by onyx based on the `.browserslistrc` file.
 */
export function getSupportedOnyxBrowsers() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const rootConfigPath = path.resolve(__dirname, "../../../.browserslistrc");

  const config = browserslist(null, { config: rootConfigPath });

  if (!config.length) {
    throw new Error("Browserslist config not found");
  }

  /**
   * Key = browser ID, value: supported versions
   */
  const versionsByBrowser = new Map<string, Set<string>>();

  for (const entry of config) {
    const [id = "", version = ""] = entry.split(" ");

    // filter out unwanted browsers
    if (["and_chr", "ios_saf"].includes(id)) continue;

    const set = versionsByBrowser.get(id) ?? new Set();
    set.add(version);
    versionsByBrowser.set(id, set);
  }

  return Array.from(versionsByBrowser.entries()).reduce((obj, [id, versions]) => {
    const version = sortVersions(Array.from(versions).sort())[0]!;
    obj.push({
      id,
      version,
      name: capitalize(id),
    });
    return obj;
  }, [] as Browser[]);
}

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
