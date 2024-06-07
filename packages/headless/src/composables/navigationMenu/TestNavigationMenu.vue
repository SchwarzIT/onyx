<script lang="ts" setup>
import { createNavigationMenu } from "./createNavigationMenu";

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
] as const;

const {
  elements: { button },
} = createNavigationMenu({
  label: "Navigation menu",
});
</script>

<template>
  <ul v-bind="button">
    <li v-for="item in items" :key="item" title="item">
      {{ item }}
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
