<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/signet.svg";
import {
  iconCircleContrast,
  iconFile,
  iconSearch,
  iconSettings,
  iconTranslate,
} from "@sit-onyx/icons";
import { refDebounced, useAsyncState } from "@vueuse/core";
import {
  normalizedIncludes,
  OnyxAppLayout,
  OnyxGlobalSearch,
  OnyxGlobalSearchGroup,
  OnyxGlobalSearchOption,
  OnyxInfoCard,
  OnyxNavBar,
  OnyxPageLayout,
  OnyxUnstableNavButton,
  OnyxFilterBadge,
  type OnyxGlobalSearchOptionProps,
} from "sit-onyx";
import { computed, ref, watch } from "vue";

type SearchGroup = {
  label: string;
  options: OnyxGlobalSearchOptionProps[];
};

const isOpen = ref(false);
const searchTerm = ref("");
// using a debounce here so the search logic is not triggered on every key stroke
const debouncedSearchTerm = refDebounced(searchTerm, 500);
watch(debouncedSearchTerm, () => refetchResults());

// clear search term when modal is closed
watch(isOpen, (newOpen) => {
  if (!newOpen) searchTerm.value = "";
});

const {
  state: searchResults,
  isLoading,
  executeImmediate: refetchResults,
} = useAsyncState<OnyxGlobalSearchOptionProps[]>(
  async () => {
    // implement your custom search behavior here, we just fake it for this example
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!debouncedSearchTerm.value) return [];

    // generate some dummy search results, change this to your project-specific logic
    return Array.from({ length: 6 }, (_, index) => {
      const id = index + 1;
      return {
        label: `Result ${id} ${debouncedSearchTerm.value}`,
        value: `result-${id}`,
        link: `#result-${id}`,
        icon: iconFile,
      } satisfies OnyxGlobalSearchOptionProps;
    });
  },
  [],
  {
    immediate: false,
  },
);

const searchGroups = computed(() => {
  const groups: SearchGroup[] = [];

  if (debouncedSearchTerm.value) {
    groups.push({
      label: "Search results",
      options: searchResults.value,
    });
  } else {
    // if the user hasn't searched anything yet, we want to suggest common options (depending on your specific project)
    groups.push({
      label: "Suggestions",
      options: [
        { label: "Suggestion 1", value: "suggestion-1", link: "#suggestion-link-1" },
        { label: "Suggestion 2", value: "suggestion-2", link: "#suggestion-link-2" },
        { label: "Suggestion 3", value: "suggestion-3", link: "#suggestion-link-3" },
      ],
    });
  }

  // always add some fixed system-wide actions
  groups.push({
    label: "System",
    // for the locale and colorScheme option, you can use/open the following components (when clicking on the options):
    // OnyxColorSchemeDialog, OnyxSelectDialog
    options: [
      { label: "Change language", value: "locale", icon: iconTranslate },
      { label: "Change appearance", value: "colorScheme", icon: iconCircleContrast },
      { label: "Settings", value: "settings", icon: iconSettings, link: "#settings" },
    ],
  });

  return groups
    .map((group) => ({
      ...group,
      options: group.options.filter((option) =>
        normalizedIncludes(option.label, debouncedSearchTerm.value),
      ),
    }))
    .filter((group) => group.options.length > 0);
});
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="App name" :logo-url>
        <!-- using the "globalContextArea" instead of the regular "contextArea" here so the search is also always visible on mobile screens -->
        <template #globalContextArea>
          <OnyxUnstableNavButton
            label="Open global search"
            :icon="iconSearch"
            hide-label
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

    <OnyxGlobalSearch v-model:open="isOpen" v-model="searchTerm">
      <template #leading>
        <OnyxGlobalSearchGroup orientation="horizontal" label="Filters">
          <OnyxFilterBadge label="Filter 1" />
          <OnyxFilterBadge label="Filter 2" />
          <OnyxFilterBadge label="Filter 3" />
        </OnyxGlobalSearchGroup>
      </template>

      <!-- show skeleton while search results are loading -->
      <OnyxGlobalSearchGroup v-if="isLoading" label="Search results" skeleton />

      <template v-else>
        <OnyxGlobalSearchGroup
          v-for="group in searchGroups"
          :key="group.label"
          :label="group.label"
        >
          <OnyxGlobalSearchOption
            v-for="option in group.options"
            :key="option.value"
            v-bind="option"
          />
        </OnyxGlobalSearchGroup>
      </template>
    </OnyxGlobalSearch>
  </OnyxAppLayout>
</template>
