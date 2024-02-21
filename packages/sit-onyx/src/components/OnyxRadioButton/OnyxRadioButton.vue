<script lang="ts" setup generic="TValue">
import { ref, watchEffect } from "vue";
import type { RadioButtonProps } from "./types";

const props = defineProps<RadioButtonProps<TValue>>();

const selectorRef = ref<HTMLInputElement>();

watchEffect(() => selectorRef.value?.setCustomValidity(props.errorMessage ?? ""));
</script>

<template>
  <!-- TODO: decide on support prefix and/or folder -->
  <label :title="props.errorMessage">
    <!-- TODO: accessible error: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage -->
    <input
      ref="selectorRef"
      class="onyx-radio-button__selector"
      type="radio"
      :required="props.required"
      :name="props.name"
      :value="props.id"
      :checked="props.selected"
      :disabled="props.disabled"
    />
    <span class="onyx-radio-button__label">{{ props.label }}</span>
  </label>
</template>

<style lang="scss">
.onyx-radio-button {
  --onyx-radio-button-cursor: pointer;
  --onyx-radio-button-selector-border-color: var(--onyx-color-base-neutral-400);
  --onyx-radio-button-selector-background-color: var(--onyx-color-base-background-blank);
  --onyx-radio-button-selector-outline-color: var(--onyx-color-base-primary-200);
  --onyx-radio-button-selector-outline-width: 0;
  --onyx-radio-button-label-color: var(--onyx-color-text-icons-neutral-intense);

  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  cursor: var(--onyx-radio-button-cursor);

  &:has(&__selector:hover) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-primary-300);
  }

  &:has(&__selector:checked) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-primary-500);
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-primary-500);
  }

  &:has(&__selector:invalid) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-danger-500);
    --onyx-radio-button-selector-outline-color: var(--onyx-color-base-danger-200);
  }

  &:has(&__selector:invalid:checked) {
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-danger-500);
  }

  &:has(&__selector:focus-visible) {
    --onyx-radio-button-selector-outline-width: 0.75rem;
  }

  &:has(&__selector:disabled) {
    --onyx-radio-button-selector-outline-width: 0;
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-neutral-200);
    --onyx-radio-button-label-color: var(--onyx-color-text-icons-neutral-soft);
    --onyx-radio-button-cursor: default;
  }

  &:has(&__selector:disabled:checked) {
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-neutral-300);
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-neutral-300);
  }

  &__label {
    font-family: var(--onyx-font-family);
    color: var(--onyx-radio-button-label-color);
    padding-left: 0.75rem;
    line-height: 1.5rem;
  }

  &__selector {
    appearance: none;
    box-sizing: border-box;
    margin: 0;
    cursor: inherit;

    outline: {
      style: solid;
      width: var(--onyx-radio-button-selector-outline-width);
      color: var(--onyx-radio-button-selector-outline-color);
    }
    outline-offset: 0;
    transition: outline 200ms;

    height: 1rem;
    width: 1rem;

    border: {
      style: solid;
      width: var(--onyx-1px-in-rem);
      color: var(--onyx-radio-button-selector-border-color);
    }
    border-radius: 100%;

    background-color: var(--onyx-radio-button-selector-background-color);

    display: inline-flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: " ";
      box-sizing: border-box;
      height: 0.375rem;
      width: 0.375rem;
      background-color: var(--onyx-color-base-background-blank);
      border-radius: 100%;
    }
  }
}
</style>
