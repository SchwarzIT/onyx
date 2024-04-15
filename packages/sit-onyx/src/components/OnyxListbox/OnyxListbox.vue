<script
  lang="ts"
  setup
  generic="TMultiple extends boolean = false, TOption extends ListboxValue = ListboxValue"
>
import { createListbox, type ListboxModelValue, type ListboxValue } from "@sit-onyx/headless";
import { computed, ref, watch } from "vue";
import OnyxListboxOption from "../OnyxListboxOption/OnyxListboxOption.vue";
import type { OnyxListboxProps } from "./types";

const props = defineProps<OnyxListboxProps<TMultiple, TOption>>();

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: typeof props.modelValue];
}>();

/**
 * Currently (visually) active/focused option.
 */
const activeOption = ref<TOption | undefined>();

/**
 * Sync the active option with the selected option.
 */
watch(
  () => props.modelValue,
  (newValue) => {
    if (!props.multiple) {
      activeOption.value = newValue as TOption | undefined;
    }

    // "TODO: which one should be highlighted on multi select?
  },
);

const {
  elements: { listbox, option: headlessOption },
} = createListbox({
  label: computed(() => props.label),
  multiple: computed(() => props.multiple),
  selectedOption: computed(() => props.modelValue),
  activeOption,
  onSelect: (selectedOption) => {
    if (props.modelValue === selectedOption) emit("update:modelValue", undefined);
    else {
      if (!props.multiple) {
        emit("update:modelValue", selectedOption as ListboxModelValue<TOption, TMultiple>);
      } else {
        const newValues =
          !props.modelValue || (Array.isArray(props.modelValue) && !props.modelValue.length)
            ? []
            : (props.modelValue as TOption[]);

        const foundIndex = newValues.findIndex((option) => option === selectedOption);
        // console.log(
        //   "### current model value",
        //   props.modelValue,
        //   "\n new values base",
        //   newValues,
        //   "\nselectedOption",
        //   selectedOption,
        //   "\nfound index",
        //   foundIndex,
        // );
        if (foundIndex < 0) newValues.push(selectedOption);
        else {
          newValues.splice(foundIndex, 1);
        }
        emit("update:modelValue", newValues as ListboxModelValue<TOption, TMultiple>);
      }
    }
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
</script>

<template>
  <div class="onyx-listbox">
    <ul v-bind="listbox" class="onyx-listbox__options">
      <!-- TODO: select-all option for "multiple" -->
      <OnyxListboxOption
        v-for="option in props.options"
        :key="option.id.toString()"
        v-bind="
          headlessOption({
            value: option.id,
            label: option.label,
            disabled: option.disabled,
            selected:
              option.id === props.modelValue ||
              (Array.isArray(props.modelValue) && props.modelValue.includes(option.id)),
          })
        "
        :selected="
          option.id === props.modelValue ||
          (Array.isArray(props.modelValue) && props.modelValue.includes(option.id))
        "
        :multiple="
          /* TODO: fix the ugly passing of `multiple` in a way typescript won't complain */
          multiple === true ? true : false
        "
        :active="option.id === activeOption"
      >
        {{ option.label }}
      </OnyxListboxOption>
    </ul>

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

    &__label {
      color: var(--onyx-color-text-icons-neutral-soft);
      display: inline-block;
      width: 100%;
      text-align: right;
      padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm) 0;
    }

    &__message {
      color: var(--onyx-color-text-icons-neutral-soft);
      display: inline-block;
      width: 100%;
      text-align: right;
      padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm) 0;
    }

    &__options {
      max-height: calc(var(--max-options) * var(--option-height));
      overflow: auto;
      outline: none;

      padding: 0;
    }

    .onyx-listbox-option {
      height: var(--option-height);
    }

    &:has(&__options:focus-visible) {
      outline: 0.25rem solid var(--onyx-color-base-primary-200);
    }
  }
}
</style>
