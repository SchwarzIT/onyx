<script lang="ts" setup>
import type {
  OnyxCalendarSelectionMode,
  OnyxCalendarValueBySelection,
} from "../OnyxCalendar/types.js";
import OnyxDatePickerV2 from "./OnyxDatePickerV2.vue";

defineProps<{
  selectionMode?: OnyxCalendarSelectionMode;
  modelValue?: OnyxCalendarValueBySelection<OnyxCalendarSelectionMode>;
}>();

const customFormat = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
</script>

<template>
  <OnyxDatePickerV2
    label="Test label"
    :selection-mode="selectionMode"
    :model-value="modelValue"
    :format="customFormat"
  />
</template>
