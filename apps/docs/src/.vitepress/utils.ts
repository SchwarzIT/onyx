import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const COMPONENTS_PATH = fileURLToPath(
  new URL("../../../../packages/sit-onyx/src/components", import.meta.url),
);

/**
 * Gets a list of all available onyx component names.
 */
export const getComponents = async () => {
  const components: string[] = [];

  // filter out non-directories to prevent files like ".DS_Store" on macOS to be included
  for (const componentName of await fs.readdir(COMPONENTS_PATH)) {
    const stat = await fs.stat(path.join(COMPONENTS_PATH, componentName));
    if (stat.isDirectory()) components.push(componentName);
  }

  return components;
};

/**
 * Gets a list of public onyx npm packages names.
 */
export const getOnyxNpmPackages = async () => {
  const packagePath = fileURLToPath(new URL("../../../../packages", import.meta.url));

  const packageFolders: string[] = [];

  for (const packageName of await fs.readdir(packagePath)) {
    try {
      const packageJsonPath = path.join(packagePath, packageName, "package.json");
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
      if (!packageJson.private) packageFolders.push(packageName);
    } catch {
      // folder is invalid npm package because it does not contain a valid package.json file
      // noop
    }
  }

  return packageFolders;
};

/**
 * Extracts the Storybook sidebar folders from all available *.stories.ts files.
 * Only supports one level of folder nesting, e.g. `components/OnyxHeadline`.
 * Folders and components will be sorted alphabetically.
 *
 * @example
 * ```ts
 * {
 *  components: ["OnyxHeadline", "OnyxButton"],
 *  utilities: ["GridPlayground"],
 * }
 * ```
 */
export const getStorybookSidebarFolders = async () => {
  /**
   * List of story titles. Can contain folders
   * @example ["components/OnyxHeadline"]
   */
  const storyTitles: string[] = [];

  // extract component folder structure from *.stories.ts files
  for (const componentName of await getComponents()) {
    const storybookPath = path.join(COMPONENTS_PATH, componentName, `${componentName}.stories.ts`);

    let storybookContent: string;

    try {
      storybookContent = await fs.readFile(storybookPath, "utf-8");
    } catch {
      // Storybook file does not exist
      continue;
    }

    const storyTitle = extractMetaTitleFromStorybook(storybookContent);
    if (!storyTitle) {
      throw new Error(`no Storybook folders found in the title for component "${componentName}"`);
    }
    storyTitles.push(storyTitle);
  }

  return groupComponentsByFolders(storyTitles);
};

/**
 * Extracts the "title" property of the Storybook meta object.
 *
 * @param fileContent File content of the "*.stories.ts" file.
 * @example
 * ```ts
 * const meta: Meta<typeof OnyxHeadline> = {
 *   title: "components/OnyxHeadline",
 * };
 * // output: "components/OnyxHeadline"
 * ```
 */
const extractMetaTitleFromStorybook = (fileContent: string): string | undefined => {
  const regexp = /const meta: Meta<typeof .*> = {\n\s*title: "(.*)"/;
  const matches = regexp.exec(fileContent);
  return matches?.length === 2 ? matches[1] : undefined;
};

/**
 *
 * Groups the given Storybook meta titles by folder. Only supports one level of nesting.
 * All titles must have a folder. Folders and components will be sorted alphabetically.
 *
 * @param storyTitles Storybook meta titles, may contain folders (represented by slashes, e.g. "components/OnyxHeadline")
 */
const groupComponentsByFolders = (storyTitles: string[]): Record<string, string[]> => {
  const folders = storyTitles.reduce<Record<string, string[]>>((groupedFolders, storyTitle) => {
    // folder name(s) come first, component name will be the last element
    const pathParts = storyTitle.split("/");

    if (pathParts.length > 2) {
      throw new Error(
        "Multiple levels of component folders are not supported yet. Please implement it or change the Storybook meta title.",
      );
    } else if (pathParts.length === 1) {
      throw new Error(`no folders found for Storybook title "${pathParts[0]}"`);
    }

    const folderName = pathParts[0];
    const componentName = pathParts[1];

    const folderItems = groupedFolders[folderName] ?? [];
    folderItems.push(componentName);

    groupedFolders[folderName] = folderItems;
    return groupedFolders;
  }, {});

  // sort folders and components alphabetically
  return Object.keys(folders)
    .sort()
    .reduce<typeof folders>((obj, folderName) => {
      obj[folderName] = folders[folderName].sort();
      return obj;
    }, {});
};
