<script lang="ts" setup>
import { createMenuButton } from "./createMenuButton";
import { ref } from "vue";

const items = [
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
].map((item) => {
  return {
    label: item,
    value: `/${item.toLowerCase()}`,
  };
});

const activeItem = ref<string>();

const {
  elements: { button, menu, menuItem, listItem },
  state: { isExpanded },
} = createMenuButton({
  onSelect: (value) => {
    activeItem.value = value;
  },
});
</script>

<template>
  <button v-bind="button">Toggle nav menu</button>
  <ul v-show="isExpanded" v-bind="menu">
    <li v-for="item in items" v-bind="listItem" :key="item.value" title="item">
      <a v-bind="menuItem({ active: activeItem === item.value, value: item.value })">{{
        item.label
      }}</a>
    </li>
  </ul>
</template>
