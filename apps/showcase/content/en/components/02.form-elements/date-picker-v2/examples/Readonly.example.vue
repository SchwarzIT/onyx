<script lang="ts" setup>
import { OnyxUnstableDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const value = ref(new Date());
</script>

<template>
  <OnyxUnstableDatePickerV2 v-model="value" label="Readonly" readonly />
  <OnyxUnstableDatePickerV2 v-model="value" label="Disabled" disabled />
</template>
