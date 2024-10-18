import fs from "fs";
import { fileURLToPath } from "url";
import { defineLoader } from "vitepress";

const browserslistRcPath = fileURLToPath(new URL("../../../../.browserslistrc", import.meta.url));

export type Browser = {
  coverage: number;
  id: string;
  name: string;
  versions: Record<string, number | undefined>;
};

export interface Data {
  browsers: Browser[];
  coverage: number;
  browserRules: string;
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
    return new Promise((resolve, reject) => {
      let browserRules = "";

      try {
        const data = fs.readFileSync(browserslistRcPath, "utf8");
        const lines = data.split("\n").filter((l) => !!l && !l.startsWith("#"));
        browserRules = lines.join("").trim();
      } catch (e) {
        console.error("could not read .browserslistrc");
      }

      const url = `https://browsersl.ist/api/browsers?q=${browserRules}`;

      const fetchBrowserslistData = async () => {
        const result = await (await fetch(url)).text();
        resolve({ browserRules, ...JSON.parse(result) });
      };

      try {
        fetchBrowserslistData();
      } catch {
        reject("error loading browserslist API data");
      }
    });
  },
});
