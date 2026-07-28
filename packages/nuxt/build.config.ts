import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  hooks: {
    "build:before": async (ctx) => {
      const locales = await getOnyxLocales();

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

/**
 * Gets a list of all available onyx locales.
 */
async function getOnyxLocales() {
  // locate the locales folder on disk via node resolution (to prevent relative paths to node_modules folder)
  const require = createRequire(import.meta.url);
  const localesDir = path.dirname(require.resolve("sit-onyx/locales/en-US.json"));

  const fileNames = await fs.readdir(localesDir, { encoding: "utf-8" });

  return fileNames
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(".json", ""));
}
