<script setup lang="ts">
import { ref } from "vue";
import { OnyxUnstableCalendar } from "../../../index.js";

const viewMonth = ref(new Date("02.02.2024"));
const selected = ref<Date>();
</script>

<template>
  <p>View month: {{ viewMonth }}</p>
  <p>Selected date: {{ selected }}</p>
  <OnyxUnstableCalendar
    v-model:view-month="viewMonth"
    v-model="selected"
    class="calendar"
    selection="single"
  />
</template>

<style lang="scss" scoped>
.calendar {
  max-width: 45rem;
}
</style>
