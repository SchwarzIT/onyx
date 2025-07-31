import type { IconCategories, IconMetadata } from "./types.js";

export {
  /**
   * Metadata for all available onyx icons.
   */
  default as ICON_METADATA,
} from "./metadata.json";

export * from "./types.js";

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

/**
 * Transform an icon name to its corresponding JavaScript import name.
 *
 * @example
 * ```ts
 * "bell-disabled" => "bellDisabled"
 * // e.g. used as 'import bellDisabled from "@sit-onyx/icons/bell-disabled.svg?raw"'
 * ```
 */
export const getIconImportName = (iconName: string) => {
  return iconName
    .split("-")
    .map((word, index) => {
      if (index === 0) return word;
      return capitalize(word);
    })
    .join("");
};

/**
 * Capitalizes the first character of the given string.
 */
export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
