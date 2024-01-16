<script setup lang="ts">
import { computed, ref } from "vue";
import { createComboBox } from "./createComboBox";

const elements = ["a", "b", "c", "d"];
const isExpanded = ref(false);
const activeKey = ref("");
const selectedIndex = computed<number | undefined>(() => {
  const index = elements.indexOf(activeKey.value);
  return index !== -1 ? index : undefined;
});

// According to spec options must be focusable (not disabled) => should we move that logic to
const onFirst = () => (activeKey.value = elements[0]);
const onLast = () => (activeKey.value = elements[elements.length - 1]);
const onNext = () => {
  if (selectedIndex.value === undefined) {
    return onFirst();
  }
  activeKey.value = elements[selectedIndex.value + (1 % (elements.length - 1))];
};
const onPrevious = () => (activeKey.value = elements[(selectedIndex.value ?? 0) - 1]);
const onSelect = (key: string) => (activeKey.value = key);
const onToggle = () => (isExpanded.value = !isExpanded.value);

const comboBox = createComboBox({
  isExpanded,
  onToggle,
  onFirst,
  onLast,
  onNext,
  onPrevious,
  onSelect,
  activeKey,
});

const {
  elements: { input, label, listBox, button, option },
} = comboBox;

defineExpose({ comboBox });
</script>
<template>
  <!-- TODO: https://w3c.github.io/aria/#aria-autocomplete -->
  <div>
    <label v-bind="label">some label:</label>
    <input
      v-bind="input"
      @keydown.arrow-down="isExpanded = true"
      @keydown.esc="isExpanded = false"
    />
    <!-- btn optional but must have tabindex -1 -->
    <button v-bind="button">
      <template v-if="isExpanded">⬆️</template>
      <template v-else>⬇️</template>
    </button>
    <ul v-bind="listBox" :class="{ hidden: !isExpanded }" style="width: 400px">
      <li
        v-for="e in elements"
        :key="e"
        v-bind="option({ key: e, label: e, disabled: false })"
        :style="{ 'background-color': e === activeKey ? 'red' : undefined }"
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
