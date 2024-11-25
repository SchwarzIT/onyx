<script lang="ts" setup>
import { useData } from "vitepress";
import ColorPalette from "./ColorPalette.vue";
import DesignVariableBadge from "./DesignVariableBadge.vue";

const { isDark } = useData();
</script>

<template>
  <div class="palettes">
    <div class="themes">
      <DesignVariableBadge text="Light mode" :active="!isDark" @click="isDark = false" />
      <DesignVariableBadge text="Dark mode" :active="isDark" @click="isDark = true" />
    </div>

    <ColorPalette name="primary" />
    <ColorPalette name="neutral" />
    <ColorPalette name="danger" />
    <ColorPalette name="warning" />
    <ColorPalette name="success" />
    <ColorPalette name="info" />
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
