<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import type { OnyxCheckboxProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxProps>(), {
  modelValue: false,
  label: "",
  indeterminate: false,
});

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watchEffect(() => {
  if (!inputRef.value) return;
  inputRef.value.indeterminate = props.indeterminate;
});
</script>

<template>
  <label class="onyx-checkbox">
    <div class="onyx-checkbox__container">
      <input ref="inputRef" v-model="isChecked" class="onyx-checkbox__input" type="checkbox" />
    </div>

    <p v-if="props.label" class="onyx-checkbox__label">{{ props.label }}</p>
  </label>
</template>

<style lang="scss">
.onyx-checkbox {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-neutral-intense);
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    .onyx-checkbox__input {
      border-color: var(--onyx-color-base-primary-300);
    }
  }

  &:has(&__input:focus-visible) {
    .onyx-checkbox__container {
      background-color: var(--onyx-color-base-primary-200);
    }
  }

  &__container {
    display: inline-flex;
    align-items: center;
    padding: var(--onyx-spacing-sm);
    border-radius: var(--onyx-radius-full);
  }

  &__input {
    height: 1rem;
    width: 1rem;
    appearance: none;
    margin: 0;
    border-radius: var(--onyx-radius-sm);
    border: 1px solid var(--onyx-color-base-neutral-400);
    outline: none;
    background: var(--onyx-color-base-background-blank);
    cursor: inherit;

    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &:checked,
    &:indeterminate {
      border-color: var(--onyx-color-base-primary-500);
      background-color: var(--onyx-color-base-primary-500);

      &:hover {
        border-color: var(--onyx-color-base-primary-300);
        background-color: var(--onyx-color-base-primary-300);
      }
    }

    &:checked {
      // icon (with added fill='white'): check-small.svg
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' xml:space='preserve' viewBox='0 0 32 32'%3E%3Cpath d='m21.311 10.793-8.293 8.293-3.291-3.292-1.415 1.415 4.706 4.705 9.707-9.707z'/%3E%3C/svg%3E");
    }

    &:indeterminate {
      // icon (with added fill='white'): minus-small.svg
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' xml:space='preserve' viewBox='0 0 32 32'%3E%3Cpath d='M8 15h16v2H8z'/%3E%3C/svg%3E");
    }
  }

  &__label {
    display: inline-block;
    margin: 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
</style>
