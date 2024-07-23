<script lang="ts" setup>
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { computed, ref } from "vue";

defineProps<{
  selectOptions: SelectOption[];
  useSkeleton: boolean;
}>();

const groupedSelectOptions: SelectOption[] = [
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
];

const selectState = ref<string>();
const groupedSelectState = ref<string>();
const multiselectState = ref<string[]>();

const lazyLoadedState = ref(15);
const lazyLoadedLength = ref(10);
const lazyLoadedOptions = computed<SelectOption[]>(() =>
  Array.from({ length: lazyLoadedLength.value }, (_, value) => ({
    value,
    label: `Lazy option ${value}`,
  })),
);
</script>

<template>
  <div style="display: flex; gap: var(--onyx-spacing-xs)">
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
      :multiple="true"
      :with-check-all="true"
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
  </div>

  <div v-if="!useSkeleton" class="onyx-text--small state-info">
    <div>OnyxSelect single state: {{ selectState ?? "–" }}</div>
    <div>OnyxSelect single grouped state: {{ groupedSelectState ?? "–" }}</div>
    <div>OnyxSelect multiselect state: {{ multiselectState ?? "–" }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
