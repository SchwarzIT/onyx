<script lang="ts" setup>
import * as ALL_ICONS from "@sit-onyx/icons";
import {
  capitalize,
  getIconImportName,
  groupIconsByCategory,
  ICON_METADATA,
} from "@sit-onyx/icons/utils";
import type { Asset, AssetLibraryGroup } from "./AssetLibrary.vue";
import AssetLibrary from "./AssetLibrary.vue";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const assetGroups = Object.entries(groupIconsByCategory(ICON_METADATA)).map<AssetLibraryGroup>(
  ([category, icons]) => {
    return {
      name: category,
      assets: icons.map<Asset>((icon) => ({
        id: getIconImportName(icon.iconName),
        aliases: icon.metadata.aliases,
        name: icon.iconName
          .split("-")
          .map((word) => capitalize(word))
          .join(" "),
      })),
    };
  },
);
</script>

<template>
  <AssetLibrary :groups="assetGroups" search-placeholder="Icon or category name...">
    <template #item="{ asset: icon }">
      <AssetLibraryItem
        :tooltip-text="icon.name"
        :content="ALL_ICONS[icon.id]"
        :clipboard-value="`import { ${icon.id} } from &quot;@sit-onyx/icons&quot;`"
        :success-message="`Import for &quot;${icon.id}&quot; has been copied to your clipboard.`"
      />
    </template>
  </AssetLibrary>
</template>
