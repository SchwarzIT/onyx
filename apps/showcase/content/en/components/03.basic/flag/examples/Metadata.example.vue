<script lang="ts" setup>
import * as ALL_FLAGS from "@sit-onyx/flags";
import { FLAG_METADATA, getFlagImportName } from "@sit-onyx/flags/utils";
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>("DE");

const options = Object.entries(FLAG_METADATA).map<SelectOption<string>>(
  ([countryCode, metadata]) => {
    const flag = ALL_FLAGS[getFlagImportName(countryCode) as keyof typeof ALL_FLAGS];
    return {
      label: metadata.internationalName,
      group: metadata.continent,
      value: countryCode,
      icon: flag,
    };
  },
);
</script>

<template>
  <OnyxSelect v-model="value" label="Flag" list-label="Available flags" :options with-search />
</template>
