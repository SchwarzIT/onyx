<script lang="ts" setup>
import {
  iconCircleContrast,
  iconFilePdf,
  iconSearch,
  iconSettings,
  iconTranslate,
} from "@sit-onyx/icons";
import { computed, ref } from "vue";
import {
  OnyxAppLayout,
  OnyxIconButton,
  OnyxNavBar,
  OnyxPageLayout,
  OnyxUnstableGlobalSearch,
  OnyxUnstableGlobalSearchGroup,
  OnyxUnstableGlobalSearchOption,
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
        { label: "Result 1", value: "1", link: "#link-1", icon: iconFilePdf },
        { label: "Result 2", value: "2", link: "#link-2", icon: iconFilePdf },
        { label: "Result 3", value: "3", link: "#link-3", icon: iconFilePdf },
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
    >
      <OnyxUnstableGlobalSearchGroup label="System">
        <OnyxUnstableGlobalSearchOption
          label="Change language"
          value="language"
          :icon="iconTranslate"
        />
        <OnyxUnstableGlobalSearchOption
          label="Change appearance"
          value="appearance"
          :icon="iconCircleContrast"
        />
        <OnyxUnstableGlobalSearchOption label="Settings" value="settings" :icon="iconSettings" />
      </OnyxUnstableGlobalSearchGroup>
    </OnyxUnstableGlobalSearch>
  </OnyxAppLayout>
</template>
