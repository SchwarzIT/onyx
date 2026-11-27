<script lang="ts" setup>
import { OnyxTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>("09:00");
</script>

<template>
  <OnyxTimePicker v-model="time" label="Readonly" readonly />
  <OnyxTimePicker v-model="time" label="Disabled" disabled />
</template>
