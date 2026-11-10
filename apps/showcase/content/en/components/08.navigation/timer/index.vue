<script lang="ts" setup>
import { OnyxTimer } from "sit-onyx";

function getEndTime() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 15);
  return date;
}

const endTime = ref(getEndTime());

const handleTimerEnd = () => {
  // restart time for demonstration purposes
  endTime.value = getEndTime();
};
</script>

<template>
  <OnyxTimer label="Timer:" :end-time @timer-ended="handleTimerEnd" />
</template>
