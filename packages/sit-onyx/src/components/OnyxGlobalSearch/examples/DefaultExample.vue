<script lang="ts" setup>
import {
  iconCircleContrast,
  iconFilePdf,
  iconSearch,
  iconSettings,
  iconTranslate,
} from "@sit-onyx/icons";
import { ref, watch } from "vue";
import {
  OnyxAppLayout,
  OnyxIconButton,
  OnyxNavBar,
  OnyxPageLayout,
  OnyxUnstableGlobalSearch,
  OnyxUnstableGlobalSearchGroup,
  OnyxUnstableGlobalSearchOption,
  type OnyxGlobalSearchGroupProps,
  type OnyxGlobalSearchOptionProps,
} from "../../../index.js";
import OnyxInfoCard from "../../OnyxInfoCard/OnyxInfoCard.vue";

type SearchResult = OnyxGlobalSearchGroupProps & {
  options: OnyxGlobalSearchOptionProps[];
};

const isOpen = ref(false);
const searchTerm = ref("");
const isLoading = ref(false);

const searchResults = ref<SearchResult[]>([]);

// in a real project, you probably want to debounce the ref so that your search logic is not triggered on every key stroke
// you can use a library like VueUse for this: https://vueuse.org/shared/watchDebounced/
watch(searchTerm, async () => {
  // implement your custom search behavior here, we just fake it for this example
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (searchTerm.value) {
    searchResults.value = [
      {
        label: "Search results",
        options: [
          { label: "Result 1", value: "1", link: "#test-link", icon: iconFilePdf },
          { label: "Result 2", value: "2", link: "#test-link", icon: iconFilePdf },
          { label: "Result 3", value: "3", link: "#test-link", icon: iconFilePdf },
        ],
      },
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
      <!-- if the user hasn't searched anything yet, we propose some default/static options here -->
      <OnyxUnstableGlobalSearchGroup v-if="!searchResults.length" label="Quick results">
        <OnyxUnstableGlobalSearchOption label="Proposal 1" value="proposal-1" link="#test-link" />
        <OnyxUnstableGlobalSearchOption label="Proposal 2" value="proposal-2" link="#test-link" />
        <OnyxUnstableGlobalSearchOption label="Proposal 3" value="proposal-3" link="#test-link" />
      </OnyxUnstableGlobalSearchGroup>

      <template v-else>
        <OnyxUnstableGlobalSearchGroup
          v-for="result in searchResults"
          :key="result.label"
          v-bind="result"
        >
          <OnyxUnstableGlobalSearchOption
            v-for="option in result.options"
            :key="option.value"
            v-bind="option"
          />
        </OnyxUnstableGlobalSearchGroup>
      </template>

      <!-- custom fixed system-wide actions that are always visible -->
      <OnyxUnstableGlobalSearchGroup label="System">
        <!-- you can use the following components when clicking on the options below:
            OnyxColorSchemeDialog, OnyxSelectDialog
        -->
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
