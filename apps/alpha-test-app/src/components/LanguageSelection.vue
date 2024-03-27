<script lang="ts" setup>
import { OnyxRadioButtonGroup, type SelectionOption } from "sit-onyx";
import { computed } from "vue";
const locale = defineModel<string | undefined>();

const selectedOption = computed({
  get: () => options.find((option) => option.id === locale.value),
  set: (option) => {
    locale.value = option?.label;
  },
});

const supportedLocales = ["en-US", "de-DE", "ko-KR"];
const options: SelectionOption[] = supportedLocales.map((value) => ({
  id: value,
  label: value,
}));
</script>

<template>
  <OnyxRadioButtonGroup v-model="selectedOption" headline="Select language" :options="options" />
</template>

<style lang="scss" scoped></style>
import { computed } from "vue";
