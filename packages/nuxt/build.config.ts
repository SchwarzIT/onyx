import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { defineBuildConfig, type RollupOptions } from "unbuild";

export default defineBuildConfig({
  hooks: {
    "rollup:options"(ctx, options) {
      options.plugins.push(createLocalesPlugin());
    },
  },
});

function createLocalesPlugin(): RollupOptions["plugins"][number] {
  return {
    name: "onyx:build-locales",
    async buildStart() {
      const locales = await getOnyxLocales();

      locales.forEach((locale) => {
        this.emitFile({
          type: "asset",
          fileName: `runtime/locales/${locale}.js`,
          source: createLocaleModule(locale),
        });
      });
    },
  };
}

/**
 * Builds the ESM wrapper module that exposes an onyx locale to `@nuxtjs/i18n`.
 */
function createLocaleModule(locale: string) {
  const importName = locale.replace("-", "");

  return `import ${importName} from "sit-onyx/locales/${locale}.json";

export default { onyx: ${importName} };
`;
}

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
