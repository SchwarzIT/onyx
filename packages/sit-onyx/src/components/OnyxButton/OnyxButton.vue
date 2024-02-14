<script lang="ts" setup>
import type { ButtonProps } from "./types";
const props = withDefaults(defineProps<ButtonProps>(), {
  label: "",
  disabled: false,
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
  <button
    class="onyx-button"
    :class="[`onyx-button--${props.color}`, `onyx-button--${props.variant}`]"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <span class="onyx-button__label">{{ props.label }}</span>
  </button>
</template>

<style lang="scss">
.onyx-button {
  display: inline-flex;
  padding: var(--onyx-spacing-2xs, 0.5rem) var(--onyx-spacing-sm, 0.75rem);
  justify-content: center;
  align-items: center;
  gap: var(--onyx-spacing-4xs, 0.25rem);
  border-radius: var(--onyx-radius-sm, 0.25rem);
  cursor: pointer;
  font-family: var(--onyx-font-family);

  &--primary {
    --color: var(--onyx-color-text-primary-intense);

    &:disabled {
      --color: var(--onyx-color-text-primary-soft);
    }

    &.onyx-button--default {
      --background-color: var(--onyx-color-base-primary-500);
      --background-hover-color: var(--onyx-color-base-primary-400);
      --color: var(--onyx-color-text-neutral-inverted);
      --border-color: var(--onyx-color-base-primary-500);

      &:disabled {
        --background-color: var(--onyx-color-base-primary-200);
        --border-color: var(--onyx-color-base-primary-200);
        --color: var(--onyx-color-text-neutral-inverted);
      }
    }

    &.onyx-button--outline {
      --border-color: var(--onyx-color-base-primary-500);

      &:disabled {
        --border-color: var(--onyx-color-base-primary-200);
      }
    }
  }

  &--secondary {
    --background-hover-color: var(--onyx-color-base-neutral-200);
    --focus-outline-color: var(--onyx-color-base-neutral-300);
    --color: var(--onyx-color-text-neutral-intense);

    &:disabled {
      --color: var(--onyx-color-text-neutral-soft);
    }

    &.onyx-button--default {
      --background-color: var(--onyx-color-base-background-blank);
      --background-hover-color: var(--onyx-color-base-neutral-200);
      --border-color: var(--onyx-color-base-neutral-400);

      &:disabled {
        --background-color: var(--onyx-color-base-background-blank);
        --border-color: var(--onyx-color-base-neutral-200);
      }
    }

    &.onyx-button--outline {
      --border-color: var(--onyx-color-base-neutral-400);

      &:disabled {
        --border-color: var(--onyx-color-base-neutral-200);
      }
    }
  }

  &--danger {
    --background-hover-color: var(--onyx-color-base-danger-200);
    --focus-outline-color: var(--onyx-color-base-danger-300);
    --color: var(--onyx-color-text-danger-intense);

    &:disabled {
      --color: var(--onyx-color-text-danger-medium);
    }

    &.onyx-button--default {
      --background-color: var(--onyx-color-base-danger-200);
      --background-hover-color: var(--onyx-color-base-danger-100);
      --border-color: var(--onyx-color-base-danger-500);

      &:disabled {
        --background-color: var(--onyx-color-base-danger-100);
        --border-color: var(--onyx-color-base-danger-200);
      }
    }

    &.onyx-button--outline {
      --border-color: var(--onyx-color-base-danger-500);

      &:disabled {
        --border-color: var(--onyx-color-base-danger-200);
      }
    }
  }

  background-color: var(--background-color, transparent);
  border: 1px solid var(--border-color, transparent);

  &:hover {
    background: var(--background-hover-color, var(--onyx-color-base-primary-100));
  }

  &:focus-visible {
    outline: 0.25rem solid var(--focus-outline-color, var(--onyx-color-base-primary-200));
  }

  &:disabled {
    cursor: none;
    pointer-events: none;
  }

  &__label {
    display: flex;
    padding: 0 var(--onyx-spacing-3xs);
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
</style>
