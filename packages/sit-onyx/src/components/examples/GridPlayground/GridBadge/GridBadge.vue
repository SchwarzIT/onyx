<script lang="ts" setup>
import type { OnyxColor } from "../../../../types/index.js";
import OnyxBadge from "../../../OnyxBadge/OnyxBadge.vue";

const props = defineProps<{
  /**
   * Value shown on the badge itself.
   */
  value: string | number;
  /**
   * Label shown after the value.
   */
  label: string;
  /**
   * The badge color.
   */
  color: Extract<OnyxColor, "info" | "warning" | "danger">;
}>();
</script>

<template>
  <div class="grid-badge" :aria-label="props.label">
    <OnyxBadge :color="props.color">{{ props.value }}</OnyxBadge>
    <span>{{ props.label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.grid-badge {
  font-family: var(--onyx-font-family-mono);
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);

  .onyx-badge {
    font-family: inherit;

    $colors: info, warning, danger;

    @each $color in $colors {
      &--#{$color} {
        color: var(--onyx-color-text-icons-#{$color}-bold);
        --onyx-badge-background-color: var(--onyx-color-text-icons-#{$color}-soft);
      }
    }
  }
}
</style>
