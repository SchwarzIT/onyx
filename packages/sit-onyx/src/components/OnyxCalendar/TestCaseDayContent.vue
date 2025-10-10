<script setup lang="ts">
import type { OnyxColor } from "../../types.js";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxCalendar from "./OnyxCalendar.vue";
import type { OnyxCalendarSize } from "./types.js";

const props = defineProps<{
  /**
   * Calender Size
   */
  size: OnyxCalendarSize;
}>();
const testDate = new Date("2024-10-10T12:00:00Z");
type EventType = { date: string; color: OnyxColor; description: string };

const events: EventType[] = [
  {
    date: new Date(testDate.setDate(testDate.getDate() - 2)).toISOString().slice(0, 10),
    color: "primary",
    description: "Meeting",
  },
  {
    date: new Date(testDate.setDate(testDate.getDate() - 7)).toISOString().slice(0, 10),
    color: "success",
    description: "Anna Birthday",
  },
];

const getEvent = (date: Date) => {
  return events.find((event) => event.date === date.toISOString().slice(0, 10));
};
</script>

<template>
  <OnyxCalendar class="calendar" v-bind="props" :view-month="testDate">
    <template #day="{ date, size: daySize }">
      <div v-if="date" class="onyx-calendar-event-container">
        <OnyxBadge v-if="getEvent(date)" :color="getEvent(date)?.color" dot> </OnyxBadge>
        <p v-if="daySize === 'big'">{{ getEvent(date)?.description }}</p>
      </div>
    </template>
  </OnyxCalendar>
</template>

<style lang="scss">
.onyx-calendar {
  &--small {
    .onyx-badge {
      position: absolute;
      top: var(--onyx-density-2xs);
      right: var(--onyx-density-2xs);
    }
  }
}

.onyx-calendar-event-container {
  margin-top: var(--onyx-density-xs);
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
  p {
    color: var(--onyx-color-text-icons-neutral-medium);
    font-size: 0.8rem;
  }
}
</style>
