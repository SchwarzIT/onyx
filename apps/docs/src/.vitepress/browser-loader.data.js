import fs from "fs";
import https from "https";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const browserslistRcPath = path.resolve(__dirname, "../../../../.browserslistrc");

const load = async () => {
  const loadJson = () =>
    new Promise((resolve, reject) => {
      let browserRules = "";
      fs.readFile(browserslistRcPath, "utf8", (error, data) => {
        if (error) {
          reject("Error reading .browserslistrc file:", error);
          return;
        }

        const [_firstLine, ...lines] = data.split("\n").filter((l) => !!l);
        browserRules = lines.join("").trim();
      });

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

  const result = await loadJson();
  return result;
};

export default { load };
