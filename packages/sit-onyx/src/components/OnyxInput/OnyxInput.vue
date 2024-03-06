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
    <p class="onyx-input__label onyx-text--small">{{ props.label }}</p>
    <input v-model="value" class="onyx-input__native" />
  </label>
</template>

<style lang="scss">
.onyx-input {
  font-family: var(--onyx-font-family);

  &__label {
    margin: 0;
  }

  &__native {
  }
}
</style>
