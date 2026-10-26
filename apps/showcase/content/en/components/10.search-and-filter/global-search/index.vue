<script lang="ts" setup>
import { iconCircleContrast, iconFilePdf, iconSettings, iconTranslate } from "@sit-onyx/icons";
import {
  OnyxAppLayout,
  OnyxGlobalSearch,
  OnyxGlobalSearchGroup,
  OnyxGlobalSearchOption,
  OnyxFilterBadge,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <!-- modal="false" is important so the dialog can be placed inside the overview card instead of above the while viewport -->
    <ClientOnly>
      <OnyxGlobalSearch :modal="false" open>
        <template #leading>
          <OnyxGlobalSearchGroup orientation="horizontal" label="Filters">
            <OnyxFilterBadge label="All" active />
            <OnyxFilterBadge label="Filter" />
            <OnyxFilterBadge label="Filter" />
            <OnyxFilterBadge label="Filter" />
            <OnyxFilterBadge label="Filter" />
          </OnyxGlobalSearchGroup>
        </template>

        <OnyxGlobalSearchGroup label="Quick results">
          <OnyxGlobalSearchOption label="Search result" value="1" :icon="iconFilePdf" />
          <OnyxGlobalSearchOption label="Search result" value="2" :icon="iconFilePdf" />
          <OnyxGlobalSearchOption label="Search result" value="3" :icon="iconFilePdf" />
          <OnyxGlobalSearchOption label="Search result" value="4" :icon="iconFilePdf" />
        </OnyxGlobalSearchGroup>

        <OnyxGlobalSearchGroup label="System">
          <OnyxGlobalSearchOption label="Change language" value="locale" :icon="iconTranslate" />
          <OnyxGlobalSearchOption
            label="Change appearance"
            value="colorScheme"
            :icon="iconCircleContrast"
          />
          <OnyxGlobalSearchOption label="Settings" value="settings" :icon="iconSettings" />
        </OnyxGlobalSearchGroup>
      </OnyxGlobalSearch>
    </ClientOnly>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  zoom: 0.2;
}

.onyx-global-search {
  margin-top: 0;
  border: none;
}
</style>
