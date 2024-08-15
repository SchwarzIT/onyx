import METADATA from "./metadata.json";
import { groupIconsByCategory, type IconMetadata } from "./utils.js";

/**
 * Metadata for all available onyx icons.
 */
export const ICON_METADATA = METADATA satisfies Record<string, IconMetadata>;

/**
 * Grouped metadata of all available icons by category.
 * Categories and icons will be sorted alphabetically.
 */
export const ICON_CATEGORIES = groupIconsByCategory(ICON_METADATA);

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
const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
