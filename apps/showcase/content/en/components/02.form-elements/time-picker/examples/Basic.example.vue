<script lang="ts" setup>
import { OnyxUnstableTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
</script>

<template>
  <OnyxUnstableTimePicker v-model="time" label="Default" required />
  <OnyxUnstableTimePicker v-model="time" label="With seconds" required show-seconds />
</template>
