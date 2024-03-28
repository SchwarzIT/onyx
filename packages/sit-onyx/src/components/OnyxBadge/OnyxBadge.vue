<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import type { OnyxBadgeProps } from "./types";

const props = withDefaults(defineProps<OnyxBadgeProps>(), {
  variation: "primary",
});

const { densityClass } = useDensity(props);

defineSlots<{
  /**
   * Badge content.
   */
  default(props: Record<string, never>): unknown;
}>();
</script>

<template>
  <div class="onyx-badge" :class="[`onyx-badge--${props.variation}`, densityClass]">
    <div class="onyx-badge--content onyx-truncation-ellipsis">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/density.scss";

.onyx-badge {
  @include density.compact {
    --onyx-badge-padding: 0 var(--onyx-spacing-2xs);
    --onyx-badge-gap: var(--onyx-spacing-4xs);
    --onyx-badge-height: 1.5rem;
  }

  @include density.default {
    --onyx-badge-padding: var(--onyx-spacing-5xs) var(--onyx-spacing-sm);
    --onyx-badge-gap: var(--onyx-spacing-2xs);
    --onyx-badge-height: 1.75rem;
  }

  @include density.cozy {
    --onyx-badge-padding: var(--onyx-spacing-4xs) var(--onyx-spacing-sm);
    --onyx-badge-gap: var(--onyx-spacing-sm);
    --onyx-badge-height: 2rem;
  }

  --onyx-badge-background-color: var(--onyx-color-base-primary-500);

  display: inline-flex;
  height: var(--onyx-badge-height);
  max-width: 100%;
  box-sizing: border-box;
  padding: var(--onyx-badge-padding);
  justify-content: center;
  align-items: center;
  gap: var(--onyx-badge-gap);
  border-radius: var(--onyx-radius-full);
  background-color: var(--onyx-badge-background-color);

  &--secondary {
    --onyx-badge-background-color: var(--onyx-color-base-neutral-700);
  }

  &--danger {
    --onyx-badge-background-color: var(--onyx-color-base-danger-500);
  }

  &--warning {
    --onyx-badge-background-color: var(--onyx-color-base-warning-500);
  }

  &--success {
    --onyx-badge-background-color: var(--onyx-color-base-success-500);
  }

  &--info {
    --onyx-badge-background-color: var(--onyx-color-base-info-500);
  }

  &--content {
    max-width: 6rem;
    overflow: hidden;
    color: var(--onyx-color-text-icons-neutral-inverted);
    font-family: var(--onyx-font-family);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
    height: 1.5rem;
  }
}
</style>
