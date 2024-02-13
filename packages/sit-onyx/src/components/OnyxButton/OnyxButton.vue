<script lang="ts" setup>
import type { ButtonProps } from "./types";
const props = withDefaults(defineProps<ButtonProps>(), {
  label: "",
  isLoading: false,
  isDisabled: false,
  type: "button",
  color: "primary",
  variant: "default",
});

const emit = defineEmits<{
  /**
   * Emitted when the button is clicked
   */
  click: [];
}>();
</script>

<template>
  <div
    tabindex="0"
    class="onyx-button"
    :class="[`onyx-button--${props.color}`, `onyx-button--${props.variant}`]"
  >
    <button :disabled="props.isDisabled" class="onyx-button__element" @click="emit('click')">
      <span class="onyx-button__label">{{ props.label }}</span>
    </button>
  </div>
</template>

<style lang="scss">
.onyx-button {
  display: inline-flex;
  padding: var(--onyx-spacing-2xs, 0.5rem) var(--onyx-spacing-sm, 0.75rem);
  justify-content: center;
  align-items: center;
  gap: var(--onyx-spacing-4xs, 0.25rem);
  border-radius: var(--onyx-radius-sm, 0.25rem);

  --background-color: transparent;
  --background-hover-color: var(--onyx-color-base-primary-100);
  --background-disabled-color: transparent;

  --color: var(--onyx-color-text-primary-intense);
  --disabled-color: var(--onyx-color-text-neutral-inverted);
  --border-color: transparent;
  --disabled-border-color: transparent;
  --focus-outline-color: var(--onyx-color-base-primary-200);

  &--secondary {
    --background-hover-color: var(--onyx-color-base-neutral-200);
    --focus-outline-color: var(--onyx-color-base-neutral-300);
    --color: var(--onyx-color-text-neutral-intense);
    --disabled-color: var(--onyx-color-text-primary-soft);
  }

  &--danger {
    --background-hover-color: var(--onyx-color-base-danger-200);
    --focus-outline-color: var(--onyx-color-base-danger-300);
    --color: var(--onyx-color-text-danger-intense);
    --disabled-color: var(--onyx-color-text-danger-medium);
  }

  &--primary.onyx-button--default {
    --background-color: var(--onyx-color-base-primary-500);
    --background-hover-color: var(--onyx-color-base-primary-400);
    --background-disabled-color: var(--onyx-color-base-primary-200);
    --color: var(--onyx-color-text-neutral-inverted);
    --disabled-color: var(--onyx-color-text-neutral-inverted);
    --border-color: var(--onyx-color-base-primary-500);
    --disabled-border-color: var(--onyx-color-base-primary-200);
  }

  &--secondary.onyx-button--default {
    --background-color: var(--onyx-color-base-background-blank);
    --background-hover-color: var(--onyx-color-base-neutral-200);
    --background-disabled-color: var(--onyx-color-base-background-blank);
    --border-color: var(--onyx-color-base-neutral-400);
    --disabled-border-color: var(--onyx-color-base-neutral-200);
  }

  &--danger.onyx-button--default {
    --background-color: var(--onyx-color-base-danger-200);
    --background-hover-color: var(--onyx-color-base-danger-100);
    --background-disabled-color: var(--onyx-color-base-danger-100);
    --border-color: var(--onyx-color-base-danger-500);
    --disabled-border-color: var(--onyx-color-base-danger-200);
  }

  &--primary.onyx-button--outline {
    --border-color: var(--onyx-color-base-primary-500);
    --disabled-border-color: var(--onyx-color-base-primary-200);
  }

  &--secondary.onyx-button--outline {
    --border-color: var(--onyx-color-base-neutral-400);
    --disabled-border-color: var(--onyx-color-base-neutral-200);
  }

  &--danger.onyx-button--outline {
    --border-color: var(--onyx-color-base-danger-500);
    --disabled-border-color: var(--onyx-color-base-danger-200);
  }

  background-color: var(--background-color);
  border: 0.063rem solid var(--border-color);

  &:hover {
    background: var(--background-hover-color);
  }

  &:focus-visible {
    outline: 0.25rem solid var(--focus-outline-color);
  }

  &:has(&__element:disabled) {
    cursor: none;
    pointer-events: none;
    background-color: var(--background-disabled-color);
    border-color: var(--disabled-border-color);

    .onyx-button__label {
      color: var(--disabled-color);
    }
  }

  &__element {
    position: relative;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    background: transparent;

    &:focus-visible {
      outline: none;
    }

    .onyx-button__label {
      display: flex;
      padding: 0 var(--onyx-spacing-4xs);
      max-width: 12.25rem;
      color: var(--color);
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem;
    }
  }
}
</style>
