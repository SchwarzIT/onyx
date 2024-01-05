import { defineLoader } from "vitepress";

export interface Data {
  languages: string[];
}

declare const data: Data;
export { data };

export default defineLoader({
  watch: ["../../../../packages/sit-onyx/src/i18n/locales/*.json"],
  load(watchedFiles): Data {
    return {
      languages: watchedFiles.map((path) => path.split("/").at(-1).replace(".json", "")),
    };
  },
});
