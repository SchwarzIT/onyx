<script lang="ts" setup>
import { OnyxRadioButtonGroup, type SelectionOption } from "sit-onyx";
import { computed } from "vue";
import type { Settings } from "./LayoutSettings.vue";

const activeSetting = defineModel<Settings>();

const props = defineProps<{
  headline: string;
  options: SelectionOption[];
  horizontal?: boolean;
}>();

const settingsToSelection = (settings?: Settings): SelectionOption | undefined =>
  settings ? props.options.find((option) => option.id === Object.keys(settings)[0]) : undefined;

const selectionToSettings = (selection?: SelectionOption): Settings => {
  return selection ? { [selection.id]: true } : {};
};

const selectedOption = computed({
  get: () => settingsToSelection(activeSetting.value),
  set: (value) => (activeSetting.value = selectionToSettings(value)),
});
</script>

<template>
  <OnyxRadioButtonGroup
    v-model="selectedOption"
    :headline="headline"
    :options="options"
    :direction="horizontal ? 'horizontal' : 'vertical'"
  />
</template>
