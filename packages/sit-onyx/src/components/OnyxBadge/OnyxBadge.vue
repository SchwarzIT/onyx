<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxBadgeProps } from "./types";

const props = withDefaults(defineProps<OnyxBadgeProps>(), {
  variation: "primary",
});

const { densityClass } = useDensity(props);

defineSlots<{
  /**
   * Badge content.
   */
  default?(): unknown;
}>();
</script>

<template>
  <div
    class="onyx-badge"
    :class="[
      'onyx-truncation-ellipsis',
      'onyx-text',
      `onyx-badge--${props.variation}`,
      densityClass,
    ]"
  >
    <OnyxIcon
      v-if="props.icon"
      class="onyx-badge__icon"
      :icon="props.icon"
      :size="props.density === 'cozy' ? '24px' : '16px'"
    />
    <slot v-else></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers.scss";

.onyx-badge {
  @include density.compact {
    --onyx-badge-padding: 0 var(--onyx-spacing-2xs);
    --onyx-badge-icon-padding: var(--onyx-spacing-4xs);
    --onyx-badge-gap: var(--onyx-spacing-4xs);
    --onyx-badge-height: 1.5rem;
  }

  @include density.default {
    --onyx-badge-padding: var(--onyx-spacing-5xs) var(--onyx-spacing-sm);
    --onyx-badge-icon-padding: var(--onyx-spacing-3xs);
    --onyx-badge-gap: var(--onyx-spacing-2xs);
    --onyx-badge-height: 1.75rem;
  }

  @include density.cozy {
    --onyx-badge-padding: var(--onyx-spacing-4xs) var(--onyx-spacing-sm);
    --onyx-badge-icon-padding: var(--onyx-spacing-4xs);
    --onyx-badge-gap: var(--onyx-spacing-sm);
    --onyx-badge-height: 2rem;
  }
}

.onyx-badge {
  @include layers.component() {
    --onyx-badge-background-color: var(--onyx-color-base-primary-500);

    display: inline-block;
    height: var(--onyx-badge-height);
    max-width: 100%;
    padding: var(--onyx-badge-padding);
    border-radius: var(--onyx-radius-full);
    background-color: var(--onyx-badge-background-color);
    color: var(--onyx-color-text-icons-neutral-inverted);
    font-family: var(--onyx-font-family);
    font-style: normal;

    &:has(&__icon) {
      padding: var(--onyx-badge-icon-padding);
    }

    &--secondary {
      --onyx-badge-background-color: var(--onyx-color-base-secondary-500);
    }

    &--neutral {
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

    &__icon {
      display: flex;
    }
  }
}
</style>
