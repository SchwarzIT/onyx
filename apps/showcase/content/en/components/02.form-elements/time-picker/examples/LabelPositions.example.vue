<script lang="ts" setup>
import { OnyxUnstableTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
</script>

<template>
  <OnyxUnstableTimePicker v-model="time" label="Top" />
  <OnyxUnstableTimePicker v-model="time" :label="{ label: 'Left', position: 'left' }" />
  <OnyxUnstableTimePicker v-model="time" :label="{ label: 'Right', position: 'right' }" />
  <OnyxUnstableTimePicker v-model="time" :label="{ label: 'Hidden', hidden: true }" />
</template>
