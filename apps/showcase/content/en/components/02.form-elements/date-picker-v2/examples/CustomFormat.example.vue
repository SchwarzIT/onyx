<script lang="ts" setup>
import { OnyxUnstableDatePickerV2 } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>(new Date());
const format = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
</script>

<template>
  <OnyxUnstableDatePickerV2 v-model="date" label="Date" :format />
</template>
