<script lang="ts" setup>
import { OnyxDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const value = ref(new Date());
</script>

<template>
  <OnyxDatePickerV2 v-model="value" label="Readonly" readonly />
  <OnyxDatePickerV2 v-model="value" label="Disabled" disabled />
</template>
