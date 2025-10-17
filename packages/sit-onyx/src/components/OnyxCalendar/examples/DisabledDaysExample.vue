<script setup lang="ts">
import { ref, watch } from "vue";
import { OnyxUnstableCalendar, type DateRange } from "../../../index.js";
import OnyxSwitch from "../../OnyxSwitch/OnyxSwitch.vue";

const selected = ref<DateRange>();
const dynamicMin = ref<Date | undefined>();
const dynamicMax = ref<Date | undefined>();
const includeDisabledDays = ref(false);

/**
 * Checks if a given date is a weekend (Sunday or Saturday).
 * Used to disable weekend days in the calendar.
 */
const isDisabled = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

/**
 * Dynamically sets the calendar's min and max constraints
 * to prevent the user from selecting a range that includes a disabled day (weekend).
 */
watch(selected, (newRange) => {
  if (newRange?.start && !newRange.end && !includeDisabledDays.value) {
    const start = new Date(newRange.start);
    const nextDisabledDay = new Date(start);
    nextDisabledDay.setDate(nextDisabledDay.getDate() + 1);
    while (!isDisabled(nextDisabledDay)) {
      nextDisabledDay.setDate(nextDisabledDay.getDate() + 1);
    }
    dynamicMax.value = nextDisabledDay;
    const prevDisabledDay = new Date(start);
    prevDisabledDay.setDate(prevDisabledDay.getDate() - 1);
    while (!isDisabled(prevDisabledDay)) {
      prevDisabledDay.setDate(prevDisabledDay.getDate() - 1);
    }
    dynamicMin.value = prevDisabledDay;
  } else {
    dynamicMin.value = undefined;
    dynamicMax.value = undefined;
  }
});
</script>

<template>
  <OnyxSwitch v-model="includeDisabledDays" label="Range is allowed to have disabled days " />
  <OnyxUnstableCalendar
    v-model="selected"
    :disabled="isDisabled"
    class="calendar"
    selection-mode="range"
    :min="dynamicMin"
    :max="dynamicMax"
  />
</template>

<style lang="scss" scoped>
.calendar {
  max-width: 45rem;
}
</style>
