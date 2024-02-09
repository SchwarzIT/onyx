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
  &__label {
    color: var(--onyx-color-icon-neutral-intense);
  }
  &__input {
    // TODO: appearance: auto;
  }
}
</style>
