<script lang="ts" setup>
import { OnyxUnstableDatePickerV2, OnyxUnstableTimePicker } from "sit-onyx";
import { computed, ref } from "vue";

const date = ref<Date>();
const time = ref<string>();

// use this computed value for the combined date + time value
const dateTime = computed(() => {
  if (!date.value || !time.value) return date.value;
  const value = new Date(date.value);
  const [hours, minutes] = time.value.split(":").map((i) => Number.parseInt(i));
  value.setHours(hours, minutes);
  return value;
});
</script>

<template>
  <div class="onyx-grid">
    <OnyxUnstableDatePickerV2 v-model="date" class="onyx-grid-span-2" label="Date" />
    <OnyxUnstableTimePicker v-model="time" class="onyx-grid-span-2" label="Time" />
  </div>
</template>
