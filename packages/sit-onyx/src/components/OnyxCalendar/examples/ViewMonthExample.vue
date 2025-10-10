<script setup lang="ts">
import { ref } from "vue";
import { OnyxUnstableCalendar } from "../../..";

const viewMonth = ref(new Date("02.02.2024"));
const selected = ref();
</script>

<template>
  <OnyxUnstableCalendar
    v-model:view-month="viewMonth"
    v-model:model-value="selected"
    class="calendar"
    selection="range"
  />
  <p>currentMont: {{ viewMonth }}</p>
  <p>selected: {{ selected }}</p>
</template>

<style lang="scss" scoped></style>
