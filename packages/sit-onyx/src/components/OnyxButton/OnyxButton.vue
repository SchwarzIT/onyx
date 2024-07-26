<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxRipple from "../OnyxRipple/OnyxRipple.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxButtonProps>(), {
  disabled: false,
  loading: false,
  type: "button",
  color: "primary",
  mode: "default",
  skeleton: false,
  rippleAnimation: true,
});

const { densityClass } = useDensity(props);

const emit = defineEmits<{
  /**
   * Emitted when the button is clicked (and is not disabled).
   */
  click: [];
}>();
</script>

<template>
  <OnyxSkeleton v-if="props.skeleton" :class="['onyx-button-skeleton', densityClass]" />
  <button
    v-else
    :class="[
      'onyx-button',
      `onyx-button--${props.color}`,
      `onyx-button--${props.mode}`,
      props.rippleAnimation ? `onyx-button--ripple-animation` : undefined,
      { 'onyx-button--loading': props.loading },
      densityClass,
    ]"
    :disabled="props.disabled || props.loading"
    :type="props.type"
    :aria-label="props.loading ? props.label : undefined"
    :autofocus="props.autofocus"
    @click="emit('click')"
  >
    <OnyxIcon v-if="props.icon && !props.loading" class="onyx-button__icon" :icon="props.icon" />
    <OnyxLoadingIndicator v-if="props.loading" class="onyx-button__loading" />
    <span class="onyx-button__label onyx-truncation-ellipsis">{{ props.label }}</span>
    <OnyxRipple v-if="rippleAnimation" />
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-button,
.onyx-button-skeleton {
  --onyx-button-padding-vertical: var(--onyx-density-xs);
}

.onyx-button {
  @include layers.component() {
    --onyx-button-background-color: transparent;
    --onyx-button-background-hover-color: var(--onyx-color-base-primary-100);
    --onyx-button-border-color: transparent;
    --onyx-button-text-color: var(--onyx-color-text-icons-primary-intense);
    --onyx-button-outline-color: var(--onyx-color-base-primary-200);
    --onyx-button-border-width: var(--onyx-1px-in-rem);
    --onyx-ripple-color: var(--onyx-color-base-primary-600);

    position: relative;
    display: inline-flex;
    max-width: 100%;
    width: max-content;
    padding: calc(var(--onyx-button-padding-vertical) - var(--onyx-button-border-width))
      var(--onyx-density-sm);
    justify-content: center;
    align-items: center;
    gap: var(--onyx-density-2xs);
    border-radius: var(--onyx-radius-sm);
    cursor: pointer;
    font-family: var(--onyx-font-family);
    background-color: var(--onyx-button-background-color);
    border: var(--onyx-button-border-width) solid var(--onyx-button-border-color);
    color: var(--onyx-button-text-color);

    &--primary {
      &:disabled:not(.onyx-button--loading) {
        --onyx-button-text-color: var(--onyx-color-text-icons-primary-soft);
      }

      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-base-primary-500);
        --onyx-button-background-hover-color: var(--onyx-color-base-primary-400);
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-inverted);
        --onyx-button-border-color: var(--onyx-color-base-primary-500);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-background-color: var(--onyx-color-base-primary-200);
          --onyx-button-border-color: var(--onyx-color-base-primary-200);
          --onyx-button-text-color: var(--onyx-color-text-icons-neutral-inverted);
        }
      }

      &.onyx-button--outline {
        --onyx-button-border-color: var(--onyx-color-base-primary-500);
        --onyx-ripple-color: var(--onyx-color-base-primary-200);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-border-color: var(--onyx-color-base-primary-200);
        }
      }

      &.onyx-button--plain {
        --onyx-ripple-color: var(--onyx-color-base-primary-200);
      }
    }

    &--neutral {
      --onyx-button-background-hover-color: var(--onyx-color-base-neutral-200);
      --onyx-button-outline-color: var(--onyx-color-base-neutral-300);
      --onyx-button-text-color: var(--onyx-color-text-icons-neutral-intense);
      --onyx-ripple-color: var(--onyx-color-base-neutral-300);

      &:disabled:not(.onyx-button--loading) {
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-soft);
      }

      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-base-background-blank);
        --onyx-button-background-hover-color: var(--onyx-color-base-neutral-200);
        --onyx-button-border-color: var(--onyx-color-base-neutral-400);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-background-color: var(--onyx-color-base-background-blank);
          --onyx-button-border-color: var(--onyx-color-base-neutral-200);
        }
      }

      &.onyx-button--outline {
        --onyx-button-border-color: var(--onyx-color-base-neutral-400);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-border-color: var(--onyx-color-base-neutral-200);
        }
      }
    }

    &--danger {
      --onyx-button-background-hover-color: var(--onyx-color-base-danger-200);
      --onyx-button-outline-color: var(--onyx-color-base-danger-300);
      --onyx-button-text-color: var(--onyx-color-text-icons-danger-intense);
      --onyx-ripple-color: var(--onyx-color-base-danger-300);

      &:disabled:not(.onyx-button--loading) {
        --onyx-button-text-color: var(--onyx-color-text-icons-danger-medium);
      }

      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-base-danger-200);
        --onyx-button-background-hover-color: var(--onyx-color-base-danger-100);
        --onyx-button-border-color: var(--onyx-color-base-danger-500);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-background-color: var(--onyx-color-base-danger-100);
          --onyx-button-border-color: var(--onyx-color-base-danger-200);
        }
      }

      &.onyx-button--outline {
        --onyx-button-border-color: var(--onyx-color-base-danger-500);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-border-color: var(--onyx-color-base-danger-200);
        }
      }
    }

    &:hover:enabled:not(:active) {
      --onyx-button-background-color: var(--onyx-button-background-hover-color);
    }

    &:focus-visible {
      outline: 0.25rem solid var(--onyx-button-outline-color);
    }

    &:disabled {
      cursor: default;
    }

    &__label {
      padding-inline: var(--onyx-density-2xs);
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem;
    }

    $p: &;

    &--ripple-animation {
      &:hover:enabled {
        --onyx-button-background-color: var(--onyx-button-background-hover-color);
      }
      #{$p}__label,
      #{$p}__icon {
        position: relative;
        z-index: 1;
        pointer-events: none;
      }
      #{$p}__loading {
        pointer-events: none;
        z-index: 1;
      }
    }

    &--loading &__label {
      visibility: hidden;
    }

    &__loading {
      position: absolute;
    }
  }

  &-skeleton {
    width: var(--onyx-density-4xl);
    height: calc(1.5rem + 2 * var(--onyx-button-padding-vertical));
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
