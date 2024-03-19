<script lang="ts" setup generic="TValue extends SelectionOptionValue = SelectionOptionValue">
import { createListbox } from "@sit-onyx/headless";
import { computed } from "vue";
import OnyxListboxOption from "../OnyxListboxOption/OnyxListboxOption.vue";
import type { SelectionOptionValue } from "../OnyxRadioButton/types";
import type { OnyxListboxProps } from "./types";

const props = withDefaults(defineProps<OnyxListboxProps<TValue>>(), {
  hideLabel: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: typeof props.modelValue];
}>();

const {
  elements: { listbox, option: headlessOption },
} = createListbox({
  label: computed(() => props.label),
  onSelect: (id) => {
    if (props.modelValue === id) emit("update:modelValue", undefined);
    else emit("update:modelValue", id as TValue);
  },
});
</script>

<template>
  <div class="onyx-listbox">
    <ul class="onyx-listbox__options" v-bind="listbox">
      <OnyxListboxOption
        v-for="option in props.options"
        :key="option.id.toString()"
        class="onyx-listbox__option"
        v-bind="
          headlessOption({
            id: option.id,
            label: option.label,
            disabled: option.disabled,
            selected: option.id === props.modelValue,
          })
        "
      />
    </ul>

    <span v-if="!props.hideLabel" class="onyx-listbox__label onyx-text--small">
      {{ props.label }}
    </span>
  </div>
</template>

<style lang="scss">
.dark {
  .onyx-listbox {
    box-shadow: none;
  }
}

.onyx-listbox {
  :where(&) {
    --max-options: 8;
  }

  --option-height: calc(1.5rem + 2 * var(--onyx-spacing-2xs));

  border-radius: var(--onyx-radius-md);
  background-color: var(--onyx-color-base-background-blank);
  padding: var(--onyx-spacing-2xs) 0;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: max-content;
  min-width: var(--onyx-spacing-4xl);
  max-width: 20rem;
  font-family: var(--onyx-font-family);

  &__label {
    color: var(--onyx-color-text-icons-neutral-soft);
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    text-align: right;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm) 0;
  }

  &__option {
    height: var(--option-height);
    box-sizing: border-box;
  }

  &__options {
    max-height: calc(var(--max-options) * var(--option-height));
    box-sizing: border-box;
    overflow: auto;

    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
