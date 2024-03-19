<script lang="ts" setup generic="TValue extends SelectionOptionValue = SelectionOptionValue">
import { createListbox } from "@sit-onyx/headless";
import { computed, ref, watch } from "vue";
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

/**
 * Reference of the `<ul>` listbox element.
 */
const listboxRef = ref<HTMLUListElement>();

/**
 * Currently (visually) focused option.
 */
const focusedOption = ref<TValue>();

/**
 * Sync the focused option with the selected option.
 */
watch(
  () => props.modelValue,
  (newValue) => {
    focusedOption.value = newValue;
  },
  { immediate: true },
);

const {
  elements: { listbox, option: headlessOption },
} = createListbox({
  label: computed(() => props.label),
  selectedOption: computed(() => props.modelValue),
  focusedOption,
  onSelect: (id) => {
    if (props.modelValue === id) emit("update:modelValue", undefined);
    else emit("update:modelValue", id as TValue);
  },
  onFocusFirst: () => (focusedOption.value = props.options.at(0)?.id),
  onFocusLast: () => (focusedOption.value = props.options.at(-1)?.id),
  onFocusNext: (currentValue) => {
    const currentIndex = props.options.findIndex((i) => i.id === currentValue);
    if (currentIndex < props.options.length - 1) {
      focusedOption.value = props.options[currentIndex + 1].id;
    }
  },
  onFocusPrevious: (currentValue) => {
    const currentIndex = props.options.findIndex((i) => i.id === currentValue);
    if (currentIndex > 0) focusedOption.value = props.options[currentIndex - 1].id;
  },
  onScrollIntoView: (id) => {
    const option = listboxRef.value?.querySelector(`#${id}`);
    option?.scrollIntoView({ block: "nearest", inline: "nearest" });
  },
});
</script>

<template>
  <div class="onyx-listbox">
    <ul v-bind="listbox" ref="listboxRef" class="onyx-listbox__options">
      <OnyxListboxOption
        v-for="option in props.options"
        :key="option.id.toString()"
        v-bind="
          headlessOption({
            value: option.id,
            label: option.label,
            disabled: option.disabled,
            selected: option.id === props.modelValue,
          })
        "
        :focused="option.id === focusedOption"
      >
        {{ option.label }}
      </OnyxListboxOption>
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

  .onyx-listbox-option {
    height: var(--option-height);
  }

  &__options {
    max-height: calc(var(--max-options) * var(--option-height));
    box-sizing: border-box;
    overflow: auto;
    outline: none;

    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
