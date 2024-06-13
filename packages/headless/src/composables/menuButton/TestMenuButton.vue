<script lang="ts" setup>
import { createMenuButton } from "./createMenuButton";
import { ref } from "vue";

const items = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return { label: `Item ${id}`, value: `/href-${id}` };
});

const activeItem = ref<string>();

const {
  elements: { button, menu, menuItems, listItem, parentComponent },
  state: { isExpanded },
} = createMenuButton({
  onSelect: (value) => {
    activeItem.value = value;
  },
});
</script>

<template>
  <div v-bind="parentComponent">
    <button v-bind="button">Toggle nav menu</button>
    <ul v-show="isExpanded" v-bind="menu">
      <li v-for="item in items" v-bind="listItem" :key="item.value" title="item">
        <a v-bind="menuItems({ active: activeItem === item.value, value: item.value })">{{
          item.label
        }}</a>
      </li>
    </ul>
  </div>
</template>
