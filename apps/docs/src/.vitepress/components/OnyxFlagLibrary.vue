<script lang="ts" setup>
import { FLAG_METADATA, groupFlagsByContinent } from "@sit-onyx/flags/utils";
import type { Asset, AssetLibraryGroup } from "./AssetLibrary.vue";
import AssetLibrary from "./AssetLibrary.vue";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const ALL_FLAGS = import.meta.glob("../../../node_modules/@sit-onyx/flags/src/assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const assetGroups = Object.entries(groupFlagsByContinent(FLAG_METADATA)).map<AssetLibraryGroup>(
  ([continent, flags]) => {
    return {
      name: continent,
      assets: flags.map<Asset>((flag) => ({
        id: flag.code,
        name: flag.metadata.internationalName,
      })),
    };
  },
);

const getSvgContent = (code: string) => {
  return ALL_FLAGS[`../../../node_modules/@sit-onyx/flags/src/assets/${code}.svg`];
};
</script>

<template>
  <AssetLibrary :groups="assetGroups" search-placeholder="Country code or name...">
    <template #item="{ asset: flag }">
      <AssetLibraryItem
        :tooltip-text="`${flag.name} (${flag.id})`"
        :content="getSvgContent(flag.id)"
        :clipboard-value="`import ${flag.id} from &quot;@sit-onyx/flags/${flag.id}.svg?raw&quot;`"
        :success-message="`Import for flag &quot;${flag.id}&quot; (${flag.name}) has been copied to your clipboard.`"
      />
    </template>
  </AssetLibrary>
</template>
