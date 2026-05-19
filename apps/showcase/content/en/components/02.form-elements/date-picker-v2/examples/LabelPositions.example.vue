<script lang="ts" setup>
import { OnyxUnstableDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();
</script>

<template>
  <OnyxUnstableDatePickerV2 v-model="date" label="Top" />
  <OnyxUnstableDatePickerV2 v-model="date" :label="{ label: 'Left', position: 'left' }" />
  <OnyxUnstableDatePickerV2 v-model="date" :label="{ label: 'Right', position: 'right' }" />
  <OnyxUnstableDatePickerV2 v-model="date" :label="{ label: 'Hidden', hidden: true }" />
</template>
