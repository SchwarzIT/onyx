<script setup lang="ts">
import { computed, ref } from "vue";
import { createComboBox } from "@sit-onyx/headless";
import OnyxListboxWrapper from "../OnyxListbox/OnyxListboxWrapper.vue";
import OnyxListboxList from "../OnyxListbox/OnyxListboxList.vue";
import OnyxListboxOption from "../OnyxListbox/OnyxListboxOption/OnyxListboxOption.vue";
import type { ListboxOption } from "../OnyxListbox/types";
import OnyxListboxMessage from "../OnyxListbox/OnyxListboxMessage.vue";

const props = defineProps<{
  modelValue: string;
  message: string;
  label: string;
  listLabel: string;
  options: ListboxOption<string>[];
}>();

const isExpanded = ref(false);
const searchTerm = ref("");
const activeOption = ref<ListboxOption<string>>();
const activeLabel = computed<string>(() => activeOption.value?.label ?? "");
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
  activeOption.value = filteredOptions.value.at(
    (selectedIndex.value + 1) % filteredOptions.value.length,
  );
};
const onActivatePrevious = () =>
  (activeOption.value = filteredOptions.value.at((selectedIndex.value ?? 0) - 1));
const onSelect = (newValue: string) => (searchTerm.value = newValue);
const onAutocomplete = (input: string) => (searchTerm.value = input);
const onToggle = () => (isExpanded.value = !isExpanded.value);

const comboBox = createComboBox({
  autocomplete: "list",
  label: props.label,
  listLabel: props.listLabel,
  activeOption: activeLabel,
  isExpanded,
  onToggle,
  onAutocomplete,
  onActivateFirst,
  onActivateLast,
  onActivateNext,
  onActivatePrevious,
  onSelect,
});

const {
  elements: { input, listbox, button, option: headlessOption },
} = comboBox;
</script>
<template>
  <div class="onyx-combobox">
    <input v-bind="input" @keydown.arrow-down="isExpanded = true" />
    <button v-bind="button">
      <template v-if="isExpanded">⬆️</template>
      <template v-else>⬇️</template>
    </button>
    <OnyxListboxWrapper v-show="isExpanded">
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
<style>
.onyx-combobox {
}
</style>
