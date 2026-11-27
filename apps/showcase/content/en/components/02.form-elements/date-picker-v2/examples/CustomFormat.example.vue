<script lang="ts" setup>
import { OnyxUnstableDatePickerV2, type DateRange } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();
</script>

<template>
  <OnyxUnstableDatePickerV2
    v-model="date"
    label="Date"
    :format="
      new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    "
  />
</template>
