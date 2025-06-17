<script lang="ts" setup>
import { OnyxRadioGroup, type SelectOption } from "sit-onyx";
import { computed } from "vue";
import type { Settings } from "./LayoutSettings.vue";

const activeSetting = defineModel<Settings>();

const props = defineProps<{
  headline: string;
  options: SelectOption[];
  horizontal?: boolean;
}>();

/** returns the option with the key of the first `true` setting */
const settingsToSelection = (settings?: Settings) => {
  if (!settings) return;

  for (const key in settings) {
    if (settings[key as keyof typeof settings]) return key;
  }
};

const selectionToSettings = (selection?: string): Settings => {
  return selection ? { [selection]: true } : {};
};

const selectedOption = computed({
  get: () => settingsToSelection(activeSetting.value),
  set: (value) => (activeSetting.value = selectionToSettings(value)),
});
</script>

<template>
  <OnyxRadioGroup
    v-model="selectedOption"
    :label="props.headline"
    :options="props.options"
    :orientation="props.horizontal ? 'horizontal' : 'vertical'"
  />
</template>
