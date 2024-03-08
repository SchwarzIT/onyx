<script lang="ts" setup>
import { computed } from "vue";
import type { OnyxInputProps } from "./types";

const props = withDefaults(defineProps<OnyxInputProps>(), {
  modelValue: "",
  type: "text",
  required: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the current value changes but only when the input is blurred.
   */
  change: [value: string];
  /**
   * Emitted when the input is focussed.
   */
  focus: [];
  /**
   * Emitted when the input is blurred.
   */
  blur: [];
}>();

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleChange = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emit("change", inputValue);
};
</script>

<template>
  <label class="onyx-input">
    <div
      class="onyx-input__label onyx-text--small"
      :class="{ 'onyx-required-marker': props.required, 'onyx-optional-marker': !props.required }"
    >
      <div class="onyx-truncation-ellipsis">{{ props.label }}</div>
    </div>

    <div class="onyx-input__wrapper">
      <input
        v-model="value"
        class="onyx-input__native"
        :placeholder="props.placeholder"
        :type="props.type"
        :required="props.required"
        @change="handleChange"
        @focus="emit('focus')"
        @blur="emit('blur')"
      />
    </div>
  </label>
</template>

<style lang="scss">
.onyx-input {
  --border-color: var(--onyx-color-base-primary-500);
  --selection-color: var(--onyx-color-base-primary-200);

  font-family: var(--onyx-font-family);
  display: block;

  &__label {
    display: flex;
    margin-bottom: var(--onyx-spacing-5xs);
    color: var(--onyx-color-text-icons-neutral-medium);

    // optional marker should be displayed at the very end of the label
    &.onyx-optional-marker {
      justify-content: space-between;
    }
  }

  $padding-vertical: var(--onyx-spacing-2xs);
  $line-height: 1.5rem;

  &__wrapper {
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background: var(--onyx-color-base-background-blank);
    color: var(--onyx-color-text-icons-neutral-intense);

    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-2xs);

    font-size: 1rem;
    line-height: $line-height;

    height: calc($line-height + 2 * $padding-vertical);
    box-sizing: border-box;

    &:has(.onyx-input__native:enabled:hover) {
      border-color: var(--onyx-color-base-primary-400);
    }

    &:has(.onyx-input__native:enabled:focus) {
      border-color: var(--border-color);
      outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-primary-200);
    }
  }

  &__native {
    padding: $padding-vertical var(--onyx-spacing-sm);

    // reset native input styles so they are inherited from the parent
    border: none;
    border-radius: inherit;
    background-color: transparent;
    color: inherit;
    width: 100%;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;

    &::placeholder {
      color: var(--onyx-color-text-icons-neutral-soft);
      opacity: 1;
    }

    &::selection {
      background: var(--selection-color);
    }
  }
}
</style>
