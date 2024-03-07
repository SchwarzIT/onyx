<script lang="ts" setup generic="TValue">
import { ref, watchEffect } from "vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { RadioButtonProps } from "./types";

const props = withDefaults(defineProps<RadioButtonProps<TValue>>(), {
  disabled: false,
  required: false,
  selected: false,
  truncation: "ellipsis",
});

const selectorRef = ref<HTMLInputElement>();

watchEffect(() => selectorRef.value?.setCustomValidity(props.errorMessage ?? ""));
</script>

<template>
  <div v-if="props.skeleton" class="onyx-radio-button-skeleton">
    <OnyxSkeleton class="onyx-radio-button-skeleton__input" />
    <OnyxSkeleton class="onyx-radio-button-skeleton__label" />
  </div>

  <label v-else class="onyx-radio-button" :title="props.errorMessage">
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
    <span class="onyx-radio-button__label" :class="[`onyx-truncation-${props.truncation}`]">
      {{ props.label }}
    </span>
  </label>
</template>

<style lang="scss">
$input-size: var(--onyx-spacing-md);

.onyx-radio-button {
  --onyx-radio-button-cursor: pointer;
  --onyx-radio-button-selector-border-color: var(--onyx-color-base-neutral-400);
  --onyx-radio-button-selector-background-color: var(--onyx-color-base-background-blank);
  --onyx-radio-button-selector-outline-color: var(--onyx-color-base-primary-200);
  --onyx-radio-button-selector-outline-width: 0;
  --onyx-radio-button-label-color: var(--onyx-color-text-icons-neutral-intense);

  display: inline-flex;
  align-items: flex-start;
  max-width: 100%;
  cursor: var(--onyx-radio-button-cursor);

  &:has(&__selector:hover) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-primary-300);
  }

  &:has(&__selector:checked) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-primary-500);
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-primary-500);
  }

  &:has(&__selector:checked:hover) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-primary-400);
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-primary-400);
  }

  &:has(&__selector:invalid) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-danger-500);
    --onyx-radio-button-selector-outline-color: var(--onyx-color-base-danger-200);
  }

  &:has(&__selector:invalid:checked) {
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-danger-500);
  }

  &:has(&__selector:invalid:checked:hover) {
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-danger-400);
    --onyx-radio-button-selector-background-color: var(--onyx-color-base-danger-400);
  }

  &:has(&__selector:focus-visible) {
    --onyx-radio-button-selector-outline-width: var(--onyx-spacing-sm);
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
    line-height: var(--onyx-spacing-lg);
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-2xs) var(--onyx-spacing-2xs) 0;
  }

  &__selector {
    appearance: none;
    box-sizing: border-box;
    margin: var(--onyx-spacing-sm);
    cursor: inherit;

    outline: {
      style: solid;
      width: var(--onyx-radio-button-selector-outline-width);
      color: var(--onyx-radio-button-selector-outline-color);
      offset: 0;
    }
    transition: outline var(--onyx-duration-sm);

    border: {
      style: solid;
      width: var(--onyx-1px-in-rem);
      color: var(--onyx-radio-button-selector-border-color);
      radius: var(--onyx-radius-full);
    }

    background-color: var(--onyx-radio-button-selector-background-color);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: $input-size;
    min-width: $input-size;
    max-width: $input-size;
    aspect-ratio: 1;

    &::before {
      content: " ";
      box-sizing: border-box;
      height: var(--onyx-spacing-3xs);
      width: var(--onyx-spacing-3xs);
      background-color: var(--onyx-color-base-background-blank);
      border-radius: 100%;
    }
  }
}

.onyx-radio-button-skeleton {
  padding: var(--onyx-spacing-sm);
  display: inline-flex;
  align-items: center;
  gap: var(--onyx-spacing-sm);

  &__input {
    height: $input-size;
    width: $input-size;
    border-radius: var(--onyx-radius-full);
  }

  &__label {
    height: var(--onyx-spacing-md);
    width: var(--onyx-spacing-3xl);
  }
}
</style>
