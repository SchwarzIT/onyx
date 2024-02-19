import { getStorybookSidebarFolders } from "../../.vitepress/utils";

/**
 * Dynamically generated paths for the onyx components.
 *
 * @example
 * ```ts
 * [
 *   { params: { folderName: "components", componentName: "OnyxHeadline" },
 *   { params: { folderName: "components", componentName: "OnyxIcon" },
 *   // ...
 * ]
 * ```
 * @see https://vitepress.dev/guide/routing#dynamically-generating-paths
 */
export default {
  paths: async () => {
    const { components } = await getStorybookSidebarFolders();
    return components.map((componentName) => ({ params: { componentName } }));
  },
};
