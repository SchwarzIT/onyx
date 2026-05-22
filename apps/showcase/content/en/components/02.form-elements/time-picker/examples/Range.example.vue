<script lang="ts" setup>
import { OnyxUnstableTimePicker, TimeRange } from "sit-onyx";
import { ref } from "vue";

const range = ref<TimeRange>();
</script>

<template>
  <OnyxUnstableTimePicker v-model="range" label="Example label" type="range" />
</template>
