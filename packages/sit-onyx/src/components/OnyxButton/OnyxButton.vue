<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxRipple from "../OnyxRipple/OnyxRipple.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import ButtonOrLinkLayout from "./ButtonOrLinkLayout.vue";
import type { OnyxButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxButtonProps>(), {
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  type: "button",
  color: "primary",
  mode: "default",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);

const ripple = useTemplateRef("rippleRef");
const rippleEvents = computed(() => ripple.value?.events ?? {});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-button-skeleton', densityClass]" />
  <ButtonOrLinkLayout
    v-else
    v-bind="props"
    :class="[
      'onyx-component',
      'onyx-button',
      `onyx-button--${props.color}`,
      `onyx-button--${props.mode}`,
      { 'onyx-button--loading': props.loading },
      densityClass,
    ]"
    :aria-label="props.loading ? props.label : undefined"
    v-on="rippleEvents"
  >
    <OnyxRipple v-if="!disabled && !props.loading" ref="rippleRef" />
    <OnyxIcon v-if="props.icon && !props.loading" class="onyx-button__icon" :icon="props.icon" />
    <OnyxLoadingIndicator v-if="props.loading" class="onyx-button__loading" />
    <span class="onyx-button__label onyx-truncation-ellipsis">{{ props.label }}</span>
  </ButtonOrLinkLayout>
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
    --onyx-button-outline-color: var(--onyx-color-component-focus-primary);
    --onyx-button-border-width: var(--onyx-1px-in-rem);

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

    &:focus-visible {
      outline: var(--onyx-outline-width) solid var(--onyx-button-outline-color);
    }

    &--primary {
      &:disabled:not(.onyx-button--loading) {
        --onyx-button-text-color: var(--onyx-color-text-icons-primary-soft);
      }

      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-component-cta-default);
        --onyx-button-background-hover-color: var(--onyx-color-component-cta-default-hover);
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-button);
        --onyx-button-border-color: var(--onyx-button-background-color);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-background-color: var(--onyx-color-base-primary-200);
          --onyx-button-text-color: var(--onyx-color-text-icons-neutral-inverted);
        }
      }

      &.onyx-button--outline {
        --onyx-button-border-color: var(--onyx-color-base-primary-400);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-border-color: var(--onyx-color-base-primary-200);
        }
      }
    }

    &--neutral {
      --onyx-button-background-hover-color: var(--onyx-color-base-neutral-200);
      --onyx-button-outline-color: var(--onyx-color-component-focus-neutral);
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
      --onyx-button-background-hover-color: var(--onyx-color-base-danger-100);
      --onyx-button-outline-color: var(--onyx-color-component-focus-danger);
      --onyx-button-text-color: var(--onyx-color-text-icons-danger-bold);

      &:disabled:not(.onyx-button--loading) {
        --onyx-button-text-color: var(--onyx-color-text-icons-danger-medium);
      }

      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-base-danger-200);
        --onyx-button-border-color: var(--onyx-color-base-danger-500);

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-background-color: var(--onyx-color-base-danger-100);
          --onyx-button-border-color: var(--onyx-color-base-danger-200);
        }
      }

      &.onyx-button--outline {
        --onyx-button-border-color: var(--onyx-color-base-danger-500);

        &:enabled,
        &:is(a) {
          --onyx-button-text-color: var(--onyx-color-text-icons-danger-intense);

          &:hover {
            --onyx-button-text-color: var(--onyx-color-text-icons-danger-bold);
          }
        }

        &:disabled:not(.onyx-button--loading) {
          --onyx-button-border-color: var(--onyx-color-base-danger-200);
        }
      }

      &.onyx-button--plain {
        &:enabled,
        &:is(a) {
          --onyx-button-text-color: var(--onyx-color-text-icons-danger-intense);

          &:hover {
            --onyx-button-text-color: var(--onyx-color-text-icons-danger-bold);
          }
        }
      }
    }

    &:enabled,
    &:is(a) {
      &:hover:not(:has(.onyx-ripple__element)) {
        --onyx-button-background-color: var(--onyx-button-background-hover-color);
      }
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
      position: relative;
    }

    &__icon {
      position: relative;
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

  .onyx-ripple {
    --onyx-ripple-color: var(--onyx-button-background-hover-color);
  }
}
</style>
