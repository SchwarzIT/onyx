import { ICON_CATEGORIES } from "@sit-onyx/icons";
import { capitalize } from "vue";

const getIconContextData = (iconName: string, ALL_ICONS: Record<string, string>) => {
  const parts = iconName.split("-");
  // bell-disabled => `Bell Disabled`
  const tooltipName = parts.map((word) => capitalize(word)).join(" ");
  // bell-disabled => `bellDisabled`
  const importName = parts
    .map((word, index) => {
      if (index === 0) return word;
      return capitalize(word);
    })
    .join("");
  // svg content for OnyxIcon `icon` prop
  const content = ALL_ICONS[`../../../node_modules/@sit-onyx/icons/src/assets/${iconName}.svg`];
  return { tooltipName, importName, content };
};

// Collects all needed icon context data and provides them as a list.
export const getEnrichedIconCategoryList = (ALL_ICONS: Record<string, string>) =>
  Object.entries(ICON_CATEGORIES).map(([category, icons]) => ({
    name: category,
    icons: icons.map((icon) => ({
      ...icon,
      ...getIconContextData(icon.iconName, ALL_ICONS),
      metadata: {
        ...icon.metadata,
        // make the searchability more reliable
        aliases: icon.metadata.aliases?.map((alias) => alias.toLowerCase()),
      },
    })),
  }));
