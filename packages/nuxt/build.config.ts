import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { defineBuildConfig } from "unbuild";

const require = createRequire(import.meta.url);

export default defineBuildConfig({
  hooks: {
    "build:before": async (ctx) => {
      // locate the package's folder on disk via Node resolution
      const packageJsonPath = require.resolve("sit-onyx/locales/en-US.json");
      const localesDir = path.dirname(packageJsonPath);

      const locales = (await fs.readdir(localesDir, { encoding: "utf-8" }))
        .filter((file) => file.endsWith(".json"))
        .map((file) => file.replace(".json", ""));

      const targetPath = path.resolve(ctx.options.rootDir, "src/runtime/locales");

      // clear folder so no longer existing locales are removed
      await fs.rm(targetPath, { recursive: true, force: true });
      await fs.mkdir(targetPath, { recursive: true });

      // generate files
      await Promise.all(
        locales.map(async (locale) => {
          const importName = locale.replace("-", "");

          const fileContent = `// @ts-check
// generated at build time, do not edit
import ${importName} from "sit-onyx/locales/${locale}.json";

export default { onyx: ${importName} };
`;

          const localePath = path.join(targetPath, `${locale}.js`);
          await fs.writeFile(localePath, fileContent, "utf-8");
        }),
      );
    },
  },
});
