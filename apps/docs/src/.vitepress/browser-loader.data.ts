import fs from "fs";
import https from "https";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineLoader } from "vitepress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const browserslistRcPath = path.resolve(__dirname, "../../../../.browserslistrc");

const load = async () => {};

type Browser = {
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
              reject("unknown error");
            }
          });
        })
        .on("error", (error) => {
          reject(error.message);
        });
    });
  },
});
