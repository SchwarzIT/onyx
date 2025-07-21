<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { createComboBox } from "./createComboBox.js";

const options = ["a", "b", "c", "d"];
const isExpanded = ref(false);
const searchTerm = ref("");
const comboboxRef = useTemplateRef("combobox");
const activeOption = ref("");
const filteredOptions = computed(() => options.filter((v) => v.includes(searchTerm.value)));
const selectedIndex = computed<number | undefined>(() => {
  const index = filteredOptions.value.indexOf(activeOption.value);
  return index !== -1 ? index : undefined;
});

const onActivateFirst = () => (activeOption.value = filteredOptions.value[0]);
const onActivateLast = () =>
  (activeOption.value = filteredOptions.value[filteredOptions.value.length - 1]);
const onActivateNext = () => {
  if (selectedIndex.value === undefined) {
    return onActivateFirst();
  }
  activeOption.value =
    filteredOptions.value[selectedIndex.value + (1 % (filteredOptions.value.length - 1))];
};
const onActivatePrevious = () =>
  (activeOption.value = filteredOptions.value[(selectedIndex.value ?? 0) - 1]);
const onSelect = (newValue: string) => (searchTerm.value = newValue);
const onAutocomplete = (input: string) => (searchTerm.value = input);
const onToggle = () => (isExpanded.value = !isExpanded.value);

const comboBox = createComboBox({
  autocomplete: "list",
  label: "some label",
  listLabel: "List",
  activeOption,
  isExpanded,
  templateRef: comboboxRef,
  onToggle,
  onAutocomplete,
  onActivateFirst,
  onActivateLast,
  onActivateNext,
  onActivatePrevious,
  onSelect,
});

const {
  elements: { input, listbox, button, option },
} = comboBox;

defineExpose({ comboBox });
</script>

<template>
  <div ref="combobox">
    <input v-bind="input" v-model="searchTerm" @keydown.arrow-down="isExpanded = true" />

    <button v-bind="button" type="button">
      <template v-if="isExpanded"> ⬆️ </template>
      <template v-else> ⬇️ </template>
    </button>
    <ul v-bind="listbox" :class="{ list: true, hidden: !isExpanded }">
      <li
        v-for="e in filteredOptions"
        :key="e"
        v-bind="option({ value: e, label: e, disabled: false })"
        :style="{ 'background-color': e === activeOption ? 'red' : undefined }"
      >
        {{ e }}
      </li>
    </ul>
  </div>
</template>

<style>
.list {
  width: 400px;
}

.hidden {
  display: none;
}
</style>
