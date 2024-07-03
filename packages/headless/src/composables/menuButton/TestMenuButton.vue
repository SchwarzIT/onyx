<script lang="ts" setup>
import { ref } from "vue";
import { createMenuButton } from "./createMenuButton";

const items = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return { label: `Item ${id}`, value: `/href-${id}` };
});

const activeItem = ref<string>();

const {
  elements: { button, menu, menuItem, listItem, flyout },
  state: { isExpanded },
} = createMenuButton({});
</script>

<template>
  <button v-bind="button">Toggle nav menu</button>
  <div v-bind="flyout">
    <ul v-show="isExpanded" v-bind="menu">
      <li v-for="item in items" v-bind="listItem" :key="item.value" title="item">
        <a v-bind="menuItem({ active: activeItem === item.value })" href="#">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>
