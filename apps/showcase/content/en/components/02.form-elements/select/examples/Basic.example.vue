<script lang="ts" setup>
import { iconApplePhone, iconAppleTabletLandscape, iconComputer } from "@sit-onyx/icons";
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>();

const options = [
  { label: "Phone", value: "phone", icon: iconApplePhone },
  { label: "Tablet", value: "tablet", icon: iconAppleTabletLandscape },
  { label: "Computer", value: "computed", icon: iconComputer },
] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect
    v-model="value"
    label="Example label"
    list-label="Available options"
    placeholder="Placeholder..."
    :options
    required
  />
</template>
