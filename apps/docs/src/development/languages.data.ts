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
    const languages = watchedFiles.map((path) => {
      const fileContent = JSON.parse(readFileSync(path, "utf-8"));
      const name = path.split("/").at(-1)!.replace(".json", "");
      return { name, fileContent };
    });

    return { languages };
  },
});
