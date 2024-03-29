<script lang="ts" setup generic="TValue extends SelectionOptionValue = SelectionOptionValue">
import { OnyxLoadingIndicator } from "@/index";
import { ref, watchEffect } from "vue";
import { useDensity } from "../../composables/density";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { RadioButtonProps, SelectionOptionValue } from "./types";

const props = withDefaults(defineProps<RadioButtonProps<TValue>>(), {
  disabled: false,
  required: false,
  selected: false,
  loading: false,
  truncation: "ellipsis",
});

const selectorRef = ref<HTMLInputElement>();

const { densityClass } = useDensity(props);

watchEffect(() => selectorRef.value?.setCustomValidity(props.errorMessage ?? ""));
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-radio-button-skeleton', densityClass]">
    <OnyxSkeleton class="onyx-radio-button-skeleton__input" />
    <OnyxSkeleton class="onyx-radio-button-skeleton__label" />
  </div>

  <label v-else :class="['onyx-radio-button', densityClass]" :title="props.errorMessage">
    <OnyxLoadingIndicator v-if="props.loading" class="onyx-radio-button__loading" type="circle" />
    <!-- TODO: accessible error: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage -->
    <input
      v-else
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
@use "../../styles/density.scss";

.onyx-radio-button,
.onyx-radio-button-skeleton {
  @include density.compact {
    --onyx-radio-button-height: var(--onyx-density);
    --onyx-radio-button-selector-size: var(--onyx-spacing-sm);
    --onyx-radio-button-dot-size: var(--onyx-spacing-4xs);
    --onyx-radio-button-label-padding: var(--onyx-spacing-4xs);
    --onyx-radio-button-selector-margin: var(--onyx-spacing-xs);
  }

  @include density.default {
    --onyx-radio-button-height: var(--onyx-density);
    --onyx-radio-button-selector-size: var(--onyx-spacing-md);
    --onyx-radio-button-dot-size: var(--onyx-spacing-3xs);
    --onyx-radio-button-label-padding: var(--onyx-spacing-2xs);
    --onyx-radio-button-selector-margin: var(--onyx-spacing-sm);
  }

  @include density.cozy {
    --onyx-radio-button-height: var(--onyx-density);
    --onyx-radio-button-selector-size: var(--onyx-spacing-lg);
    --onyx-radio-button-dot-size: var(--onyx-spacing-2xs);
    --onyx-radio-button-label-padding: var(--onyx-spacing-sm);
    --onyx-radio-button-selector-margin: var(--onyx-spacing-sm);
  }
}

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
  min-height: var(--onyx-radio-button-height);

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
    --onyx-radio-button-selector-outline-width: var(--onyx-radio-button-selector-margin);
  }

  &:has(&__selector:disabled) {
    --onyx-radio-button-selector-outline-width: 0;
    --onyx-radio-button-selector-border-color: var(--onyx-color-base-neutral-200);
    --onyx-radio-button-label-color: var(--onyx-color-text-icons-neutral-soft);
    --onyx-radio-button-cursor: default;
  }

  &:has(&__loading) {
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
    padding: var(--onyx-radio-button-label-padding);
    padding-left: 0;
  }

  &__selector {
    appearance: none;
    box-sizing: border-box;
    margin: var(--onyx-radio-button-selector-margin);
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

    display: inline-grid;
    place-items: center;
    width: var(--onyx-radio-button-selector-size);
    min-width: var(--onyx-radio-button-selector-size);
    max-width: var(--onyx-radio-button-selector-size);
    aspect-ratio: 1;

    &::before {
      content: " ";
      box-sizing: border-box;
      height: var(--onyx-radio-button-dot-size);
      width: var(--onyx-radio-button-dot-size);
      background-color: var(--onyx-color-base-background-blank);
      border-radius: 100%;
    }
  }

  &__loading {
    color: var(--onyx-color-text-icons-primary-intense);
    width: var(--onyx-radio-button-selector-size);
    height: var(--onyx-radio-button-selector-size);
    margin: var(--onyx-radio-button-selector-margin);
  }
}

.onyx-radio-button-skeleton {
  padding: var(--onyx-radio-button-selector-margin);
  display: inline-flex;
  align-items: center;
  gap: var(--onyx-spacing-sm);

  &__input {
    height: var(--onyx-radio-button-selector-size);
    width: var(--onyx-radio-button-selector-size);
    border-radius: var(--onyx-radius-full);
  }

  &__label {
    height: var(--onyx-spacing-md);
    width: var(--onyx-spacing-3xl);
  }
}
</style>
