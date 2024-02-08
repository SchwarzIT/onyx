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
  <!-- TODO: decide on support prefix -->
  <!-- TODO: using the class name "onyx-radio-button__label" for an element which is not a label element might be misleading -->
  <label class="onyx-radio-button">
    <!-- TODO: readonly is not supported on native radio input: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly#description -->
    <input
      class="onyx-radio-button__input"
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

    .onyx-radio-button__input:disabled + & {
      color: var(--onyx-color-text-neutral-soft);
    }
  }

  &__input {
    outline: none;
    appearance: none;
    box-sizing: border-box;
    margin: 0;

    height: 1rem;
    width: 1rem;

    border-radius: 100%;
    border: 1px solid var(--onyx-color-base-primary-300);
    background-color: var(--onyx-color-base-background-blank);

    display: inline-flex;
    justify-content: center;
    align-items: center;

    transition: box-shadow 200ms;

    &:checked {
      border: none;
      background-color: var(--onyx-color-base-primary-500);
    }

    &:focus-visible,
    &:hover {
      box-shadow: 0 0 0 0.75rem var(--onyx-color-base-primary-200);
    }

    &:enabled {
      cursor: pointer;
    }

    &:disabled {
      box-shadow: none;
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
