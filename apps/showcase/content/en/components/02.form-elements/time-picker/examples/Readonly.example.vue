<script lang="ts" setup>
import { OnyxUnstableTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>("09:00");
</script>

<template>
  <OnyxUnstableTimePicker v-model="time" label="Readonly" readonly />
  <OnyxUnstableTimePicker v-model="time" label="Disabled" disabled />
</template>
