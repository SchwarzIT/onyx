<script lang="ts" setup>
import { OnyxDatePickerV2, type DateRange } from "sit-onyx";
import { ref } from "vue";

const range = ref<DateRange>();
</script>

<template>
  <OnyxDatePickerV2 v-model="range" label="Date" selection-mode="range" show-calendar-weeks />
</template>
