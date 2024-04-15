<script setup lang="ts">
import { computed, ref } from "vue";
import { createComboBox } from "@sit-onyx/headless";
import OnyxListboxWrapper from "../OnyxListbox/OnyxListboxWrapper.vue";
import OnyxListboxList from "../OnyxListbox/OnyxListboxList.vue";
import OnyxListboxOption from "../OnyxListbox/OnyxListboxOption/OnyxListboxOption.vue";
import type { ListboxOption } from "../OnyxListbox/types";
import OnyxListboxMessage from "../OnyxListbox/OnyxListboxMessage.vue";
import OnyxSelect from "./OnyxSelect/OnyxSelect.vue";

const props = defineProps<{
  modelValue: string;
  message: string;
  label: string;
  listLabel: string;
  withSearch?: boolean;
  options: ListboxOption<string>[];
}>();

const isExpanded = ref(false);
const searchTerm = ref("");
const activeOption = ref<ListboxOption<string>>();
// TODO: diacritics search
const filteredOptions = computed(() =>
  props.options.filter((v) => v.label.includes(searchTerm.value)),
);
const selectedIndex = computed<number | undefined>(() => {
  const index = filteredOptions.value.findIndex((o) => o.id === activeOption.value?.id);
  return index !== -1 ? index : undefined;
});

const onActivateFirst = () => (activeOption.value = filteredOptions.value.at(0));
const onActivateLast = () => (activeOption.value = filteredOptions.value.at(-1));
const onActivateNext = () => {
  if (selectedIndex.value === undefined) {
    return onActivateFirst();
  }
  const nextIndex = (selectedIndex.value + 1) % filteredOptions.value.length;

  activeOption.value = filteredOptions.value.at(nextIndex);
};
const onActivatePrevious = () =>
  (activeOption.value = filteredOptions.value.at((selectedIndex.value ?? 0) - 1));
const onSelect = (newValue: string) => (searchTerm.value = newValue);
const onAutocomplete = (input: string) => (searchTerm.value = input);
const onTypeAhead = (input: string) => {
  const firstMatch = props.options.find((i) => {
    return i.label.toLowerCase().trim().startsWith(input.toLowerCase());
  });
  if (!firstMatch) return;
  activeOption.value = firstMatch;
};
const onToggle = () => (isExpanded.value = !isExpanded.value);

const comboBox = createComboBox({
  autocomplete: props.withSearch ? "list" : "none",
  label: props.label,
  listLabel: props.listLabel,
  activeOption: computed(() => activeOption.value?.id),
  isExpanded,
  onToggle,
  onAutocomplete,
  onActivateFirst,
  onActivateLast,
  onActivateNext,
  onActivatePrevious,
  onTypeAhead,
  onSelect,
});

const {
  elements: { input, listbox, option: headlessOption },
} = comboBox;
</script>
<template>
  <div class="onyx-combobox">
    <OnyxSelect :label="props.label" v-bind="input" @keydown.arrow-down="isExpanded = true" />
    <OnyxListboxWrapper v-show="isExpanded" class="onyx-combobox--listbox">
      <OnyxListboxList v-bind="listbox">
        <OnyxListboxOption
          v-for="option in filteredOptions"
          :key="option.id.toString()"
          v-bind="
            headlessOption({
              value: option.id,
              label: option.label,
              disabled: option.disabled,
              selected: option.id === props.modelValue,
            })
          "
          :active="option.id === activeOption?.id"
        >
          {{ option.label }}
        </OnyxListboxOption>
      </OnyxListboxList>

      <OnyxListboxMessage v-if="props.message">
        {{ props.message }}
      </OnyxListboxMessage>
    </OnyxListboxWrapper>
  </div>
</template>
<style lang="scss">
.onyx-combobox {
  position: relative;

  &--listbox {
    position: absolute;
    width: 100%;
  }
}
</style>
