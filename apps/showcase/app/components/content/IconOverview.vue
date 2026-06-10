<script lang="ts" setup>
import * as ALL_ICONS from "@sit-onyx/icons";
import { getIconImportName, groupIconsByCategory, ICON_METADATA } from "@sit-onyx/icons/utils";
import type { IconAsset, IconAssetGroup } from "../IconAssetOverview.vue";

const groups = Object.entries(groupIconsByCategory(ICON_METADATA)).map<IconAssetGroup>(
  ([category, icons]) => {
    return {
      category,
      icons: icons.map<IconAsset>((icon) => {
        return {
          name: icon.iconName,
          aliases: icon.metadata.aliases,
          content: ALL_ICONS[getIconImportName(icon.iconName) as keyof typeof ALL_ICONS],
        };
      }),
    };
  },
);

const codeImport = (icon: IconAsset) =>
  `import ${getIconImportName(icon.name)} from "@sit-onyx/icons";`;
</script>

<template>
  <IconAssetOverview :groups :code-import />
</template>
