<script lang="ts" setup>
import { OnyxCalendar } from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();
</script>

<template>
  <OnyxCalendar v-model="date" selection-mode="single" />
</template>
