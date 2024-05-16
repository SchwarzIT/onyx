<script setup lang="ts">
import { computed, ref } from "vue";
import { createComboBox } from "./createComboBox";

const elements = ["a", "b", "c", "d"];
const isExpanded = ref(false);
const inputValue = ref("");
const activeOption = ref("");
const selectedIndex = computed<number | undefined>(() => {
  const index = elements.indexOf(activeOption.value);
  return index !== -1 ? index : undefined;
});

const onActivateFirst = () => (activeOption.value = elements[0]);
const onActivateLast = () => (activeOption.value = elements[elements.length - 1]);
const onActivateNext = () => {
  if (selectedIndex.value === undefined) {
    return onActivateFirst();
  }
  activeOption.value = elements[selectedIndex.value + (1 % (elements.length - 1))];
};
const onActivatePrevious = () => (activeOption.value = elements[(selectedIndex.value ?? 0) - 1]);
const onSelect = (newValue: string) => (inputValue.value = newValue);
const onToggle = () => (isExpanded.value = !isExpanded.value);

const comboBox = createComboBox({
  listLabel: "List",
  activeOption,
  inputValue,
  isExpanded,
  onToggle,
  onActivateFirst,
  onActivateLast,
  onActivateNext,
  onActivatePrevious,
  onSelect,
});

const {
  elements: { input, label, listBox, button, option },
} = comboBox;

defineExpose({ comboBox });
</script>
<template>
  <div>
    <label v-bind="label">
      some label:
      <input
        v-bind="input"
        @keydown.arrow-down="isExpanded = true"
        @keydown.esc="isExpanded = false"
      />
    </label>

    <button v-bind="button">
      <template v-if="isExpanded">⬆️</template>
      <template v-else>⬇️</template>
    </button>
    <ul v-bind="listBox" :class="{ hidden: !isExpanded }" style="width: 400px">
      <li
        v-for="e in elements"
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
.hidden {
  display: none;
}
</style>
