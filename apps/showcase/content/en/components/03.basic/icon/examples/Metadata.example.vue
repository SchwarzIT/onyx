<script lang="ts" setup>
import * as ALL_ICONS from "@sit-onyx/icons";
import { ICON_METADATA, getIconImportName } from "@sit-onyx/icons/utils";
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>("cookie");

const options = Object.entries(ICON_METADATA).map<SelectOption<string>>(([iconName, metadata]) => {
  const icon = ALL_ICONS[getIconImportName(iconName) as keyof typeof ALL_ICONS];
  return {
    label: iconName,
    group: metadata.category,
    value: iconName,
    icon,
  };
});
</script>

<template>
  <OnyxSelect v-model="value" label="Icon" list-label="Available icons" :options with-search />
</template>
