<script lang="ts" setup>
import { ref } from "vue";
import { createListbox, type ListboxValue } from "./createListbox";

const listboxRef = ref<HTMLUListElement>();
const selectedOption = ref<ListboxValue>();
const activeOption = ref<ListboxValue>();

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
  activeOption,
  onSelect: (id) => {
    selectedOption.value = selectedOption.value === id ? undefined : id;
  },
  onActivateFirst: () => (activeOption.value = options[0]),
  onActivateLast: () => (activeOption.value = options.at(-1)),
  onActivateNext: (currentValue) => {
    const currentIndex = options.findIndex((i) => i === currentValue);
    if (currentIndex < options.length - 1) {
      activeOption.value = options[currentIndex + 1];
    }
  },
  onActivatePrevious: (currentValue) => {
    const currentIndex = options.findIndex((i) => i === currentValue);
    if (currentIndex > 0) activeOption.value = options[currentIndex - 1];
  },
  onScrollIntoView: (id) => {
    const option = listboxRef.value?.querySelector(`#${id}`);
    option?.scrollIntoView({ block: "nearest", inline: "nearest" });
  },
  onActivateByLabel: (label) => {
    const firstMatch = options.find((i) => {
      return i.toLowerCase().trim().startsWith(label.toLowerCase());
    });
    if (!firstMatch) return;
    activeOption.value = firstMatch;
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
      :class="{ focused: option === activeOption, selected: option === selectedOption }"
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
