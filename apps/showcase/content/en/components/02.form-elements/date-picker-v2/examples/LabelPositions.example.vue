<script lang="ts" setup>
import { OnyxDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();
</script>

<template>
  <OnyxDatePickerV2 v-model="date" label="Top" />
  <OnyxDatePickerV2 v-model="date" :label="{ label: 'Left', position: 'left' }" />
  <OnyxDatePickerV2 v-model="date" :label="{ label: 'Right', position: 'right' }" />
  <OnyxDatePickerV2 v-model="date" :label="{ label: 'Hidden', hidden: true }" />
</template>
