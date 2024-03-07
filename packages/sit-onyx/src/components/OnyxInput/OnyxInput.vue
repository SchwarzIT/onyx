<script lang="ts" setup>
import { computed } from "vue";
import type { OnyxInputProps } from "./types";

const props = withDefaults(defineProps<OnyxInputProps>(), {
  modelValue: "",
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: string];
}>();

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <label class="onyx-input">
    <p class="onyx-input__label onyx-text--small onyx-truncation-ellipsis">{{ props.label }}</p>

    <div class="onyx-input__wrapper">
      <input v-model="value" class="onyx-input__native" :placeholder="props.placeholder" />
    </div>
  </label>
</template>

<style lang="scss">
.onyx-input {
  font-family: var(--onyx-font-family);

  &__label {
    margin-top: 0;
    margin-bottom: var(--onyx-spacing-5xs);
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__wrapper {
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background: var(--onyx-color-base-background-blank);
    color: var(--onyx-color-text-icons-neutral-intense);

    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-2xs);

    font-size: 1rem;
    line-height: 1.5rem;

    &:has(.onyx-input__native:enabled:hover) {
      border-color: var(--onyx-color-base-primary-400);
    }

    &:has(.onyx-input__native:enabled:focus) {
      border-color: var(--onyx-color-base-primary-500);
    }
  }

  &__native {
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
    border: none;
    border-radius: inherit;
    background-color: transparent;
    color: inherit;
    width: 100%;
    outline: none;

    &::placeholder {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
