<script lang="ts" setup>
import { DateRange, OnyxUnstableDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();
const dates = ref<Date[]>([]);
const range = ref<DateRange>();
</script>

<template>
  <OnyxUnstableDatePickerV2 v-model="date" label="Single" />
  <OnyxUnstableDatePickerV2 v-model="dates" label="Multiple" selection-mode="multiple" />
  <OnyxUnstableDatePickerV2 v-model="range" label="Range" selection-mode="range" />
  <OnyxUnstableDatePickerV2
    v-model="range"
    label="Range with multi view"
    selection-mode="range"
    multi-view
  />
</template>
