<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  /** Token name. */
  name: string;
  /**
   * Value to display. If unset, a color preview will be shown with the value
   * of the given CSS variable name.
   */
  value?: string;
  /** If true, a "copied" text will be displayed to indicate that the value has been copied. */
  isCopied?: boolean;
}>();

const emit = defineEmits<{
  copy: [];
}>();

const cssVariable = computed(() => `var(--${props.name})`);
</script>

<template>
  <div
    class="token"
    :class="{ 'token--with-preview': !props.value, 'token--copied': props.isCopied }"
  >
    <div class="token__name" tabindex="0" @click="emit('copy')" @keyup.enter="emit('copy')">
      <span>{{ props.name }}</span>
      <span v-if="props.value" class="token__value">{{ props.value }}</span>
      <svg
        class="token__copy"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 6V1.5H3V18H9V22.5H21V6H15ZM4.5 16.5V3H13.5V6H9V16.5H4.5ZM19.5 21H10.5V7.5H19.5V21Z"
          fill="var(--onyx-color-icon-action-intense)"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.token {
  &__name {
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-xs) var(--onyx-spacing-2xs)
      var(--onyx-spacing-sm);
    border-radius: var(--onyx-radius-sm);
    border: 1px solid var(--onyx-color-base-border-default);
    font-family: var(--onyx-font-family-mono);
    width: max-content;
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-lg);
    cursor: pointer;
    outline-color: var(--onyx-color-base-action-300);

    &:hover,
    &:focus-visible {
      border: 1px solid var(--onyx-color-base-action-300);

      .token {
        &__value {
          display: none;
        }

        &__copy {
          display: inline-block;
        }
      }
    }
  }

  &__value {
    font-weight: 600;
  }

  &__copy {
    display: none;
  }

  &--with-preview {
    .token {
      &__name {
        &::after {
          content: "";
          display: inline-block;
          width: 1.25rem;
          min-width: 1.25rem;
          height: 1.25rem;
          background-color: v-bind("cssVariable");
          border-radius: var(--onyx-radius-sm);
          border: 1px solid var(--onyx-color-base-border-default);
        }
      }
    }
  }

  &--copied {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-sm);

    &::after {
      content: "copied ✓";
      display: inline-flex;
      text-align: center;
      color: var(--onyx-color-text-success-intense);
      font-size: 0.8125rem;
    }
  }
}
</style>
