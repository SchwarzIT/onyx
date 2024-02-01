import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

export type IconMetadata = {
  category: string;
  deprecated?: boolean;
  aliases?: string[];
};

export type GroupedIconCategory = {
  iconName: string;
  metadata: IconMetadata;
};

export type IconCategories = Record<string, GroupedIconCategory[]>;

/**
 * Optimizes the given SVG content and removes all fills so the color can be set via CSS.
 */
export const optimizeSvg = (svgContent: string, path: string) => {
  const { data } = optimize(svgContent, {
    path,
    multipass: true,
    plugins: [
      {
        name: "removeAttrs",
        params: {
          // remove all fills so we can set the color via CSS
          attrs: ["fill"],
        },
      },
    ],
  });
  return data;
};

/**
 * Checks whether the given path is a directory.
 */
export const isDirectory = async (path: string) => {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory();
  } catch {
    return false;
  }
};

/**
 * Gets a list of all available icons (full file path).
 */
export const readAllIconPaths = async () => {
  const INPUT_FOLDER = fileURLToPath(new URL("./assets", import.meta.url));
  const allIcons = await fs.readdir(INPUT_FOLDER, "utf-8");
  return allIcons
    .filter((filename) => filename.endsWith(".svg"))
    .map((filename) => path.join(INPUT_FOLDER, filename));
};

/**
 * Groups all available icon metadata by category.
 * Categories and icons will be sorted alphabetically.
 */
export const groupIconsByCategory = (iconMetadata: Record<string, IconMetadata>) => {
  const categories = Object.entries(iconMetadata).reduce<IconCategories>(
    (categories, [iconName, metadata]) => {
      const icons = categories[metadata.category] ?? [];
      icons.push({ iconName, metadata });
      categories[metadata.category] = icons;
      return categories;
    },
    {},
  );

  const sortedCategories: typeof categories = {};

  Object.keys(categories)
    .sort()
    .forEach((category) => {
      const sortedMetadata = categories[category].slice().sort((a, b) => {
        return a.iconName.localeCompare(b.iconName);
      });
      sortedCategories[category] = sortedMetadata;
    });

  return sortedCategories;
};
