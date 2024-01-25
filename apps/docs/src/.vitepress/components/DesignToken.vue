<script lang="ts" setup>
import CheckIcon from "./icons/CheckIcon.vue";
import CopyIcon from "./icons/CopyIcon.vue";

const props = withDefaults(
  defineProps<{
    /** Token name. */
    name: string;
    /** Value to display */
    value: string;
    /**
     * Value type.
     * - color: shows a color preview
     * - value: shows the plain value
     *
     * @default "value"
     */
    type?: "color" | "value";
    /** If true, a "copied" text will be displayed to indicate that the value has been copied. */
    isCopied?: boolean;
  }>(),
  {
    type: "value",
  },
);

const emit = defineEmits<{
  copy: [];
}>();
</script>

<template>
  <button
    class="token"
    :class="{ 'token--color': props.type === 'color' }"
    @click="emit('copy')"
    @keyup.enter="emit('copy')"
  >
    <div class="token__name">
      <span>{{ props.name }}</span>
      <span v-if="props.type === 'value'" class="token__value">{{ props.value }}</span>
    </div>

    <span v-if="props.isCopied" class="token__copied">
      <CheckIcon />
      copied
    </span>

    <CopyIcon v-else class="token__copy" color="var(--onyx-color-icon-action-intense)" />
  </button>
</template>

<style lang="scss" scoped>
.token {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-sm);
  width: max-content;

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
    outline-color: var(--onyx-color-base-action-300);
    background-color: var(--onyx-color-base-background-blank);
    cursor: pointer;
  }

  &__value {
    font-weight: 600;
  }

  &__copy {
    display: none;
  }

  &:hover,
  &:focus-within {
    .token {
      &__name {
        border: 1px solid var(--onyx-color-base-action-300);
      }

      &__copy {
        display: inline-block;
      }
    }
  }

  &--color {
    .token {
      &__name {
        &::after {
          content: "";
          display: inline-block;
          width: 1.25rem;
          min-width: 1.25rem;
          height: 1.25rem;
          background-color: v-bind("props.value");
          border-radius: var(--onyx-radius-sm);
          border: 1px solid var(--onyx-color-base-border-default);
        }
      }
    }
  }

  &__copied {
    display: flex;
    text-align: center;
    color: var(--onyx-color-text-success-intense);
    font-size: 0.8125rem;
  }
}
</style>
