<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxIconButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxIconButtonProps>(), {
  disabled: FORM_INJECTED_SYMBOL,
  type: "button",
  color: "primary",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);

defineSlots<{
  /** Slot for an custom icon. Will have no effect if property `icon` is passed. */
  default(): unknown;
}>();
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-icon-button-skeleton', densityClass]" />

  <button
    v-else
    class="onyx-icon-button"
    :aria-label="props.label"
    :title="props.label"
    :type="props.type"
    :class="[
      `onyx-icon-button--${props.color}`,
      { 'onyx-icon-button--loading': props.loading },
      densityClass,
    ]"
    :disabled="disabled || props.loading"
    :autofocus="props.autofocus"
  >
    <OnyxLoadingIndicator v-if="props.loading" type="circle" />
    <OnyxIcon v-else-if="props.icon" :icon="props.icon" />
    <slot v-else></slot>
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/density.scss";

.onyx-icon-button,
.onyx-icon-button-skeleton {
  --onyx-icon-button-padding: var(--onyx-density-xs);
}

.onyx-icon-button-skeleton {
  // icon size + 2 * padding
  $size: calc(1.5rem + 2 * var(--onyx-icon-button-padding));
  height: $size;
  width: $size;
  border-radius: var(--onyx-radius-full);
}

.onyx-icon-button {
  @include layers.component {
    --icon-button-color: var(--onyx-color-text-icons-primary-intense);
    --icon-button-color: var(--onyx-color-text-icons-primary-intense);
    --icon-button-bg-color: transparent;
    --icon-button-cursor: pointer;

    display: inline-grid;
    place-items: center;
    padding: var(--onyx-icon-button-padding);
    color: var(--icon-button-color);
    cursor: var(--icon-button-cursor);

    outline: none;
    appearance: none;
    border: none;
    background: none;

    border-radius: var(--onyx-radius-full);
    background-color: var(--icon-button-bg-color);

    &:hover,
    &:focus-visible {
      --icon-button-bg-color: var(--onyx-color-base-primary-200);
    }

    &:disabled:not(&--loading) {
      --icon-button-color: var(--onyx-color-text-icons-primary-soft);
    }

    &:active {
      --icon-button-bg-color: var(--onyx-color-base-primary-300);
    }

    &--neutral {
      --icon-button-color: var(--onyx-color-text-icons-neutral-medium);

      &:hover,
      &:focus-visible {
        --icon-button-bg-color: var(--onyx-color-base-neutral-200);
      }

      &:disabled:not(&--loading) {
        --icon-button-color: var(--onyx-color-base-neutral-300);
      }

      &:active {
        --icon-button-bg-color: var(--onyx-color-base-neutral-300);
      }
    }

    &--danger {
      --icon-button-color: var(--onyx-color-text-icons-danger-intense);

      &:hover,
      &:focus-visible {
        --icon-button-bg-color: var(--onyx-color-base-danger-200);
      }

      &:disabled:not(&--loading) {
        --icon-button-color: var(--onyx-color-base-danger-300);
      }

      &:active {
        --icon-button-bg-color: var(--onyx-color-base-danger-300);
      }
    }

    &:disabled {
      --icon-button-bg-color: transparent;
      --icon-button-cursor: pointer;

      display: grid;
      place-items: center;
      color: var(--icon-button-color);
      cursor: var(--icon-button-cursor);

      outline: none;
      appearance: none;
      border: none;
      background: none;

      border-radius: var(--onyx-radius-full);
      background-color: var(--icon-button-bg-color);

      &:hover,
      &:focus-visible {
        --icon-button-bg-color: var(--onyx-color-base-primary-200);
      }

      &:disabled:not(&--loading) {
        --icon-button-color: var(--onyx-color-text-icons-primary-soft);
      }

      &:active {
        --icon-button-bg-color: var(--onyx-color-base-primary-300);
      }

      &--neutral {
        --icon-button-color: var(--onyx-color-text-icons-neutral-medium);

        &:hover,
        &:focus-visible {
          --icon-button-bg-color: var(--onyx-color-base-neutral-200);
        }

        &:disabled:not(&--loading) {
          --icon-button-color: var(--onyx-color-base-neutral-300);
        }

        &:active {
          --icon-button-bg-color: var(--onyx-color-base-neutral-300);
        }
      }

      &--danger {
        --icon-button-color: var(--onyx-color-text-icons-danger-intense);

        &:hover,
        &:focus-visible {
          --icon-button-bg-color: var(--onyx-color-base-danger-200);
        }

        &:disabled:not(&--loading) {
          --icon-button-color: var(--onyx-color-base-danger-300);
        }

        &:active {
          --icon-button-bg-color: var(--onyx-color-base-danger-300);
        }
      }

      &:disabled {
        --icon-button-bg-color: transparent;
        --icon-button-cursor: default;
      }
    }
  }
}
</style>
