<script lang="ts" setup>
import { DateRange, OnyxUnstableDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const range = ref<DateRange>();
</script>

<template>
  <OnyxUnstableDatePickerV2
    v-model="range"
    label="Date"
    selection-mode="range"
    show-calendar-weeks
  />
</template>
