<script lang="ts" setup>
import { DENSITIES, type Density } from "~components/../composables/density";
import DesignVariableBadge from "./DesignVariableBadge.vue";

const modelValue = defineModel<Density>({ default: "default" });
</script>

<template>
  <div class="densities">
    <DesignVariableBadge
      v-for="density in DENSITIES"
      :key="density"
      :text="density"
      :active="modelValue === density"
      @click="modelValue = density"
    />
  </div>
</template>

<style lang="scss" scoped>
.densities {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);
}
</style>
