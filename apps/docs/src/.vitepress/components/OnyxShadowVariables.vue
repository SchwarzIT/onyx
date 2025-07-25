<script lang="ts" setup>
import { useData } from "vitepress";
import DesignVariableCard from "./DesignVariableCard.vue";

const { isDark } = useData();

const shadows = [
  "onyx-shadow-medium-top",
  "onyx-shadow-medium-bottom",
  "onyx-shadow-medium-left",
  "onyx-shadow-medium-right",
  "onyx-shadow-soft-top",
  "onyx-shadow-soft-bottom",
  "onyx-shadow-soft-left",
  "onyx-shadow-soft-right",
];
</script>

<template>
  <!-- We need to include isDark in the key because the variable value depends on the light/dark theme.
       The key ensures that the component is re-rendered whenever the theme is switched.  -->
  <DesignVariableCard
    v-for="shadow in shadows"
    :key="`${shadow}-${isDark}`"
    :name="shadow"
    class="variable"
  >
    <figure class="preview" :style="{ boxShadow: `var(--${shadow})` }"></figure>
  </DesignVariableCard>
</template>

<style lang="scss" scoped>
.variable {
  margin-bottom: var(--onyx-spacing-lg);
}

.preview {
  width: 4rem;
  height: 4rem;
  border-radius: var(--onyx-radius-sm);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background: var(--onyx-color-base-neutral-100);
  margin: 0;
  box-sizing: border-box;
}
</style>
