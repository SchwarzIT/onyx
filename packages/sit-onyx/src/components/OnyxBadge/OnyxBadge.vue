<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxBadgeProps } from "./types";

const props = withDefaults(defineProps<OnyxBadgeProps>(), {
  color: "primary",
  dot: false,
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
      `onyx-badge--${props.color}`,
      props.dot ? 'onyx-badge--dot' : '',
      densityClass,
    ]"
  >
    <template v-if="!props.dot">
      <OnyxIcon
        v-if="props.icon"
        class="onyx-badge__icon"
        :icon="props.icon"
        :size="props.density === 'cozy' ? '24px' : '16px'"
      />
      <slot v-else></slot>
    </template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-badge {
  @include layers.component() {
    --onyx-badge-background-color: var(--onyx-color-base-primary-500);

    display: inline-block;
    max-width: 100%;
    padding: var(--onyx-density-3xs) var(--onyx-density-sm);
    border-radius: var(--onyx-radius-full);
    background-color: var(--onyx-badge-background-color);
    color: var(--onyx-color-text-icons-neutral-inverted);
    font-family: var(--onyx-font-family);
    font-style: normal;

    &:has(&__icon) {
      padding: var(--onyx-density-3xs);
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

    &--dot {
      height: max-content;
      width: max-content;
      padding: var(--onyx-density-2xs);
    }
  }
}
</style>
