<script lang="ts" setup>
import { flagUS, flagDE } from "@sit-onyx/flags";
import { OnyxLanguageMenuItem, SelectDialogOption } from "sit-onyx";
import { ref } from "vue";

const locale = ref("en");

const languages: SelectDialogOption[] = [
  { label: "English", value: "en", icon: flagUS },
  { label: "Deutsch", value: "de", icon: flagDE },
];
</script>

<template>
  <OnyxLanguageMenuItem v-model="locale" :options="languages" />
</template>
