<script lang="ts" setup>
import { OnyxUnstableTimePicker, TimeRange } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
const range = ref<TimeRange>();
</script>

<template>
  <OnyxUnstableTimePicker v-model="time" label="Single" show-am-pm />
  <OnyxUnstableTimePicker v-model="range" label="Range" type="range" show-am-pm />
</template>
