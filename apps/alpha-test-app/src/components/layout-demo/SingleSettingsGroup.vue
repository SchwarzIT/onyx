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

/** returns the option with the key of the first `true` setting */
const settingsToSelection = (setting?: Settings): SelectionOption | undefined => {
  // for single settings, this will be an array of 0 or 1 element.
  const trueKeys: string[] | undefined =
    setting &&
    Object.entries(setting)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key);
  if (trueKeys) {
    return setting ? props.options.find((option) => trueKeys.includes(option.id)) : undefined;
  }
};

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
