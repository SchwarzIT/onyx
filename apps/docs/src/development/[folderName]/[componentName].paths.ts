import { getStorybookSidebarFolders } from "../../.vitepress/utils";

/**
 * Dynamically generated paths for the onyx components including the Storybook folder structure.
 *
 * @example
 * ```ts
 * [
 *   { params: { folderName: "components", componentName: "OnyxHeadline" },
 *   { params: { folderName: "utilities", componentName: "GridPlayground" },
 *   // ...
 * ]
 * ```
 * @see https://vitepress.dev/guide/routing#dynamically-generating-paths
 */
export default {
  paths: async () => {
    const folders = await getStorybookSidebarFolders();

    return Object.entries(folders).flatMap(([folderName, components]) => {
      return components.flatMap((componentName) => {
        return { params: { folderName, componentName } };
      });
    });
  },
};
