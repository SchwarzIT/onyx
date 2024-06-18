<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxIconButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxIconButtonProps>(), {
  disabled: false,
  type: "button",
  color: "primary",
  skeleton: false,
});

const { densityClass } = useDensity(props);

defineSlots<{
  /** Slot for an custom icon. Will have no effect if property `icon` is passed. */
  default(): unknown;
}>();

const emit = defineEmits<{
  /** Emitted when the button is clicked (and is not disabled). */
  click: [];
}>();
</script>

<template>
  <OnyxSkeleton v-if="props.skeleton" :class="['onyx-icon-button-skeleton', densityClass]" />

  <button
    v-else
    class="onyx-icon-button"
    :aria-label="props.label"
    :title="props.label"
    :class="[
      `onyx-icon-button--${props.color}`,
      { 'onyx-icon-button--loading': props.loading },
      densityClass,
    ]"
    :disabled="props.disabled || props.loading"
    :autofocus="props.autofocus"
    @click="emit('click')"
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
  @include density.compact {
    --onyx-icon-button-padding: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-icon-button-padding: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-icon-button-padding: var(--onyx-spacing-sm);
  }
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
      padding: var(--onyx-spacing-2xs);
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
