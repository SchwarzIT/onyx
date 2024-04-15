<script lang="ts" setup generic="TValue extends SelectionOptionValue = SelectionOptionValue">
import { createListbox } from "@sit-onyx/headless";
import { computed, ref, watch } from "vue";
import OnyxListboxOption from "../OnyxListboxOption/OnyxListboxOption.vue";
import type { SelectionOptionValue } from "../OnyxRadioButton/types";
import type { ListboxOption, OnyxListboxProps } from "./types";

const props = defineProps<OnyxListboxProps<TValue>>();

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: typeof props.modelValue];
}>();

/**
 * Currently (visually) active option.
 */
const activeOption = ref<TValue>();

/**
 * Sync the active option with the selected option.
 */
watch(
  () => props.modelValue,
  (newValue) => {
    activeOption.value = newValue;
  },
);

const {
  elements: { listbox, option: headlessOption, group: headlessGroup },
} = createListbox({
  label: computed(() => props.label),
  selectedOption: computed(() => props.modelValue),
  activeOption,
  onSelect: (id) => {
    if (props.modelValue === id) emit("update:modelValue", undefined);
    else emit("update:modelValue", id as TValue);
  },
  onActivateFirst: () => (activeOption.value = props.options.at(0)?.id),
  onActivateLast: () => (activeOption.value = props.options.at(-1)?.id),
  onActivateNext: (currentValue) => {
    const currentIndex = props.options.findIndex((i) => i.id === currentValue);
    if (currentIndex < props.options.length - 1) {
      activeOption.value = props.options[currentIndex + 1].id;
    }
  },
  onActivatePrevious: (currentValue) => {
    const currentIndex = props.options.findIndex((i) => i.id === currentValue);
    if (currentIndex > 0) activeOption.value = props.options[currentIndex - 1].id;
  },
  onTypeAhead: (label) => {
    const firstMatch = props.options.find((i) => {
      return i.label.toLowerCase().trim().startsWith(label.toLowerCase());
    });
    if (!firstMatch) return;
    activeOption.value = firstMatch.id;
  },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const groupedOptions = props.options.reduce((acc: Record<string, ListboxOption[]>, currOpt) => {
  acc[currOpt.group ?? ""] = acc[currOpt.group ?? ""] || [];
  acc[currOpt.group ?? ""].push(currOpt);
  return acc;
}, {});
</script>

<template>
  <div class="onyx-listbox">
    <div class="onyx-listbox__wrapper" v-bind="listbox">
      <div
        v-for="([group, options], index) in Object.entries(groupedOptions)"
        :key="index"
        v-bind="
          headlessGroup({
            label: group,
          })
        "
        class="onyx-listbox__group"
      >
        <span v-if="group != ''" class="onyx-listbox__group-name onyx-text--small">{{
          group
        }}</span>
        <ul class="onyx-listbox__options">
          <OnyxListboxOption
            v-for="option in options as any"
            :key="option.id.toString()"
            v-bind="
              headlessOption({
                value: option.id,
                label: option.label,
                disabled: option.disabled,
                selected: option.id === props.modelValue,
              })
            "
            :active="option.id === activeOption"
          >
            {{ option.label }}
          </OnyxListboxOption>
        </ul>
      </div>
    </div>
    <span v-if="props.message" class="onyx-listbox__message onyx-text--small">
      {{ props.message }}
    </span>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-listbox {
  @include layers.component() {
    --max-options: 8;
    --option-height: calc(1.5rem + 2 * var(--onyx-spacing-2xs));

    border-radius: var(--onyx-radius-md);
    background-color: var(--onyx-color-base-background-blank);
    padding: var(--onyx-spacing-2xs) 0;
    box-shadow: var(--onyx-shadow-medium-bottom);
    width: max-content;
    min-width: var(--onyx-spacing-4xl);
    max-width: 20rem;
    font-family: var(--onyx-font-family);

    &__wrapper {
      max-height: calc(var(--max-options) * var(--option-height));
      overflow: auto;
      outline: none;
    }

    &__group:not(:last-child) {
      border-bottom: 1px solid var(--onyx-color-base-neutral-300);
      margin-bottom: var(--onyx-spacing-4xs);
    }

    &__group-name {
      display: block;
      padding: 0 var(--onyx-spacing-sm);
      color: var(--onyx-color-text-icons-neutral-medium);
      font-weight: 600;
    }

    &__options {
      padding: 0;
    }

    &__message {
      color: var(--onyx-color-text-icons-neutral-soft);
      display: inline-block;
      width: 100%;
      text-align: right;
      padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm) 0;
    }

    .onyx-listbox-option {
      height: var(--option-height);
    }

    &:has(&__wrapper:focus-visible) {
      outline: 0.25rem solid var(--onyx-color-base-primary-200);
    }
  }
}
</style>
