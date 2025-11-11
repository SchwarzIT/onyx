<script lang="ts" setup>
import {
  iconCircleContrast,
  iconFile,
  iconSearch,
  iconSettings,
  iconTranslate,
} from "@sit-onyx/icons";
import { ref, watch } from "vue";
import {
  OnyxAppLayout,
  OnyxIconButton,
  OnyxInfoCard,
  OnyxNavBar,
  OnyxPageLayout,
  OnyxUnstableGlobalSearch,
  OnyxUnstableGlobalSearchGroup,
  OnyxUnstableGlobalSearchOption,
  type OnyxGlobalSearchOptionProps,
} from "../../../index.js";

const isOpen = ref(false);
const searchTerm = ref("");
const isLoading = ref(false);

const searchResults = ref<OnyxGlobalSearchOptionProps[]>([]);

// in a real project, you probably want to debounce the ref so that your search logic is not triggered on every key stroke
// you can use a library like VueUse for this: https://vueuse.org/shared/watchDebounced/
watch(searchTerm, async () => {
  // implement your custom search behavior here, we just fake it for this example
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (searchTerm.value) {
    searchResults.value = [
      { label: "Result 1", value: "1", link: "#test-link", icon: iconFile },
      { label: "Result 2", value: "2", link: "#test-link", icon: iconFile },
      { label: "Result 3", value: "3", link: "#test-link", icon: iconFile },
    ];
  } else {
    searchResults.value = [];
  }

  isLoading.value = false;
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
            @click="isOpen = true"
          />
        </template>
      </OnyxNavBar>
    </template>

    <OnyxPageLayout>
      <OnyxInfoCard headline="Example">
        Click on the search icon button in the nav bar (top right) to trigger the global search.
      </OnyxInfoCard>

      <!-- your page content would go here... -->
    </OnyxPageLayout>

    <OnyxUnstableGlobalSearch v-model:open="isOpen" v-model="searchTerm" :loading="isLoading">
      <!--
        if the user hasn't searched anything yet, we propose some default/static options here.
        if your application does not have suggested options, just remove the group below
      -->
      <OnyxUnstableGlobalSearchGroup
        v-if="!searchResults.length && !isLoading"
        label="Quick results"
      >
        <OnyxUnstableGlobalSearchOption label="Proposal 1" value="proposal-1" link="#test-link" />
        <OnyxUnstableGlobalSearchOption label="Proposal 2" value="proposal-2" link="#test-link" />
        <OnyxUnstableGlobalSearchOption label="Proposal 3" value="proposal-3" link="#test-link" />
      </OnyxUnstableGlobalSearchGroup>

      <template v-else>
        <OnyxUnstableGlobalSearchGroup label="Search results" :skeleton="isLoading">
          <OnyxUnstableGlobalSearchOption
            v-for="result in searchResults"
            :key="result.value"
            v-bind="result"
          />
        </OnyxUnstableGlobalSearchGroup>
      </template>

      <!--
        custom fixed system-wide actions that are always visible
        the following components might be useful here (when clicking on the options):
        OnyxColorSchemeDialog, OnyxSelectDialog
      -->
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
        <OnyxUnstableGlobalSearchOption
          label="Settings"
          value="settings"
          :icon="iconSettings"
          link="#test-link"
        />
      </OnyxUnstableGlobalSearchGroup>
    </OnyxUnstableGlobalSearch>
  </OnyxAppLayout>
</template>
