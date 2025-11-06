<script lang="ts" setup>
import { iconFilePdf, iconSearch } from "@sit-onyx/icons";
import { computed, ref } from "vue";
import {
  OnyxAppLayout,
  OnyxIconButton,
  OnyxNavBar,
  OnyxPageLayout,
  OnyxUnstableGlobalSearch,
  type GlobalSearchGroup,
} from "../../../index.js";

// TODO: for testing, revert back to false afterwards
const isSearchOpen = ref(true);

const isLoading = ref(false);

const groups = computed<GlobalSearchGroup[]>(() => {
  return [
    {
      label: "Search results",
      options: [
        { label: "Result 1", value: "1", icon: iconFilePdf },
        { label: "Result 2", value: "2", icon: iconFilePdf },
        { label: "Result 3", value: "3", icon: iconFilePdf },
      ],
    },
    {
      label: "System",
      options: [
        { label: "Result 1", value: "4", icon: iconFilePdf },
        { label: "Result 2", value: "5", icon: iconFilePdf },
        { label: "Result 3", value: "6", icon: iconFilePdf },
      ],
    },
  ];
});
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="Global search example">
        <!-- using the "globalContextArea" instead of the regular "contextArea" here so the search is also always visible on mobile screens -->
        <template #globalContextArea>
          <OnyxIconButton
            label="Open global search"
            :icon="iconSearch"
            color="neutral"
            @click="isSearchOpen = true"
          />
        </template>
      </OnyxNavBar>
    </template>

    <OnyxPageLayout> Your page content would go here... </OnyxPageLayout>

    <!-- TODO: remove nonDismissible -->
    <OnyxUnstableGlobalSearch
      v-model:open="isSearchOpen"
      :loading="isLoading"
      :groups
      non-dismissible
    />
  </OnyxAppLayout>
</template>
