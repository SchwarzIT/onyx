<script lang="ts" setup>
import * as ALL_FLAGS from "@sit-onyx/flags";
import { FLAG_METADATA, getFlagImportName, groupFlagsByContinent } from "@sit-onyx/flags/utils";
import type { IconAsset, IconAssetGroup } from "../IconAssetOverview.vue";

const groups = Object.entries(groupFlagsByContinent(FLAG_METADATA)).map<IconAssetGroup>(
  ([category, flags]) => {
    return {
      category,
      icons: flags.map<IconAsset>((flag) => {
        return {
          name: flag.metadata.internationalName,
          aliases: [flag.code],
          content: ALL_FLAGS[getFlagImportName(flag.code) as keyof typeof ALL_FLAGS],
        };
      }),
    };
  },
);

const codeImport = (flag: IconAsset) =>
  `import ${getFlagImportName(flag.name)} from "@sit-onyx/flags";`;
</script>

<template>
  <IconAssetOverview :groups :code-import>
    <template #default="{ icon }">
      <span>{{ icon.name }}</span>
      <span v-if="icon.aliases?.length" class="code"> ({{ icon.aliases[0] }})</span>
    </template>
  </IconAssetOverview>
</template>

<style lang="scss" scoped>
.code {
  color: var(--onyx-color-text-icons-neutral-soft);
}
</style>
