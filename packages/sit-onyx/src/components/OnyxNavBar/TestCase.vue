<script setup lang="ts">
import OnyxNavItem from "./modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxNavBar from "./OnyxNavBar.vue";
import { type OnyxNavBarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  // Vue defaults booleans to false so this explicit "undefined" is needed to correctly set the default breakpoint
  mobile: undefined,
});
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
