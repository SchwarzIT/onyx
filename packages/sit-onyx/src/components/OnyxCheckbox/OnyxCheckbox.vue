<script lang="ts" setup>
import { computed, ref } from "vue";
import type { OnyxCheckboxProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxProps>(), {
  modelValue: false,
  label: "",
  indeterminate: false,
  disabled: false,
  required: false,
});

const emit = defineEmits<{
  /** Emitted when the checked state changes. */
  "update:modelValue": [value: boolean];
}>();

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

/** True if the user has interacted with the checkbox once. */
const isTouched = ref(false);
</script>

<template>
  <label
    class="onyx-checkbox"
    :class="{
      'onyx-required-marker': props.required,
      'onyx-optional-marker': !props.required,
    }"
  >
    <div class="onyx-checkbox__container">
      <input
        v-model="isChecked"
        class="onyx-checkbox__input"
        :class="{ 'onyx-checkbox__input--touched': isTouched }"
        type="checkbox"
        :indeterminate="props.indeterminate"
        :disabled="props.disabled"
        :required="props.required"
        @blur="isTouched = true"
      />
    </div>

    <p v-if="props.label" class="onyx-checkbox__label">{{ props.label }}</p>
  </label>
</template>

<style lang="scss">
.onyx-checkbox {
  --onyx-checkbox-input-border-color: var(--onyx-color-base-neutral-400);
  --onyx-checkbox-input-background-color: var(--onyx-color-base-background-blank);
  --onyx-checkbox-container-outline-width: none;
  --onyx-checkbox-container-outline-color: transparent;
  --onyx-checkbox-input-label-color: var(--onyx-color-text-icons-neutral-intense);
  --onyx-checkbox-cursor: pointer;

  font-family: var(--onyx-font-family);
  color: var(--onyx-checkbox-input-label-color);
  display: inline-flex;
  align-items: center;
  cursor: var(--onyx-checkbox-cursor);
  max-width: max-content;

  &:has(&__input:hover),
  [data-sim-hover] & {
    --onyx-checkbox-input-border-color: var(--onyx-color-base-primary-300);
  }

  &:has(&__input:checked),
  &:has(&__input:indeterminate) {
    --onyx-checkbox-input-border-color: var(--onyx-color-base-primary-500);
    --onyx-checkbox-input-background-color: var(--onyx-color-base-primary-500);
  }

  &:has(&__input:invalid.onyx-checkbox__input--touched) {
    --onyx-checkbox-input-border-color: var(--onyx-color-base-danger-500);
  }

  &:has(&__input:invalid:checked.onyx-checkbox__input--touched) {
    --onyx-checkbox-input-border-color: var(--onyx-color-base-danger-500);
    --onyx-checkbox-input-background-color: var(--onyx-color-base-danger-500);
  }

  &:has(&__input:invalid:checked:hover) {
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-danger-300);
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-danger-300);
  }

  &:has(&__input:focus-visible),
  [data-sim-focus-visible] & {
    --onyx-checkbox-container-outline-width: 0.75rem;
    --onyx-checkbox-container-outline-color: var(--onyx-color-base-primary-200);
  }

  &:has(&__input:disabled) {
    --onyx-checkbox-container-outline-width: 0;
    --onyx-checkbox-input-border-color: var(--onyx-color-base-neutral-300);
    --onyx-checkbox-input-label-color: var(--onyx-color-text-icons-neutral-soft);
    --onyx-checkbox-cursor: default;
  }

  &:has(&__input:disabled:checked) {
    --onyx-checkbox-input-background-color: var(--onyx-color-base-neutral-300);
    --onyx-checkbox-input-border-color: var(--onyx-color-base-neutral-300);
  }

  &__input {
    height: 1rem;
    width: 1rem;
    appearance: none;
    margin: 0;
    border-radius: var(--onyx-radius-sm);
    border: {
      width: var(--onyx-1px-in-rem);
      style: solid;
      color: var(--onyx-checkbox-input-border-color);
    }
    outline: {
      width: var(--onyx-checkbox-container-outline-width);
      style: solid;
      color: var(--onyx-checkbox-container-outline-color);
    }
    background: var(--onyx-checkbox-input-background-color);
    cursor: inherit;

    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

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
