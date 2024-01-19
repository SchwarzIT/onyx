<script lang="ts" setup>
import { useData } from "vitepress";
import ColorPalette from "./ColorPalette.vue";

const props = defineProps<{
  modelValue?: unknown;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
}>();

const { isDark } = useData();
</script>

<template>
  <div class="palettes">
    <div class="themes">
      <Badge
        class="themes__badge"
        :class="{ 'themes__badge--active': !isDark }"
        text="Light colors"
        type="info"
        @click="isDark = false"
      />
      <Badge
        class="themes__badge"
        :class="{ 'themes__badge--active': isDark }"
        text="Dark colors"
        type="info"
        @click="isDark = true"
      />
    </div>

    <ColorPalette name="action" />
    <ColorPalette name="brand" />
    <ColorPalette name="neutral" />
    <ColorPalette name="success" />
    <ColorPalette name="warning" />
    <ColorPalette name="danger" />
    <ColorPalette name="info" />
  </div>
</template>

<style lang="scss" scoped>
.palettes {
  display: grid;
  gap: var(--onyx-spacing-lg);
}

.themes {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-xs);

  &__badge {
    cursor: pointer;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
    border-radius: var(--onyx-radius-full);

    &--active {
      color: var(--vp-c-brand-2);
      background-color: var(--vp-c-brand-soft);
    }
  }
}
</style>
