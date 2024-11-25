<script lang="ts" setup>
import { ONYX_COLORS } from "sit-onyx";
import { useData } from "vitepress";
import { computed } from "vue";
import ColorPalette from "./ColorPalette.vue";
import DesignVariableBadge from "./DesignVariableBadge.vue";

const { isDark } = useData();
// Checks if ColorPalettes are available in the given theme
const isColorDefined = (name: string) => {
  const cssVar = `--onyx-color-base-${name}-500`;
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return !!value;
};
const availableColors = computed(() => ONYX_COLORS.filter((name) => isColorDefined(name)));
</script>

<template>
  <div class="palettes">
    <div class="themes">
      <DesignVariableBadge text="Light mode" :active="!isDark" @click="isDark = false" />
      <DesignVariableBadge text="Dark mode" :active="isDark" @click="isDark = true" />
    </div>
    <ColorPalette v-for="name in availableColors" :key="name" :name="name" />
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
