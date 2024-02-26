<script lang="ts" setup>
import { OnyxRadioButtonGroup, type SelectionOption } from "sit-onyx";
import { computed, ref, watch } from "vue";
import type { Settings } from "./LayoutSettings.vue";

const activeSetting = defineModel<Settings>();

const props = defineProps<{
  headline: string;
  options: SelectionOption<undefined>[];
}>();

const options = computed<SelectionOption<Settings>[]>(() =>
  props.options.map(
    (option) =>
      ({
        ...option,
        label: option.id + option.label,
        value: { [option.id]: true },
      }) as SelectionOption<Settings>,
  ),
);

const selectedOption = ref(
  activeSetting.value
    ? options.value.find((option) => option.id === Object.keys(activeSetting.value!)[0])
    : undefined,
);

watch(selectedOption, (setting) => (activeSetting.value = setting ? setting.value : {}));
</script>

<template>
  <OnyxRadioButtonGroup v-model="selectedOption" :headline="headline" :options="options" />
</template>

<style lang="scss" scoped></style>
