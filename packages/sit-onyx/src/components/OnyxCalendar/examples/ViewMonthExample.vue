<script setup lang="ts">
import { ref } from "vue";
import { OnyxUnstableCalendar } from "../../..";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";

const today = new Date();
const viewMonth = ref(new Date("02.02.2024"));
</script>

<template>
  <OnyxButton label="change" @click="() => (viewMonth = today)" />
  <OnyxUnstableCalendar v-model:view-month="viewMonth" class="calendar" />
</template>

<style lang="scss" scoped></style>
