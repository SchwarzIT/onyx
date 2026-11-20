<script lang="ts" setup>
import { OnyxTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
</script>

<template>
  <OnyxTimePicker v-model="time" label="Top" />
  <OnyxTimePicker v-model="time" :label="{ label: 'Left', position: 'left' }" />
  <OnyxTimePicker v-model="time" :label="{ label: 'Right', position: 'right' }" />
  <OnyxTimePicker v-model="time" :label="{ label: 'Hidden', hidden: true }" />
</template>
