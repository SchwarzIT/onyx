<script lang="ts" setup>
import {
  capitalize,
  getIconImportName,
  groupIconsByCategory,
  ICON_METADATA,
} from "@sit-onyx/icons";
import type { Asset, AssetLibraryGroup } from "./AssetLibrary.vue";
import AssetLibrary from "./AssetLibrary.vue";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const assetGroups = Object.entries(groupIconsByCategory(ICON_METADATA)).map<AssetLibraryGroup>(
  ([category, icons]) => {
    return {
      name: category,
      assets: icons.map<Asset>((icon) => ({
        id: icon.iconName,
        aliases: icon.metadata.aliases,
        name: icon.iconName
          .split("-")
          .map((word) => capitalize(word))
          .join(" "),
      })),
    };
  },
);

const getSvgContent = (iconName: string) => {
  return ALL_ICONS[`../../../node_modules/@sit-onyx/icons/src/assets/${iconName}.svg`];
};
</script>

<template>
  <AssetLibrary :groups="assetGroups" search-placeholder="Icon or category name...">
    <template #item="{ asset: icon }">
      <AssetLibraryItem
        :tooltip-text="icon.name"
        :content="getSvgContent(icon.id)"
        :clipboard-value="`import ${getIconImportName(icon.id)} from &quot;@sit-onyx/icons/${icon.id}.svg?raw&quot;`"
        :success-message="`Import for icon &quot;${getIconImportName(icon.id)}&quot; has been copied to your clipboard.`"
      />
    </template>
  </AssetLibrary>
</template>
