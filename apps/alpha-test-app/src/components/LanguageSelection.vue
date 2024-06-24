<script lang="ts" setup>
import { OnyxRadioGroup, type SelectOption } from "sit-onyx";

const locale = defineModel<string | undefined>();
const supportedLocales = ["en-US", "de-DE", "ko-KR"];
const options: SelectOption[] = supportedLocales.map((value) => ({ value, label: value }));
</script>

<template>
  <OnyxRadioGroup v-model="locale" headline="Select language" :options="options" />
</template>
