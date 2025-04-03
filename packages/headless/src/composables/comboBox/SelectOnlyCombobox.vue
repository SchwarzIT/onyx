<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { createComboBox } from "./createComboBox";

const options = ["a", "b", "c", "d"];
const isExpanded = ref(false);
const comboboxRef = useTemplateRef("combobox");
const activeOption = ref("");
const selectedOption = ref("");
const selectedIndex = computed<number | undefined>(() => {
  const index = options.indexOf(activeOption.value);
  return index !== -1 ? index : undefined;
});

const onActivateFirst = () => (activeOption.value = options[0]);
const onActivateLast = () => (activeOption.value = options[options.length - 1]);
const onActivateNext = () => {
  if (selectedIndex.value === undefined) {
    return onActivateFirst();
  }
  activeOption.value = options[selectedIndex.value + (1 % (options.length - 1))];
};
const onActivatePrevious = () => (activeOption.value = options[(selectedIndex.value ?? 0) - 1]);
const onSelect = (newValue: string) => (selectedOption.value = newValue);
const onToggle = () => (isExpanded.value = !isExpanded.value);
const onTypeAhead = () => {};

const comboBox = createComboBox({
  autocomplete: "none",
  label: "some label",
  listLabel: "List",
  activeOption,
  isExpanded,
  templateRef: comboboxRef,
  onToggle,
  onTypeAhead,
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
    <input
      v-bind="input"
      v-model="selectedOption"
      readonly
      @keydown.arrow-down="isExpanded = true"
    />

    <button v-bind="button" type="button">
      <template v-if="isExpanded">⬆️</template>
      <template v-else>⬇️</template>
    </button>
    <ul class="listbox" v-bind="listbox" :class="{ hidden: !isExpanded }">
      <li
        v-for="e in options"
        :key="e"
        v-bind="option({ value: e, label: e, disabled: false, selected: e === selectedOption })"
        :class="{ active: e === activeOption }"
      >
        {{ e }}
      </li>
    </ul>
  </div>
</template>

<style>
.hidden {
  display: none;
}
.active {
  outline: 2px solid black;
}
[aria-selected="true"] {
  background-color: red;
}
.listbox {
  width: 400px;
}
</style>
