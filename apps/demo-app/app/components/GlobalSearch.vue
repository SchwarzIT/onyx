<script lang="ts" setup>
import { iconFile, iconSearch } from "@sit-onyx/icons";
import {
  normalizedIncludes,
  OnyxGlobalSearch,
  OnyxGlobalSearchGroup,
  OnyxGlobalSearchOption,
  OnyxUnstableNavButton,
  type OnyxGlobalSearchOptionProps,
} from "sit-onyx";
import { computed, ref, watch } from "vue";

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
    searchResults.value = [];
  }

  isLoading.value = false;
});

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

  return groups
    .map((group) => ({
      ...group,
      options: group.options.filter((option) => normalizedIncludes(option.label, searchTerm.value)),
    }))
    .filter((group) => group.options.length > 0);
});
</script>

<template>
  <OnyxUnstableNavButton
    label="Open global search"
    :icon="iconSearch"
    hide-label
    @click="isOpen = true"
  />

  <OnyxGlobalSearch v-model:open="isOpen" v-model="searchTerm">
    <!-- show skeleton while search results are loading -->
    <OnyxGlobalSearchGroup v-if="isLoading" label="Search results" skeleton />

    <template v-else>
      <OnyxGlobalSearchGroup v-for="group in searchGroups" :key="group.label" :label="group.label">
        <OnyxGlobalSearchOption
          v-for="option in group.options"
          :key="option.value"
          v-bind="option"
        />
      </OnyxGlobalSearchGroup>
    </template>
  </OnyxGlobalSearch>
</template>
