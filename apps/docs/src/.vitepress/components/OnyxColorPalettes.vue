<script lang="ts" setup>
import { useData } from "vitepress";
import ColorPalette from "./ColorPalette.vue";

const { isDark } = useData();
</script>

<template>
  <div class="palettes">
    <div class="themes">
      <button @click="isDark = false">
        <Badge
          class="themes__badge"
          :class="{ 'themes__badge--active': !isDark }"
          text="Light mode"
          type="info"
        />
      </button>

      <button @click="isDark = true">
        <Badge
          class="themes__badge"
          :class="{ 'themes__badge--active': isDark }"
          text="Dark mode"
          type="info"
        />
      </button>
    </div>

    <ColorPalette name="primary" />
    <ColorPalette name="secondary" />
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

  &__badge {
    cursor: pointer;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: var(--onyx-spacing-4xs) var(--onyx-spacing-md);
    border-radius: var(--onyx-radius-full);

    &--active {
      color: var(--vp-c-brand-2);
      background-color: var(--vp-c-brand-soft);
    }
  }
}
</style>
