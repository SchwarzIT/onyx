<script lang="ts" setup>
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import ButtonOrLinkLayout from "../OnyxButton/ButtonOrLinkLayout.vue";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxSystemButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxSystemButtonProps>(), {
  disabled: FORM_INJECTED_SYMBOL,
  autofocus: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  color: "intense",
});

const skeleton = useSkeletonContext(props);
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="['onyx-system-button-skeleton', props.icon ? '' : 'onyx-system-button-skeleton--text']"
  />

  <ButtonOrLinkLayout
    v-else
    v-bind="props"
    type="button"
    :class="['onyx-system-button', 'onyx-text--small', `onyx-system-button--${props.color}`]"
    :aria-label="props.label"
    :title="props.label"
  >
    <OnyxIcon v-if="props.icon" :icon="props.icon" />
    <template v-else>{{ props.label }}</template>
  </ButtonOrLinkLayout>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-system-button,
.onyx-system-button-skeleton {
  @include layers.component() {
    --height: 1.5rem;
  }
}

.onyx-system-button-skeleton {
  @include layers.component() {
    height: var(--height);
    width: var(--height);
    max-width: 100%;

    &--text {
      width: var(--onyx-spacing-4xl);
    }
  }
}

.onyx-system-button {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--color);
    background-color: var(--background-color);
    border-radius: var(--onyx-radius-sm);
    border: none;
    padding: 0;
    height: var(--height);
    min-width: var(--height);
    max-width: 100%;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:enabled,
    &:is(a) {
      cursor: pointer;

      &:hover,
      &:focus-visible {
        --background-color: var(--hover-background-color);
        --color: var(--hover-focus-color);
      }

      &:focus-visible {
        --background-color: var(--focus-active-background-color);
        --color: var(--hover-focus-color);
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }

      &:active {
        --background-color: var(--focus-active-background-color);
        --color: var(--active-color);
      }
    }

    .onyx-icon {
      --icon-size: 1.125rem;
    }

    $is_text_button: "&:not(:has(.onyx-icon))";

    #{$is_text_button} {
      padding: var(--onyx-spacing-5xs) var(--onyx-spacing-2xs);
    }

    &--intense {
      --color: var(--onyx-color-text-icons-neutral-medium);
      --hover-focus-color: var(--onyx-color-text-icons-neutral-intense);
      --active-color: var(--onyx-color-text-icons-primary-bold);

      --background-color: transparent;
      --hover-background-color: var(--onyx-color-base-neutral-300);
      --focus-active-background-color: var(--onyx-color-base-neutral-300);

      #{$is_text_button} {
        --color: var(--onyx-color-text-icons-neutral-intense);
        --hover-focus-color: var(--onyx-color-text-icons-neutral-intense);
        --active-color: var(--onyx-color-text-icons-primary-bold);

        --background-color: var(--onyx-color-base-neutral-300);
        --hover-background-color: var(--onyx-color-base-neutral-200);
        --focus-active-background-color: var(--onyx-color-base-neutral-200);
      }
    }

    &--soft {
      --color: var(--onyx-color-text-icons-neutral-medium);
      --hover-focus-color: var(--onyx-color-text-icons-neutral-intense);
      --active-color: var(--onyx-color-text-icons-primary-intense);

      --background-color: transparent;
      --hover-background-color: var(--onyx-color-base-background-blank);
      --focus-active-background-color: var(--onyx-color-base-background-blank);

      #{$is_text_button} {
        --color: var(--onyx-color-text-icons-neutral-intense);
        --hover-focus-color: var(--onyx-color-text-icons-neutral-intense);
        --active-color: var(--onyx-color-text-icons-primary-intense);

        --background-color: transparent;
        --hover-background-color: var(--onyx-color-base-background-blank);
        --focus-active-background-color: var(--onyx-color-base-background-blank);
      }
    }

    &--medium {
      --color: var(--onyx-color-text-icons-neutral-medium);
      --hover-focus-color: var(--onyx-color-text-icons-neutral-intense);
      --active-color: var(--onyx-color-text-icons-primary-intense);

      --background-color: transparent;
      --hover-background-color: var(--onyx-color-base-neutral-200);
      --focus-active-background-color: var(--onyx-color-base-neutral-200);

      #{$is_text_button} {
        --color: var(--onyx-color-text-icons-neutral-intense);
        --hover-focus-color: var(--onyx-color-text-icons-neutral-intense);
        --active-color: var(--onyx-color-text-icons-primary-bold);

        --background-color: var(--onyx-color-base-neutral-200);
        --hover-background-color: var(--onyx-color-base-neutral-300);
        --focus-active-background-color: var(--onyx-color-base-neutral-200);
      }
    }

    &:disabled {
      --background-color: transparent;
      --color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
