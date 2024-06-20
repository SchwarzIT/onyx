<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxButtonProps>(), {
  disabled: false,
  loading: false,
  type: "button",
  color: "primary",
  mode: "default",
  skeleton: false,
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
      { 'onyx-button--loading': props.loading },
      densityClass,
    ]"
    :disabled="props.disabled || props.loading"
    :type="props.type"
    :aria-label="props.loading ? props.label : undefined"
    :autofocus="props.autofocus"
    @click="emit('click')"
  >
    <OnyxIcon v-if="props.icon && !props.loading" :icon="props.icon" />
    <OnyxLoadingIndicator v-if="props.loading" class="onyx-button__loading" />
    <span v-else class="onyx-button__label onyx-truncation-ellipsis">{{ props.label }}</span>
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";

.onyx-button,
.onyx-button-skeleton {
  @include density.compact {
    --onyx-button-height: 2rem;
    --onyx-button-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-button-height: 2.5rem;
    --onyx-button-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-button-height: 3rem;
    --onyx-button-padding-vertical: var(--onyx-spacing-sm);
  }
}

.onyx-button {
  @include layers.component() {
    --onyx-button-background-color: transparent;
    --onyx-button-background-hover-color: var(--onyx-color-base-primary-100);
    --onyx-button-border-color: transparent;
    --onyx-button-text-color: var(--onyx-color-text-icons-primary-intense);
    --onyx-button-outline-color: var(--onyx-color-base-primary-200);

    display: inline-flex;
    height: var(--onyx-button-height);
    max-width: 100%;
    width: max-content;
    padding: var(--onyx-button-padding-vertical) var(--onyx-spacing-sm);
    justify-content: center;
    align-items: center;
    gap: var(--onyx-spacing-4xs);
    border-radius: var(--onyx-radius-sm);
    cursor: pointer;
    font-family: var(--onyx-font-family);
    background-color: var(--onyx-button-background-color);
    border: var(--onyx-1px-in-rem) solid var(--onyx-button-border-color);
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

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-border-color: var(--onyx-color-base-primary-200);
        }
      }
    }

    &--neutral {
      --onyx-button-background-hover-color: var(--onyx-color-base-neutral-200);
      --onyx-button-outline-color: var(--onyx-color-base-neutral-300);
      --onyx-button-text-color: var(--onyx-color-text-icons-neutral-intense);

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
      padding: 0 var(--onyx-spacing-4xs);
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem;
    }

    &__loading {
      width: var(--onyx-spacing-3xl);
      height: 100%;
    }
  }

  &-skeleton {
    width: var(--onyx-spacing-4xl);
    height: var(--onyx-button-height);
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
