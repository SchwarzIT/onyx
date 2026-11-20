<script lang="ts" setup>
import { OnyxTimePicker, type TimeRange } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
const range = ref<TimeRange>();
</script>

<template>
  <OnyxTimePicker v-model="time" label="Single" show-am-pm />
  <OnyxTimePicker v-model="range" label="Range" type="range" show-am-pm />
</template>
