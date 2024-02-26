<script lang="ts" setup>
import { OnyxCheckboxGroup, type SelectionOption } from "sit-onyx";
import { computed, ref, watch } from "vue";
import type { Settings } from "./LayoutSettings.vue";

const activeSettings = defineModel<Settings>();

const props = defineProps<{
  headline: string;
  options: SelectionOption<undefined>[];
}>();

const options = computed<SelectionOption<Settings>[]>(() =>
  props.options.map(
    (option) => ({ ...option, value: { [option.id]: true } }) as SelectionOption<Settings>,
  ),
);

const selectedOptions = ref<(keyof Settings)[]>(
  activeSettings.value ? (Object.keys(activeSettings.value) as (keyof Settings)[]) : [],
);

watch(
  selectedOptions,
  (settings) =>
    (activeSettings.value = settings.reduce((settings: Settings, selectedKey) => {
      settings[selectedKey] = true;
      return settings;
    }, {})),
);
</script>

<template>
  <OnyxCheckboxGroup v-model="selectedOptions" :headline="headline" :options="options" />
</template>

<style lang="scss" scoped></style>
