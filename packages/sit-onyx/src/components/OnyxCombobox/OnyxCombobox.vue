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
  modelValue?: string;
  message?: string;
  label: string;
  listLabel: string;
  withSearch?: boolean;
  options: ListboxOption<string>[];
}>();

const emit = defineEmits<{
  "update:modelValue": [newValue: string];
}>();

const isExpanded = ref(false);
const activeOption = ref<ListboxOption<string>>();
const selectedIndex = computed<number | undefined>(() => {
  const index = props.options.findIndex((o) => o.id === props.modelValue);
  return index !== -1 ? index : undefined;
});

const onActivateFirst = () => (activeOption.value = props.options.at(0));
const onActivateLast = () => (activeOption.value = props.options.at(-1));
const onActivateNext = () => {
  if (selectedIndex.value === undefined) {
    return onActivateFirst();
  }
  const nextIndex = (selectedIndex.value + 1) % props.options.length;

  activeOption.value = props.options.at(nextIndex);
};
const onActivatePrevious = () =>
  (activeOption.value = props.options.at((selectedIndex.value ?? 0) - 1));
const onTypeAhead = (input: string) => {
  const firstMatch = props.options.find((i) => {
    return i.label.toLowerCase().trim().startsWith(input.toLowerCase());
  });
  if (!firstMatch) return;
  activeOption.value = firstMatch;
};
const onToggle = () => (isExpanded.value = !isExpanded.value);
const onSelect = (newValue: string) => emit("update:modelValue", newValue);

const comboBox = createComboBox({
  autocomplete: "none",
  label: props.label,
  listLabel: props.listLabel,
  activeOption: computed(() => activeOption.value?.id),
  isExpanded,
  onToggle,
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
