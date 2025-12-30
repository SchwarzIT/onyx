<script lang="ts" setup>
import {
  iconArrowSmallRight,
  iconCircleContrast,
  iconFile,
  iconSearch,
  iconSettings,
  iconTranslate,
} from "@sit-onyx/icons";
import { computed, ref, watch } from "vue";
import {
  normalizedIncludes,
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
import OnyxButton from "../../OnyxButton/OnyxButton.vue";

type SearchGroup = {
  label: string;
  options: OnyxGlobalSearchOptionProps[];
};

const isOpen = ref(false);
const searchTerm = ref("");
const isLoading = ref(false);

// clear search term when modal is closed
watch(isOpen, (newOpen) => {
  if (!newOpen) searchTerm.value = "";
});

const searchResults = ref<OnyxGlobalSearchOptionProps[]>([]);

// in a real project, you probably want to debounce the ref so that your search logic is not triggered on every key stroke
// you can use a library like VueUse for this: https://vueuse.org/shared/watchDebounced/
watch(searchTerm, async () => {
  // implement your custom search behavior here, we just fake it for this example
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (searchTerm.value) {
    // generate some dummy search results, change this to your project-specific logic
    searchResults.value = Array.from({ length: 20 }, (_, index) => {
      const id = index + 1;
      return {
        label: `Result ${id} for "${searchTerm.value}"`,
        value: `result-${id}`,
        link: `#result-${id}`,
        icon: iconFile,
      };
    });
  } else {
    searchResults.value = [];
  }

  isLoading.value = false;
});

/**
 * Calculates the groups to be displayed in the search.
 * Limits the "Search results" to a maximum of 10 entries for the display.
 */
const searchGroups = computed(() => {
  const groups: SearchGroup[] = [];

  if (searchTerm.value) {
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
    .map((group) => {
      const filtered = group.options.filter((option) =>
        normalizedIncludes(option.label, searchTerm.value),
      );

      // Logic: Show only the first 10 options if it is the search results group
      const isResultGroup = group.label === "Search results";
      return {
        ...group,
        options: isResultGroup ? filtered.slice(0, 10) : filtered,
        // we store the original length to check if there are "more" items later
        hasMore: isResultGroup && filtered.length > 10,
      };
    })
    .filter((group) => group.options.length > 0);
});

/**
 * Checks if the "Show all results" button should be displayed.
 */
const showMoreButton = computed(() => {
  return searchGroups.value.some((group) => group.hasMore);
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
        <br />
        <br />
        If there are more results than 10, a "Show all results" button will be displayed at the end
        of the search results.
      </OnyxInfoCard>

      <!-- your page content would go here... -->
    </OnyxPageLayout>

    <OnyxUnstableGlobalSearch v-model:open="isOpen" v-model="searchTerm" :loading="isLoading">
      <!-- show skeleton while search results are loading -->
      <OnyxUnstableGlobalSearchGroup v-if="isLoading" label="Search results" skeleton />

      <template v-else>
        <OnyxUnstableGlobalSearchGroup
          v-for="group in searchGroups"
          :key="group.label"
          :label="group.label"
        >
          <OnyxUnstableGlobalSearchOption
            v-for="option in group.options"
            :key="option.value"
            v-bind="option"
          />
        </OnyxUnstableGlobalSearchGroup>
      </template>

      <!-- show "Show all results" button if there are more results to show -->
      <template v-if="showMoreButton && !isLoading" #endOfList>
        <OnyxButton
          label="Show all results"
          mode="plain"
          class="show-all-button"
          :icon="iconArrowSmallRight"
          icon-position="right"
        />
      </template>
    </OnyxUnstableGlobalSearch>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.show-all-button {
  width: 100%;
}
</style>
