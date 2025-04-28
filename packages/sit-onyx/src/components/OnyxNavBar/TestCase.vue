<script setup lang="ts">
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxNavBar from "./OnyxNavBar.vue";
import { type OnyxNavBarProps } from "./types";

const props = defineProps<OnyxNavBarProps>();
</script>

<template>
  <OnyxNavBar v-bind="props" app-name="Test App">
    <OnyxNavItem label="Main One" />
  </OnyxNavBar>
</template>

<style>
html,
body,
#root {
  margin: 0;
  padding: 0;
}
</style>
