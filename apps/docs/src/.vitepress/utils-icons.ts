import { getIconImportName, groupIconsByCategory, ICON_METADATA } from "@sit-onyx/icons";
import { capitalize } from "vue";

export type EnrichedIcon = {
  metadata: {
    category: string;
    aliases?: string[];
    deprecated?: boolean;
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
  const importName = getIconImportName(iconName);
  // svg content for OnyxIcon `icon` prop
  const content =
    allIconContents[`../../../node_modules/@sit-onyx/icons/src/assets/${iconName}.svg`];
  return { tooltipName, importName, content };
};

// Collects all needed icon context data and provides them as a list.
export const getEnrichedIconCategoryList = (
  allIconContents: Record<string, string>,
): EnrichedCategory[] => {
  const categories = groupIconsByCategory(ICON_METADATA);

  return Object.entries(categories).map(([category, icons]) => ({
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
};
