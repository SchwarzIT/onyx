import fs from "fs/promises";
import { fileURLToPath } from "url";
import { defineLoader } from "vitepress";
import { cached } from "../cached";

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
    let browserRules = "";

    try {
      const data = await fs.readFile(browserslistRcPath, "utf8");
      const lines = data.split("\n").filter((l) => !!l && !l.startsWith("#"));
      browserRules = lines.join("").trim();
    } catch {
      throw new Error("could not read .browserslistrc");
    }

    const url = new URL(`https://browsersl.ist/api/browsers?q=${browserRules}`);
    const fetchBrowserslistData = async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("failed to fetch browserslist API data");
      }

      const data = await response.json();
      return { browserRules, ...data };
    };

    try {
      return await cached(url, fetchBrowserslistData);
    } catch (e) {
      // eslint-disable-next-line no-console -- only logged during build time
      console.error(e);
      return {
        browsers: [],
      };
    }
  },
});
