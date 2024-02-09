<script lang="ts" setup generic="TValue">
import type { SelectionProps } from "./types";

export type RadioButtonProps<TValue> = SelectionProps<TValue> & {
  /**
   * Identifier for the radio buttons in the group.
   * All radio buttons that should belong to the same radio group must have the same name.
   * See also: https://html.spec.whatwg.org/multipage/input.html#radio-button-group
   */
  name: string;
};

const props = defineProps<RadioButtonProps<TValue>>();
</script>

<template>
  <!-- TODO: decide on support prefix and/or folder -->
  <label class="onyx-radio-button">
    <!-- TODO: readonly is not supported on native radio input: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly#description -->
    <input
      class="onyx-radio-button__selector"
      type="radio"
      :name="props.name"
      :value="props.id"
      :checked="props.selected"
      :disabled="props.isDisabled"
    />
    <span class="onyx-radio-button__label">{{ props.label }}</span>
  </label>
</template>

<style lang="scss">
.onyx-radio-button {
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  gap: 0.75rem;

  &__label {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-neutral-intense);
    line-height: 1.5rem;

    .onyx-radio-button__selector:disabled + & {
      color: var(--onyx-color-text-neutral-soft);
    }
  }

  &__selector {
    outline: solid 0 var(--onyx-color-base-primary-200);
    appearance: none;
    box-sizing: border-box;
    margin: 0;

    height: 1rem;
    width: 1rem;

    border-radius: 100%;
    border: 1px solid var(--onyx-color-base-neutral-400);
    background-color: var(--onyx-color-base-background-blank);

    display: inline-flex;
    justify-content: center;
    align-items: center;

    transition: outline 200ms;

    &:checked {
      border: none;
      background-color: var(--onyx-color-base-primary-500);
    }

    &:hover {
      border-color: var(--onyx-color-base-primary-300);
    }

    &:focus-visible {
      outline-width: 0.75rem;
    }

    &:enabled {
      cursor: pointer;
    }

    &:disabled {
      outline: none;
      border-color: var(--onyx-color-base-neutral-200);
    }

    &:disabled:checked {
      background-color: var(--onyx-color-base-neutral-300);
    }

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
