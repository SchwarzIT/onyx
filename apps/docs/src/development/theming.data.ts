import { defineLoader } from "vitepress";

export type Data = {
  /**
   * List of available onyx themes. Default theme will be sorted first.
   */
  themes: string[];
};

declare const data: Data;
export { data };

/**
 * Build-Time data loader to get a list of available onyx themes.
 * @see https://vitepress.dev/guide/data-loading
 */
export default defineLoader({
  watch: ["../../../../packages/sit-onyx/src/styles/variables/themes/*.css"],
  load(watchedFiles): Data {
    return {
      themes: watchedFiles
        .filter((theme) => theme.includes("light"))
        .map((filePath) => filePath.split("/").at(-1)!.replace("-light.css", ""))
        .sort((a, b) => {
          if (a === "onyx") return -1;
          if (b === "onyx") return 1;
          return a.localeCompare(b);
        }),
    };
  },
});
