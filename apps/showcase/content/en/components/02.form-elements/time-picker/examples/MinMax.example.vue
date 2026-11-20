<script lang="ts" setup>
import { OnyxTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
</script>

<template>
  <OnyxTimePicker
    v-model="time"
    label="Example label"
    min="09:00"
    max="17:00"
    message="Select a time between 9AM and 5PM"
  />
</template>
