<script lang="ts" setup>
import { ref } from "vue";
import { createMenuButton } from "./createMenuButton";

const items = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  return { label: `Item ${id}`, value: `/href-${id}` };
});

const activeItem = ref<string>();
const isExpanded = ref(false);
const onToggle = () => (isExpanded.value = !isExpanded.value);
const trigger = ref<"click" | "hover">("hover");

const {
  elements: { root, button, menu, menuItem, listItem },
} = createMenuButton({ isExpanded, onToggle, trigger });
</script>

<template>
  <div v-bind="root">
    <button v-bind="button" type="button">Toggle nav menu</button>
    <ul v-show="isExpanded" v-bind="menu">
      <li v-for="item in items" v-bind="listItem" :key="item.value">
        <a v-bind="menuItem({ active: activeItem === item.value })" href="#">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>
