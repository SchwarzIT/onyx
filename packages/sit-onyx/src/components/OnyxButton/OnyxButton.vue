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
    :class="{
      [`onyx-button--${props.color}`]: true,
      [`onyx-button--${props.variant}--${props.color}`]: true,
    }"
  >
    <button :disabled="props.isDisabled" class="onyx-button__element" @click="emit('click')">
      <span class="onyx-button__element__label">{{ props.label }}</span>
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
  --background-hover-color: var(--onyx-color-base-primary-100, #edf4fa);
  --background-disabled-color: transparent;

  --color: var(--onyx-color-text-icons-primary-intense, #0079ce);
  --disabled-color: var(--onyx-color-text-icons-neutral-inverted, #fff);
  --border-color: transparent;
  --disabled-border-color: transparent;
  --focus-outline-color: var(--onyx-color-base-primary-200, #bfddf3);

  &--secondary {
    --background-hover-color: var(--onyx-color-base-neutral-200, #eaedf0);
    --focus-outline-color: var(--onyx-color-base-neutral-300, #d8dde1);
    --color: var(--onyx-color-text-icons-neutral-intense, #52626d);
    --disabled-color: var(--onyx-color-text-icons-primary-soft, #bfddf3);
  }

  &--danger {
    --background-hover-color: var(--onyx-color-base-danger-200, #f1d3d2);
    --focus-outline-color: var(--onyx-color-base-danger-300, #e6a7a6);
    --color: var(--onyx-color-text-icons-danger-intense, #d1332f);
    --disabled-color: var(--onyx-color-text-icons-danger-medium, #e6a7a6);
  }

  &--default--primary {
    --background-color: var(--onyx-color-base-primary-500, #0079ce);
    --background-hover-color: var(--onyx-color-base-primary-400, #3b98d9);
    --background-disabled-color: var(--onyx-color-base-primary-200, #bfddf3);
    --color: var(--onyx-color-text-icons-neutral-inverted, #fff);
    --disabled-color: var(--onyx-color-text-icons-neutral-inverted, #fff);
    --border-color: var(--onyx-color-base-primary-500, #0079ce);
    --disabled-border-color: var(--onyx-color-base-primary-200, #bfddf3);
  }

  &--default--secondary {
    --background-color: var(--onyx-color-base-background-blank, #fff);
    --background-hover-color: var(--onyx-color-base-neutral-200, #eaedf0);
    --background-disabled-color: var(--onyx-color-base-background-blank, #fff);
    --border-color: var(--onyx-color-base-neutral-400, #b7bfc5);
    --disabled-border-color: var(--onyx-color-base-neutral-200, #eaedf0);
  }

  &--default--danger {
    --background-color: var(--onyx-color-base-danger-200, #f1d3d2);
    --background-hover-color: var(--onyx-color-base-danger-100, #fbefee);
    --background-disabled-color: var(--onyx-color-base-danger-100, #fbefee);
    --border-color: var(--onyx-color-base-danger-500, #d1332f);
    --disabled-border-color: var(--onyx-color-base-danger-200, #f1d3d2);
  }

  &--outline--primary {
    --border-color: var(--onyx-color-base-primary-500, #0079ce);
    --disabled-border-color: var(--onyx-color-base-primary-200, #bfddf3);
  }

  &--outline--secondary {
    --border-color: var(--onyx-color-base-neutral-400, #b7bfc5);
    --disabled-border-color: var(--onyx-color-base-neutral-200, #eaedf0);
  }

  &--outline--danger {
    --border-color: var(--onyx-color-base-danger-500, #d1332f);
    --disabled-border-color: var(--onyx-color-base-danger-200, #f1d3d2);
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

    .onyx-button__element__label {
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

    &__label {
      display: flex;
      padding: 0rem var(--onyx-spacing-4xs, 0.25rem);
      justify-content: center;
      align-items: center;
      gap: 0.625rem;
      max-width: 12.25rem;
      color: var(--color);
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
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
