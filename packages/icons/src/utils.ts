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
