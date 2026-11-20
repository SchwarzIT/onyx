<script lang="ts" setup>
import { OnyxTimePicker, type SelectOption } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();

const customTimes: SelectOption<string>[] = [
  {
    label: "09:00",
    value: "09:00",
    group: "Morning Slots (09:00 - 12:00)",
  },
  {
    label: "10:00",
    value: "10:00",
    group: "Morning Slots (09:00 - 12:00)",
    disabled: true,
  },
  {
    label: "11:00",
    value: "11:00",
    group: "Morning Slots (09:00 - 12:00)",
  },
  {
    label: "12:30",
    value: "12:30",
    group: "Lunch Break (12:00 - 14:00)",
    disabled: true,
  },
  {
    label: "14:00",
    value: "14:00",
    group: "Afternoon Slots (14:00 - 17:00)",
  },
  {
    label: "15:00",
    value: "15:00",
    group: "Afternoon Slots (14:00 - 17:00)",
    disabled: true,
  },
  {
    label: "15:30",
    value: "15:30",
    group: "Afternoon Slots (14:00 - 17:00)",
    disabled: true,
  },
  {
    label: "16:00",
    value: "16:00",
    group: "Afternoon Slots (14:00 - 17:00)",
  },
];
</script>

<template>
  <OnyxTimePicker
    v-model="time"
    label="Auto-generated options"
    type="select"
    min="09:00"
    max="17:00"
  />
  <OnyxTimePicker v-model="time" label="Custom options" type="select" :options="{ customTimes }" />
</template>
