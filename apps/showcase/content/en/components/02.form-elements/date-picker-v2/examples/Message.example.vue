<script lang="ts" setup>
import { OnyxUnstableDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();
</script>

<template>
  <OnyxUnstableDatePickerV2
    v-model="date"
    label="Date"
    :message="{ label: 'Message', tooltipText: 'Message tooltip content' }"
  />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxUnstableDatePickerV2
    v-model="date"
    label="Date"
    :error="{ label: 'Custom error', tooltipText: 'Error tooltip content' }"
    show-error
  />
  <OnyxUnstableDatePickerV2
    v-model="date"
    label="Date"
    :success="{ label: 'Success', tooltipText: 'Success tooltip content' }"
  />
</template>
