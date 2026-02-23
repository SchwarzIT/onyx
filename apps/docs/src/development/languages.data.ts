import { readFileSync } from "node:fs";
import { defineLoader } from "vitepress";

export type Data = {
  /** List of available onyx languages. */
  languages: Language[];
};

export type Language = {
  /** @example "en-US" */
  name: string;
  /** JSON content of the translations / messages */
  fileContent: object;
  /** Percentage of translated keys */
  percentage: number;
};

declare const data: Data;
export { data };

/**
 * Build-Time data loader to get a list of available languages
 * @see https://vitepress.dev/guide/data-loading
 */
export default defineLoader({
  watch: ["../../../../packages/sit-onyx/src/i18n/locales/*.json"],
  async load(watchedFiles): Promise<Data> {
    const enUS = (await import("sit-onyx/locales/en-US.json", { with: { type: "json" } })).default;
    const enKeys = getNestedKeys(enUS);

    const languages = watchedFiles.map((path) => {
      const fileContent = JSON.parse(readFileSync(path, "utf-8"));
      const name = path.split("/").at(-1)!.replace(".json", "");
      const keys = getNestedKeys(fileContent);
      const percentage = Math.floor((keys.length / enKeys.length) * 100);
      return { name, fileContent, percentage };
    });

    return { languages };
  },
});

/**
 * Extracts all keys of the given object as array.
 */
const getNestedKeys = (obj: object, prefix = ""): string[] => {
  return Object.keys(obj).reduce((res, el) => {
    const value = obj[el as keyof typeof obj];
    const path = prefix ? `${prefix}.${el}` : el;

    if (typeof value === "object" && value && !Array.isArray(value)) {
      // Add the current path and then recurse
      return [...res, path, ...getNestedKeys(value, path)];
    }

    return [...res, path];
  }, [] as string[]);
};
