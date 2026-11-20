<script lang="ts" setup>
import { OnyxTimePicker, type TimeRange } from "sit-onyx";
import { ref } from "vue";

const range = ref<TimeRange>();
</script>

<template>
  <OnyxTimePicker v-model="range" label="Example label" type="range" />
</template>
