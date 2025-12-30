<script lang="ts" setup>
import {
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
const isLoadingMore = ref(false);

// clear search term when modal is closed
watch(isOpen, (newOpen) => {
  if (!newOpen) searchTerm.value = "";
});

const searchResults = ref<OnyxGlobalSearchOptionProps[]>([]);
const resultLength = ref(6);
// in a real project, you probably want to debounce the ref so that your search logic is not triggered on every key stroke
// you can use a library like VueUse for this: https://vueuse.org/shared/watchDebounced/
watch([searchTerm], async () => {
  // implement your custom search behavior here, we just fake it for this example
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (searchTerm.value) {
    // generate some dummy search results, change this to your project-specific logic
    searchResults.value = Array.from({ length: 6 }, (_, index) => {
      const id = index + 1;
      return {
        label: `Result ${id} ${searchTerm.value}`,
        value: `result-${id}`,
        link: `#result-${id}`,
        icon: iconFile,
      };
    });
  } else {
    resultLength.value = 6;
    searchResults.value = [];
  }

  isLoading.value = false;
});

// dummy load More function.
const loadMore = async () => {
  isLoadingMore.value = true;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  resultLength.value += 6;
  searchResults.value = Array.from({ length: resultLength.value }, (_, index) => {
    const id = index + 1;
    return {
      label: `Result ${id} ${searchTerm.value}`,
      value: `result-${id}`,
      link: `#result-${id}`,
      icon: iconFile,
    };
  });

  isLoadingMore.value = false;
};

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
    .map((group) => ({
      ...group,
      options: group.options.filter((option) => normalizedIncludes(option.label, searchTerm.value)),
    }))
    .filter((group) => group.options.length > 0);
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
          <!-- show skeleton while more results are loading -->
          <template v-if="isLoadingMore && searchTerm">
            <OnyxUnstableGlobalSearchOption
              v-for="i in 6"
              :key="`loading-${i}`"
              label="Loading"
              value="loading"
              skeleton
            />
          </template>
        </OnyxUnstableGlobalSearchGroup>
      </template>
      <!-- show "show more" button if there are more results to show-->
      <template v-if="searchTerm && !isLoading && resultLength < 60" #endOfList>
        <OnyxButton
          label="show more"
          mode="plain"
          :loading="isLoadingMore"
          class="more-button"
          @click="loadMore"
        />
      </template>
    </OnyxUnstableGlobalSearch>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.more-button {
  width: 100%;
}
</style>
