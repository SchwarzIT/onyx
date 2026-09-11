<script lang="ts" setup>
import { DateRange, OnyxCalendar } from "sit-onyx";
import { ref } from "vue";

const dateRange = ref<DateRange>();
</script>

<template>
  <OnyxCalendar v-model="dateRange" selection-mode="range" show-calendar-weeks />
</template>
