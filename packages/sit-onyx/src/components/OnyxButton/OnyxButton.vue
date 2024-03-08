<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxButtonProps>(), {
  disabled: false,
  type: "button",
  variation: "primary",
  mode: "default",
  skeleton: false,
});

const emit = defineEmits<{
  /** Emitted when the button is clicked (and is not disabled). */
  click: [];
}>();
</script>

<template>
  <OnyxSkeleton v-if="props.skeleton" class="onyx-button-skeleton" />
  <button
    v-else
    class="onyx-button"
    :class="[`onyx-button--${props.variation}`, `onyx-button--${props.mode}`]"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <OnyxIcon v-if="props.icon" :icon="props.icon" size="24px" />
    <span class="onyx-button__label onyx-truncation-ellipsis">{{ props.label }}</span>
  </button>
</template>

<style lang="scss">
$button-height: 2.5rem;

.onyx-button {
  --onyx-button-background-color: transparent;
  --onyx-button-background-hover-color: var(--onyx-color-base-primary-100);
  --onyx-button-border-color: transparent;
  --onyx-button-text-color: var(--onyx-color-text-icons-primary-intense);
  --onyx-button-outline-color: var(--onyx-color-base-primary-200);

  display: flex;
  height: $button-height;
  max-width: 100%;
  box-sizing: border-box;
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
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
    &:disabled {
      --onyx-button-text-color: var(--onyx-color-text-icons-primary-soft);
    }

    &.onyx-button--default {
      --onyx-button-background-color: var(--onyx-color-base-primary-500);
      --onyx-button-background-hover-color: var(--onyx-color-base-primary-400);
      --onyx-button-text-color: var(--onyx-color-text-icons-neutral-inverted);
      --onyx-button-border-color: var(--onyx-color-base-primary-500);

      &:disabled {
        --onyx-button-background-color: var(--onyx-color-base-primary-200);
        --onyx-button-border-color: var(--onyx-color-base-primary-200);
        --onyx-button-text-color: var(--onyx-color-text-icons-neutral-inverted);
      }
    }

    &.onyx-button--outline {
      --onyx-button-border-color: var(--onyx-color-base-primary-500);

      &:disabled {
        --onyx-button-border-color: var(--onyx-color-base-primary-200);
      }
    }
  }

  &--secondary {
    --onyx-button-background-hover-color: var(--onyx-color-base-neutral-200);
    --onyx-button-outline-color: var(--onyx-color-base-neutral-300);
    --onyx-button-text-color: var(--onyx-color-text-icons-neutral-intense);

    &:disabled {
      --onyx-button-text-color: var(--onyx-color-text-icons-neutral-soft);
    }

    &.onyx-button--default {
      --onyx-button-background-color: var(--onyx-color-base-background-blank);
      --onyx-button-background-hover-color: var(--onyx-color-base-neutral-200);
      --onyx-button-border-color: var(--onyx-color-base-neutral-400);

      &:disabled {
        --onyx-button-background-color: var(--onyx-color-base-background-blank);
        --onyx-button-border-color: var(--onyx-color-base-neutral-200);
      }
    }

    &.onyx-button--outline {
      --onyx-button-border-color: var(--onyx-color-base-neutral-400);

      &:disabled {
        --onyx-button-border-color: var(--onyx-color-base-neutral-200);
      }
    }
  }

  &--danger {
    --onyx-button-background-hover-color: var(--onyx-color-base-danger-200);
    --onyx-button-outline-color: var(--onyx-color-base-danger-300);
    --onyx-button-text-color: var(--onyx-color-text-icons-danger-intense);

    &:disabled {
      --onyx-button-text-color: var(--onyx-color-text-icons-danger-medium);
    }

    &.onyx-button--default {
      --onyx-button-background-color: var(--onyx-color-base-danger-200);
      --onyx-button-background-hover-color: var(--onyx-color-base-danger-100);
      --onyx-button-border-color: var(--onyx-color-base-danger-500);

      &:disabled {
        --onyx-button-background-color: var(--onyx-color-base-danger-100);
        --onyx-button-border-color: var(--onyx-color-base-danger-200);
      }
    }

    &.onyx-button--outline {
      --onyx-button-border-color: var(--onyx-color-base-danger-500);

      &:disabled {
        --onyx-button-border-color: var(--onyx-color-base-danger-200);
      }
    }
  }

  &:hover:enabled {
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
}

.onyx-button-skeleton {
  width: var(--onyx-spacing-4xl);
  height: $button-height;
}
</style>
