<script lang="ts" setup>
import * as ALL_FLAGS from "@sit-onyx/flags";
import { FLAG_METADATA, getFlagImportName, groupFlagsByContinent } from "@sit-onyx/flags/utils";
import type { Asset, AssetLibraryGroup } from "./AssetLibrary.vue";
import AssetLibrary from "./AssetLibrary.vue";
import AssetLibraryItem from "./AssetLibraryItem.vue";

const assetGroups = Object.entries(groupFlagsByContinent(FLAG_METADATA)).map(
  ([continent, flags]) => {
    return {
      name: continent,
      assets: flags.map(
        (flag) =>
          ({
            id: getFlagImportName(flag.code),
            name: flag.metadata.internationalName,
            data: { code: flag.code },
          }) satisfies Asset,
      ),
    } satisfies AssetLibraryGroup;
  },
);
</script>

<template>
  <AssetLibrary :groups="assetGroups" search-placeholder="Country code or name...">
    <template #item="{ asset: flag }">
      <AssetLibraryItem
        :tooltip-text="`${flag.name} (${flag.data?.code})`"
        :content="ALL_FLAGS[flag.id]"
        :clipboard-value="`import { ${flag.id} } from &quot;@sit-onyx/flags&quot;`"
        :success-message="`Import for flag &quot;${flag.data?.code}&quot; (${flag.name}) has been copied to your clipboard.`"
      />
    </template>
  </AssetLibrary>
</template>
