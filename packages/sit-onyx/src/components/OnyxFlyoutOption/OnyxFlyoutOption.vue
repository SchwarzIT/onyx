<script lang="ts" setup>
import type { OnyxFlyoutOptionProps } from "./types";

const props = defineProps<OnyxFlyoutOptionProps>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <button
    class="onyx-flyout-option"
    :class="{ 'onyx-flyout-option--selected': props.modelValue }"
    :disabled="props.disabled"
    @click="emit('update:modelValue', !props.modelValue)"
  >
    <span class="onyx-truncation-ellipsis"> {{ props.label }}</span>
  </button>
</template>

<style lang="scss">
.onyx-flyout-option {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  box-sizing: border-box;
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  background-color: var(--onyx-color-base-background-blank);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;

  border: none;
  width: 100%;
  outline: none;

  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);

  &:enabled {
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: var(--onyx-color-base-primary-100);
    }

    &.onyx-flyout-option--selected {
      background-color: var(--onyx-color-base-primary-200);

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-primary-200);
        color: var(--onyx-color-text-icons-primary-bold);
      }
    }
  }

  &:disabled {
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}
</style>
