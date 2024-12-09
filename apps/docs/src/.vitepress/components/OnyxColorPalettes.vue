<script lang="ts" setup>
import { ONYX_COLORS, useThemeTransition } from "sit-onyx";
import { useData } from "vitepress";
import ColorPalette from "./ColorPalette.vue";
import DesignVariableBadge from "./DesignVariableBadge.vue";

const { isDark } = useData();
useThemeTransition(isDark);
</script>

<template>
  <div class="palettes">
    <div class="themes">
      <DesignVariableBadge text="Light mode" :active="!isDark" @click="isDark = false" />
      <DesignVariableBadge text="Dark mode" :active="isDark" @click="isDark = true" />
    </div>
    <ColorPalette v-for="color in ONYX_COLORS" :key="color" :name="color" />
  </div>
</template>

<style lang="scss" scoped>
.palettes {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-xl);
}

.themes {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);
}
</style>
