import fs from "fs";
import https from "https";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineLoader } from "vitepress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const browserslistRcPath = path.resolve(__dirname, "../../../../.browserslistrc");

export type Browser = {
  coverage: number;
  id: string;
  name: string;
  versions: Record<string, number | undefined>;
};

export interface Data {
  browsers: Browser[];
  coverage: number;
  config: string;
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
        const [_firstLine, ...lines] = data.split("\n").filter((l) => !!l);
        browserRules = lines.join("").trim();
      } catch (e) {
        console.error("could not read .browserslistrc");
      }

      const url = `https://browsersl.ist/api/browsers?q=${browserRules}`;

      https
        .get(url, (res) => {
          let body = "";

          res.on("data", (chunk) => {
            body += chunk;
          });

          res.on("end", () => {
            try {
              resolve(JSON.parse(body));
            } catch (error) {
              if (error instanceof Error) console.error(error.message);
              reject("error loading browserslist API data");
            }
          });
        })
        .on("error", (error) => {
          reject(error.message);
        });
    });
  },
});
