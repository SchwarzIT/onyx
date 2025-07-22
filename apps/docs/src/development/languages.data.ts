import { readFileSync } from "node:fs";
import { defineLoader } from "vitepress";

export type Data = {
  /** List of available onyx languages. */
  languages: Language[];
  /** Total number of available translation keys (from the English file). */
  totalKeys: number;
};

export type Language = {
  /** @example "en-US" */
  name: string;
  /** JSON content of the translations / messages */
  fileContent: object;
  /** Number of translated keys */
  keyCount: number;
};

declare const data: Data;
export { data };

/**
 * Build-Time data loader to get a list of available languages
 * @see https://vitepress.dev/guide/data-loading
 */
export default defineLoader({
  watch: ["../../../../packages/sit-onyx/src/i18n/locales/*.json"],
  load(watchedFiles): Data {
    const languages = watchedFiles.map((path) => {
      const fileContent = JSON.parse(readFileSync(path, "utf-8"));
      const name = path.split("/").at(-1)!.replace(".json", "");
      return { name, fileContent, keyCount: countKeys(fileContent) };
    });

    const totalKeys = languages.find((i) => i.name === "en-US")?.keyCount ?? 0;

    return { languages, totalKeys };
  },
});

/**
 * Gets the number of (nested) keys for the given object.
 * Only counts keys whose value is not a nested object.
 */
const countKeys = (obj: object): number => {
  return Object.values(obj).reduce((total, value) => {
    if (!value) return total;
    if (typeof value === "object") return total + countKeys(value);
    return total + 1;
  }, 0);
};
