<script lang="ts" setup>
import { normalizedIncludes, OnyxSelect, type SelectOption } from "sit-onyx";
import { computed, ref } from "vue";

defineProps<{
  selectOptions: SelectOption<string>[];
  useSkeleton: boolean;
}>();

const groupedSelectOptions = [
  { value: "cat", label: "Cat", group: "Land" },
  { value: "dog", label: "Dog", group: "Land" },
  { value: "tiger", label: "Tiger", group: "Land" },
  { value: "reindeer", label: "Reindeer", group: "Land" },
  { value: "racoon", label: "Racoon", group: "Land" },
  { value: "dolphin", label: "Dolphin", group: "Water" },
  { value: "flounder", label: "Flounder", group: "Water" },
  { value: "eel", label: "Eel", group: "Water" },
  { value: "falcon", label: "Falcon", group: "Air" },
  { value: "owl", label: "Owl", group: "Air" },
] satisfies SelectOption[];

const selectState = ref<string>();
const groupedSelectState = ref<string>();
const multiselectState = ref<string[]>();

const lazyLoadedState = ref(15);
const lazyLoadedLength = ref(10);
const lazyLoadedOptions = computed<SelectOption<number>[]>(() =>
  Array.from({ length: lazyLoadedLength.value }, (_, value) => ({
    value,
    label: `Lazy option ${value}`,
  })),
);

const filteredState = ref("3");
const filterSearchTerm = ref("");
const filterBase = [
  { value: "0", label: "Option Zero" },
  { value: "1", label: "Option One" },
  { value: "2", label: "Option Two" },
  { value: "3", label: "Option Three" },
  { value: "4", label: "Option Four" },
  { value: "5", label: "Option Five" },
];
const filterValueLabel = computed(
  () => filterBase.find(({ value }) => value === filteredState.value)?.label,
);
const filteredOptions = computed(() =>
  filterBase.filter(
    ({ value, label }) =>
      normalizedIncludes(label, filterSearchTerm.value) || value === filterSearchTerm.value,
  ),
);
</script>

<template>
  <div>
    <div class="select-demo">
      <OnyxSelect
        v-model="selectState"
        label="Example select"
        list-label="Example listbox list"
        :options="selectOptions"
        :skeleton="useSkeleton"
      />
      <OnyxSelect
        v-model="groupedSelectState"
        label="Example grouped select"
        list-label="Example listbox list"
        :options="groupedSelectOptions"
        :skeleton="useSkeleton"
      />
      <OnyxSelect
        v-model="multiselectState"
        label="Example multiselect"
        list-label="Example listbox list"
        multiple
        with-check-all
        :options="selectOptions"
        :skeleton="useSkeleton"
      />
      <OnyxSelect
        v-model="lazyLoadedState"
        label="Lazy loading with custom input text"
        list-label="Lazy loaded list"
        :lazy-loading="{ enabled: true }"
        :value-label="`Lazy option ${lazyLoadedState}`"
        :options="lazyLoadedOptions"
        :skeleton="useSkeleton"
        @lazy-load="lazyLoadedLength += 5"
      />
      <OnyxSelect
        v-model="filteredState"
        v-model:search-term="filterSearchTerm"
        label="Custom filtering, search for text or number"
        list-label="Filtered list"
        :value-label="filterValueLabel"
        :options="filteredOptions"
        :skeleton="useSkeleton"
        with-search
      />
      <OnyxSelect
        v-model="selectState"
        label="Example select with list description"
        list-label="Example with list description"
        list-description="List Description"
        :options="selectOptions"
        :skeleton="useSkeleton"
      />
    </div>

    <div v-if="!useSkeleton" class="onyx-text--small state-info">
      <div>OnyxSelect single state: {{ selectState ?? "–" }}</div>
      <div>OnyxSelect single grouped state: {{ groupedSelectState ?? "–" }}</div>
      <div>OnyxSelect multiselect state: {{ multiselectState ?? "–" }}</div>
      <div>OnyxSelect lazy load state: {{ lazyLoadedState ?? "–" }}</div>
      <div>OnyxSelect filter state: {{ filteredState ?? "–" }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--onyx-spacing-xs);
}
</style>
