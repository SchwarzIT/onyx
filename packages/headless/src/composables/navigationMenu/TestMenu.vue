<script lang="ts" setup>
import TestMenuButton from "../menuButton/TestMenuButton.vue";
import { createNavigationMenu } from "./createMenu";

const {
  elements: { nav },
} = createNavigationMenu({ navigationName: "test menu" });
</script>

<template>
  <nav v-bind="nav">
    <TestMenuButton />
    <TestMenuButton />
    <TestMenuButton />
  </nav>
</template>
