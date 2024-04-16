<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxTagProps } from "./types";

const props = withDefaults(defineProps<OnyxTagProps>(), {
  color: "primary",
});

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-tag', `onyx-tag--${props.color}`, densityClass]">
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="16px" />
    <span class="onyx-text onyx-truncation-ellipsis">{{ props.label }}</span>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers.scss";

.onyx-tag {
  @include density.compact {
    --onyx-tag-padding: 0 var(--onyx-spacing-3xs);
  }

  @include density.default {
    --onyx-tag-padding: var(--onyx-spacing-5xs) var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-tag-padding: var(--onyx-spacing-4xs) var(--onyx-spacing-xs);
  }

  @include layers.component() {
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-spacing-3xs);
    max-width: max-content;
    padding: var(--onyx-tag-padding);
    border-radius: var(--onyx-radius-sm);
    font-family: var(--onyx-font-family);

    color: var(--onyx-tag-color);
    border: var(--onyx-1px-in-rem) solid var(--onyx-tag-border-color);
    background-color: var(--onyx-tag-background-color);

    &--primary {
      --onyx-tag-background-color: var(--onyx-color-base-primary-200);
      --onyx-tag-border-color: var(--onyx-color-base-primary-500);
      --onyx-tag-color: var(--onyx-color-text-icons-primary-intense);
    }

    &--secondary {
      --onyx-tag-background-color: var(--onyx-color-base-secondary-200);
      --onyx-tag-border-color: var(--onyx-color-base-secondary-500);
      --onyx-tag-color: var(--onyx-color-text-icons-secondary-intense);
    }

    &--neutral {
      --onyx-tag-background-color: var(--onyx-color-base-neutral-200);
      --onyx-tag-border-color: var(--onyx-color-base-neutral-500);
      --onyx-tag-color: var(--onyx-color-text-icons-neutral-medium);
    }

    &--danger {
      --onyx-tag-background-color: var(--onyx-color-base-danger-200);
      --onyx-tag-border-color: var(--onyx-color-base-danger-600);
      --onyx-tag-color: var(--onyx-color-text-icons-danger-bold);
    }

    &--warning {
      --onyx-tag-background-color: var(--onyx-color-base-warning-200);
      --onyx-tag-border-color: var(--onyx-color-base-warning-600);
      --onyx-tag-color: var(--onyx-color-text-icons-warning-bold);
    }

    &--success {
      --onyx-tag-background-color: var(--onyx-color-base-success-200);
      --onyx-tag-border-color: var(--onyx-color-base-success-500);
      --onyx-tag-color: var(--onyx-color-text-icons-success-bold);
    }

    &--info {
      --onyx-tag-background-color: var(--onyx-color-base-info-200);
      --onyx-tag-border-color: var(--onyx-color-base-info-600);
      --onyx-tag-color: var(--onyx-color-text-icons-info-bold);
    }
  }
}
</style>
