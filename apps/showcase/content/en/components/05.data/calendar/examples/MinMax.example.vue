<script lang="ts" setup>
import { OnyxCalendar } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();

// dynamically determine min and max date based on today
const today = new Date();

const min = new Date(today);
min.setDate(min.getDate() - 7);

const max = new Date(today);
max.setDate(max.getDate() + 7);

const disabledDays = (date: Date) => {
  // disable individual days, e.g. every Wednesday
  return date.getDay() === 3;
};
</script>

<template>
  <OnyxCalendar v-model="date" selection-mode="single" :min :max :disabled-days />
</template>
