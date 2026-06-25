<script lang="ts" setup>
import { OnyxCalendar } from "sit-onyx";
import { ref } from "vue";

const dates = ref<Date[]>([]);
</script>

<template>
  <OnyxCalendar v-model="dates" selection-mode="multiple" />
</template>
