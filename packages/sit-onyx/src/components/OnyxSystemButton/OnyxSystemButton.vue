<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxSystemButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxSystemButtonProps>(), {
  disabled: FORM_INJECTED_SYMBOL,
  autofocus: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="[
      'onyx-system-button-skeleton',
      densityClass,
      props.icon ? '' : 'onyx-system-button-skeleton--text',
    ]"
  />
  <button
    v-else
    :class="['onyx-system-button', 'onyx-text--small', densityClass]"
    :aria-label="props.label"
    type="button"
    :disabled="disabled"
    :autofocus="props.autofocus"
  >
    <OnyxIcon v-if="props.icon" :icon="props.icon" />
    <template v-else>{{ props.label }}</template>
  </button>
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
      width: var(--onyx-density-4xl);
    }
  }
}

.onyx-system-button {
  @include layers.component() {
    --background-color: transparent;
    --color: var(--onyx-color-text-icons-neutral-medium);

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

    &:enabled {
      cursor: pointer;

      &:hover,
      &:focus-visible {
        --background-color: var(--onyx-color-base-neutral-300);
        --color: var(--onyx-color-text-icons-neutral-intense);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }

      &:active {
        --background-color: var(--onyx-color-base-neutral-300);
        --color: var(--onyx-color-text-icons-primary-bold);
      }
    }

    .onyx-icon {
      --icon-size: 1.125rem;
    }

    &:not(:has(.onyx-icon)) {
      padding: var(--onyx-density-3xs) var(--onyx-density-xs);
      --background-color: var(--onyx-color-base-neutral-300);
      --color: var(--onyx-color-text-icons-neutral-intense);

      &:enabled {
        &:hover,
        &:focus-visible,
        &:active {
          --background-color: var(--onyx-color-base-neutral-200);
        }
      }
    }

    &:disabled {
      --background-color: transparent;
      --color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
