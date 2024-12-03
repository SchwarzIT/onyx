import fs from "fs";
import { fileURLToPath } from "url";
import { defineLoader } from "vitepress";
import { shouldSkipRemoteFetches } from "../github-api";

const browserslistRcPath = fileURLToPath(new URL("../../../../.browserslistrc", import.meta.url));

export type Browser = {
  coverage: number;
  id: string;
  name: string;
  versions: Record<string, number | undefined>;
};

export interface Data {
  browsers: Browser[];
}

declare const data: Data;

export { data };

/**
 * Based on our browserslist config we load information about supported browser version and coverage from the
 * official browserlist API. This happens only on build time.
 * More information can be found on https://browsersl.ist
 */
export default defineLoader({
  async load(): Promise<Data> {
    if (shouldSkipRemoteFetches()) {
      return { browsers: [] };
    }

    return new Promise((resolve, reject) => {
      let browserRules = "";

      try {
        const data = fs.readFileSync(browserslistRcPath, "utf8");
        const lines = data.split("\n").filter((l) => !!l && !l.startsWith("#"));
        browserRules = lines.join("").trim();
      } catch {
        reject("could not read .browserslistrc");
      }

      const fetchBrowserslistData = async () => {
        const url = `https://browsersl.ist/api/browsers?q=${browserRules}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("failed to fetch browserslist API data");
        }

        const data = await response.json();
        resolve({ browserRules, ...data });
      };

      try {
        fetchBrowserslistData();
      } catch (e) {
        reject(e);
      }
    });
  },
});
