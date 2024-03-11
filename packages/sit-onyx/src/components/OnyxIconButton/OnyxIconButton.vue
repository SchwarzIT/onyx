<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxIconButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxIconButtonProps>(), {
  disabled: false,
  type: "button",
  variation: "primary",
});

defineSlots<{
  /** Slot for an custom icon. Property `icon` will have no effect if custom content is passed. */
  default(props: Record<string, never>): unknown;
}>();

const emit = defineEmits<{
  /** Emitted when the button is clicked (and is not disabled). */
  click: [];
}>();
</script>

<template>
  <button
    class="onyx-icon-button"
    :aria-label="props.label"
    :class="{
      [`onyx-icon-button--${props.variation}`]: true,
      'onyx-icon-button--loading': props.loading,
    }"
    :disabled="props.disabled || props.loading"
    @click="emit('click')"
  >
    <OnyxLoadingIndicator v-if="props.loading" type="circle" />
    <OnyxIcon v-else-if="props.icon" :icon="props.icon" size="24px" />
    <slot v-else></slot>
  </button>
</template>

<style lang="scss">
.onyx-icon-button {
  --icon-button-color: var(--onyx-color-text-icons-primary-intense);
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

  &--secondary {
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
</style>
