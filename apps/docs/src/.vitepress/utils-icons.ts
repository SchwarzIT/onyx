import { ICON_CATEGORIES } from "@sit-onyx/icons";
import { capitalize } from "vue";

export type EnrichedIcon = {
  metadata: {
    aliases: string[] | undefined;
    category: string;
    deprecated?: boolean | undefined;
  };
  tooltipName: string;
  importName: string;
  content: string;
  iconName: string;
};

type EnrichedCategory = {
  name: string;
  icons: EnrichedIcon[];
};

const getIconContextData = (iconName: string, allIconContents: Record<string, string>) => {
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
  const content =
    allIconContents[`../../../node_modules/@sit-onyx/icons/src/assets/${iconName}.svg`];
  return { tooltipName, importName, content };
};

// Collects all needed icon context data and provides them as a list.
export const getEnrichedIconCategoryList = (
  allIconContents: Record<string, string>,
): EnrichedCategory[] =>
  Object.entries(ICON_CATEGORIES).map(([category, icons]) => ({
    name: category,
    icons: icons.map((icon) => ({
      ...icon,
      ...getIconContextData(icon.iconName, allIconContents),
      metadata: {
        ...icon.metadata,
        // make the searchability more reliable
        aliases: icon.metadata.aliases?.map((alias) => alias.toLowerCase()),
      },
    })),
  }));
