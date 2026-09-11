<script lang="ts" setup>
import { OnyxUnstableTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
</script>

<template>
  <OnyxUnstableTimePicker
    v-model="time"
    label="Example label"
    min="09:00"
    max="17:00"
    message="Select a time between 9AM and 5PM"
  />
</template>
