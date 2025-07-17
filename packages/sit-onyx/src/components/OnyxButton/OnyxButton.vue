<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxRipple from "../OnyxRipple/OnyxRipple.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import ButtonOrLinkLayout from "./ButtonOrLinkLayout.vue";
import type { OnyxButtonProps } from "./types.js";

const props = withDefaults(defineProps<OnyxButtonProps>(), {
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  type: "button",
  color: "primary",
  mode: "default",
  skeleton: SKELETON_INJECTED_SYMBOL,
  iconPosition: "left",
});

const { densityClass } = useDensity(props);
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);

const ripple = useTemplateRef("rippleRef");
const rippleEvents = computed(() => ripple.value?.events ?? {});

const icon = computed(() => {
  return props.icon && !props.loading ? props.icon : undefined;
});
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
    <OnyxIcon v-if="icon && props.iconPosition === 'left'" class="onyx-button__icon" :icon="icon" />
    <OnyxLoadingIndicator v-if="props.loading" class="onyx-button__loading" />
    <span class="onyx-button__label onyx-truncation-ellipsis">{{ props.label }}</span>
    <OnyxIcon
      v-if="icon && props.iconPosition === 'right'"
      class="onyx-button__icon"
      :icon="icon"
    />
  </ButtonOrLinkLayout>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-button,
.onyx-button-skeleton {
  @include layers.component() {
    --onyx-button-padding-vertical: var(--onyx-density-xs);
    --onyx-button-padding-inline: var(--onyx-density-sm);
  }
}

.onyx-button {
  @include layers.component() {
    // list of all available button CSS variables
    --onyx-button-background-color: transparent;
    --onyx-button-background-color-hover: transparent;
    --onyx-button-background-color-disabled: transparent;
    --onyx-button-text-color: transparent;
    --onyx-button-text-color-hover: var(--onyx-button-text-color);
    --onyx-button-text-color-disabled: transparent;
    --onyx-button-border-color: transparent;
    --onyx-button-border-color-hover: var(--onyx-button-border-color);
    --onyx-button-border-color-disabled: transparent;
    --onyx-button-outline-color: var(--onyx-color-component-focus-primary);
    --onyx-button-border-width: var(--onyx-1px-in-rem);

    &--primary {
      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-component-cta-default);
        --onyx-button-background-color-hover: var(--onyx-color-component-cta-default-hover);
        --onyx-button-background-color-disabled: var(--onyx-color-base-primary-200);
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-button);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-neutral-inverted);
        --onyx-button-border-color: var(--onyx-button-background-color);
        --onyx-button-border-color-hover: var(--onyx-button-background-color-hover);
        --onyx-button-border-color-disabled: var(--onyx-button-background-color-disabled);
      }

      &.onyx-button--outline {
        --onyx-button-background-color-hover: var(--onyx-color-base-primary-100);
        --onyx-button-text-color: var(--onyx-color-text-icons-primary-intense);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-primary-soft);
        --onyx-button-border-color: var(--onyx-color-base-primary-400);
        --onyx-button-border-color-disabled: var(--onyx-color-base-primary-200);
      }

      &.onyx-button--plain {
        --onyx-button-background-color-hover: var(--onyx-color-base-primary-100);
        --onyx-button-text-color: var(--onyx-color-text-icons-primary-intense);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-primary-soft);
      }
    }

    &--neutral {
      --onyx-button-outline-color: var(--onyx-color-component-focus-neutral);

      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-base-background-blank);
        --onyx-button-background-color-hover: var(--onyx-color-base-neutral-200);
        --onyx-button-background-color-disabled: var(--onyx-color-base-background-blank);
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-intense);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-neutral-soft);
        --onyx-button-border-color: var(--onyx-color-base-neutral-400);
        --onyx-button-border-color-disabled: var(--onyx-color-base-neutral-200);
      }

      &.onyx-button--outline {
        --onyx-button-background-color-hover: var(--onyx-color-base-neutral-200);
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-intense);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-neutral-soft);
        --onyx-button-border-color: var(--onyx-color-base-neutral-400);
        --onyx-button-border-color-disabled: var(--onyx-color-base-neutral-200);
      }

      &.onyx-button--plain {
        --onyx-button-background-color-hover: var(--onyx-color-base-neutral-200);
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-intense);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    &--danger {
      --onyx-button-outline-color: var(--onyx-color-component-focus-danger);

      &.onyx-button--default {
        --onyx-button-background-color: var(--onyx-color-base-danger-200);
        --onyx-button-background-color-hover: var(--onyx-color-base-danger-100);
        --onyx-button-background-color-disabled: var(--onyx-color-base-danger-100);
        --onyx-button-text-color: var(--onyx-color-text-icons-danger-bold);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-danger-medium);
        --onyx-button-border-color: var(--onyx-color-base-danger-500);
        --onyx-button-border-color-disabled: var(--onyx-color-base-danger-200);
      }

      &.onyx-button--outline {
        --onyx-button-background-color-hover: var(--onyx-color-base-danger-100);
        --onyx-button-text-color: var(--onyx-color-text-icons-danger-intense);
        --onyx-button-text-color-hover: var(--onyx-color-text-icons-danger-bold);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-danger-medium);
        --onyx-button-border-color: var(--onyx-color-base-danger-500);
        --onyx-button-border-color-disabled: var(--onyx-color-base-danger-200);
      }

      &.onyx-button--plain {
        --onyx-button-background-color-hover: var(--onyx-color-base-danger-100);
        --onyx-button-text-color: var(--onyx-color-text-icons-danger-intense);
        --onyx-button-text-color-disabled: var(--onyx-color-text-icons-danger-medium);
      }
    }
  }

  @include layers.component() {
    position: relative;
    display: inline-flex;
    max-width: 100%;
    width: max-content;
    padding: calc(var(--onyx-button-padding-vertical) - var(--onyx-button-border-width))
      var(--onyx-button-padding-inline);
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

    &:enabled,
    &:is(a) {
      &:hover:not(:has(.onyx-ripple__element)) {
        background-color: var(--onyx-button-background-color-hover);
        border-color: var(--onyx-button-border-color-hover);
        color: var(--onyx-button-text-color-hover);
      }
    }

    &:disabled {
      cursor: default;

      &:not(.onyx-button--loading) {
        background-color: var(--onyx-button-background-color-disabled);
        border-color: var(--onyx-button-border-color-disabled);
        color: var(--onyx-button-text-color-disabled);
      }
    }

    &__label {
      padding-inline: var(--onyx-density-2xs);
      font-size: var(--onyx-font-size-md);
      font-style: normal;
      font-weight: var(--onyx-font-weight-semibold);
      line-height: var(--onyx-font-line-height-md);
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
    --onyx-ripple-color: var(--onyx-button-background-color-hover);
  }
}
</style>
