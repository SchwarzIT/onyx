<script lang="ts" setup>
import { OnyxTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
</script>

<template>
  <OnyxTimePicker v-model="time" label="Default" required />
  <OnyxTimePicker v-model="time" label="With seconds" required show-seconds />
</template>
