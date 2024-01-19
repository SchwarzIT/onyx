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

    <ColorPalette name="Primary" variable-name="onyx-color-base-action" text-color="action" />
    <ColorPalette name="Secondary" variable-name="onyx-color-base-brand" text-color="brand" />
    <ColorPalette name="Neutral" variable-name="onyx-color-base-neutral" text-color="neutral" />
    <ColorPalette name="Success" variable-name="onyx-color-base-success" text-color="success" />
    <ColorPalette name="Warning" variable-name="onyx-color-base-warning" text-color="warning" />
    <ColorPalette name="Danger" variable-name="onyx-color-base-danger" text-color="danger" />
    <ColorPalette name="Info" variable-name="onyx-color-base-info" text-color="info" />
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
