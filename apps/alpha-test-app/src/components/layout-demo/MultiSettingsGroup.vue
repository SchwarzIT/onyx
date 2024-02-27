<script lang="ts" setup>
import { OnyxCheckboxGroup, type SelectionOption } from "sit-onyx";
import { computed } from "vue";
import type { Settings } from "./LayoutSettings.vue";

const activeSettings = defineModel<Settings>();

const props = defineProps<{
  headline: string;
  options: SelectionOption<undefined>[];
  horizontal?: boolean;
}>();

const options = computed<SelectionOption<Settings>[]>(() =>
  props.options.map(
    (option) => ({ ...option, value: { [option.id]: true } }) as SelectionOption<Settings>,
  ),
);

const settingsToSelection = (settings?: Settings): (keyof Settings)[] => {
  return settings ? (Object.keys(settings) as (keyof Settings)[]) : [];
};
const selectionToSettings = (selection: (keyof Settings)[]): Settings => {
  return selection.reduce((settings: Settings, selectedKey) => {
    settings[selectedKey] = true;
    return settings;
  }, {});
};

const selectedOptions = computed({
  get: () => settingsToSelection(activeSettings.value),
  set: (value) => (activeSettings.value = selectionToSettings(value)),
});
</script>

<template>
  <OnyxCheckboxGroup
    v-model="selectedOptions"
    :headline="headline"
    :options="options"
    :direction="horizontal ? 'horizontal' : 'vertical'"
  />
</template>

<style lang="scss" scoped></style>
