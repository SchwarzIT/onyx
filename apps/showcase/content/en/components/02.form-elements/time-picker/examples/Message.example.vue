<script lang="ts" setup>
import { OnyxTimePicker } from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();
</script>

<template>
  <OnyxTimePicker
    v-model="time"
    label="Example label"
    :message="{ label: 'Message', tooltipText: 'Message tooltip content' }"
  />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxTimePicker
    v-model="time"
    label="Example label"
    :error="{ label: 'Custom error', tooltipText: 'Error tooltip content' }"
    show-error
  />
  <OnyxTimePicker
    v-model="time"
    label="Example label"
    :success="{ label: 'Success', tooltipText: 'Success tooltip content' }"
  />
</template>
