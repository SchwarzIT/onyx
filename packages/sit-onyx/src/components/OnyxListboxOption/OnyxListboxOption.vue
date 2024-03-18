<script lang="ts" setup>
import { createListbox } from "@sit-onyx/headless";
import type { OnyxListboxOptionProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxOptionProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const {
  elements: { option },
} = createListbox({
  label: "",
  onSelect: () => emit("update:modelValue", !props.modelValue),
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions --
  the required attributes are set by the v-bind. The eslint rule does not check the v-bind so we need
  to disable it here.
  -->
  <li
    v-bind="
      option({
        id: props.label,
        label: props.label,
        selected: props.modelValue,
        disabled: props.disabled,
      })
    "
    class="onyx-listbox-option"
    :class="{ 'onyx-listbox-option--selected': props.modelValue }"
    :disabled="props.disabled"
  >
    <span class="onyx-truncation-ellipsis"> {{ props.label }}</span>
  </li>
</template>

<style lang="scss">
.onyx-listbox-option {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  box-sizing: border-box;
  padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
  background-color: var(--onyx-color-base-background-blank);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;

  border: none;
  width: 100%;
  outline: none;

  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);

  &:not([aria-disabled="true"]) {
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: var(--onyx-color-base-primary-100);
    }

    &.onyx-listbox-option--selected {
      background-color: var(--onyx-color-base-primary-200);

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-primary-200);
        color: var(--onyx-color-text-icons-primary-bold);
      }
    }
  }

  &[aria-disabled="true"] {
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}
</style>
