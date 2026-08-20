<script lang="ts" setup>
import { OnyxTimer } from "sit-onyx";

const endTime = new Date();
endTime.setMinutes(endTime.getMinutes() + 15);

const handleTimerEnd = () => {
  // your logic when the timer has ended...
};
</script>

<template>
  <OnyxTimer label="Logged out in:" :end-time @timer-ended="handleTimerEnd" />
</template>
