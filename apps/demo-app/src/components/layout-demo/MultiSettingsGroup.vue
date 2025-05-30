<script lang="ts" setup>
import { OnyxCheckboxGroup, type SelectOption } from "sit-onyx";
import { computed } from "vue";
import type { Settings } from "./LayoutSettings.vue";

const activeSettings = defineModel<Settings>();

defineProps<{
  headline: string;
  options: SelectOption[];
  horizontal?: boolean;
}>();

/** returns the attribute names of all `true` settings keys */
const settingsToSelection = (settings?: Settings): (keyof Settings)[] => {
  return settings
    ? Object.keys(settings).filter(
        (key): key is keyof Settings => settings[key as keyof Settings] === true,
      )
    : [];
};
const selectionToSettings = (selection: (keyof Settings)[]): Settings => {
  return selection.reduce<Settings>((settings, selectedKey) => {
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
    :label="headline"
    :options="options"
    :orientation="horizontal ? 'horizontal' : 'vertical'"
  />
</template>
