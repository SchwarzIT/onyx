import { defineLoader } from "vitepress";

export type Data = {
  themes: string[];
};

declare const data: Data;
export { data };

/**
 * Build-Time data loader to get a list of available languages
 * @see https://vitepress.dev/guide/data-loading
 */
export default defineLoader({
  watch: ["../../../../packages/sit-onyx/src/styles/themes/*.css"],
  load(watchedFiles): Data {
    return {
      themes: watchedFiles
        .map((filePath) => filePath.split("/").at(-1)!.replace(".css", ""))
        .sort((a, b) => {
          if (a === "onyx") return -1;
          if (b === "onyx") return 1;
          return a.localeCompare(b);
        }),
    };
  },
});
