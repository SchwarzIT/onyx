<script lang="ts" setup>
import { ref } from "vue";
import { createListbox, type ListboxValue } from "./createListbox";

const listboxRef = ref<HTMLUListElement>();
const selectedOption = ref<ListboxValue>();
const focusedOption = ref<ListboxValue>();

const options = [
  "Apple",
  "Banana",
  "Mango",
  "Kiwi",
  "Orange",
  "Papaya",
  "Apricot",
  "Lemon",
  "Cranberry",
  "Avocado",
  "Cherry",
  "Coconut",
  "Lychee",
  "Melon",
  "Raspberry",
  "Strawberry",
];

const {
  elements: { listbox, option: headlessOption },
} = createListbox({
  label: "Test listbox",
  selectedOption,
  focusedOption,
  onSelect: (id) => {
    selectedOption.value = selectedOption.value === id ? undefined : id;
  },
  onFocusFirst: () => (focusedOption.value = options[0]),
  onFocusLast: () => (focusedOption.value = options.at(-1)),
  onFocusNext: (currentValue) => {
    const currentIndex = options.findIndex((i) => i === currentValue);
    if (currentIndex < options.length - 1) {
      focusedOption.value = options[currentIndex + 1];
    }
  },
  onFocusPrevious: (currentValue) => {
    const currentIndex = options.findIndex((i) => i === currentValue);
    if (currentIndex > 0) focusedOption.value = options[currentIndex - 1];
  },
  onScrollIntoView: (id) => {
    const option = listboxRef.value?.querySelector(`#${id}`);
    option?.scrollIntoView({ block: "nearest", inline: "nearest" });
  },
  onFocusByLabel: (label) => {
    const firstMatch = options.find((i) => {
      return i.toLowerCase().trim().startsWith(label.toLowerCase());
    });
    if (!firstMatch) return;
    focusedOption.value = firstMatch;
  },
});
</script>

<template>
  <ul v-bind="listbox" ref="listboxRef">
    <li
      v-for="option in options"
      :key="option"
      v-bind="
        headlessOption({
          value: option,
          label: option,
          selected: option === selectedOption,
        })
      "
      :class="{ focused: option === focusedOption, selected: option === selectedOption }"
    >
      {{ option }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.focused {
  background-color: orange;
}

.selected {
  background-color: red;
}
</style>
