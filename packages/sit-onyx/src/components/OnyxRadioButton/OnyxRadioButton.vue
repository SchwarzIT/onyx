<script lang="ts" setup generic="TValue">
import type { SelectionProps } from "./types";

export type RadioButtonProps<TValue> = SelectionProps<TValue> & { name: string };

const props = defineProps<RadioButtonProps<TValue>>();
</script>

<template>
  <!-- TODO: decide on support prefix -->
  <div class="onyx-radio-button">
    <!-- TODO: readonly is not supported on native radio input: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly#description -->
    <!-- TODO: needs name attribute: https://html.spec.whatwg.org/multipage/input.html#radio-button-group -->
    <input
      :id="props.id"
      class="onyx-radio-button__input"
      type="radio"
      :name="props.name"
      :value="props.id"
      :checked="props.modelValue"
      :disabled="props.isDisabled"
    />
    <!-- TODO: unique ids attributes -->
    <label class="onyx-radio-button__label" :for="props.id">{{ props.label }}</label>
  </div>
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
