<script lang="ts" setup>
import { OnyxDatePickerV2, type DateRange } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();
const dates = ref<Date[]>([]);
const range = ref<DateRange>();
</script>

<template>
  <OnyxDatePickerV2 v-model="date" label="Single" />
  <OnyxDatePickerV2 v-model="dates" label="Multiple" selection-mode="multiple" />
  <OnyxDatePickerV2 v-model="range" label="Range" selection-mode="range" />
  <OnyxDatePickerV2
    v-model="range"
    label="Range with multi view"
    selection-mode="range"
    multi-view
  />
</template>
