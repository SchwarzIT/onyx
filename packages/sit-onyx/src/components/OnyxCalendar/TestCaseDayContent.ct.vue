<script setup lang="ts">
import type { OnyxColor } from "../../types/colors.js";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxCalendar from "./OnyxCalendar.vue";
import type { OnyxCalendarSize } from "./types.js";

type EventType = { date: Date; color: OnyxColor; description: string };

const props = defineProps<{
  /**
   * Calender Size
   */
  size: OnyxCalendarSize;
}>();

const testDate = new Date("2024-10-10T12:00:00Z");

const getDummyDate = (dayOffset: number) => {
  const date = new Date(testDate);
  date.setDate(date.getDate() + dayOffset);
  return date;
};

const events: EventType[] = [
  { date: getDummyDate(-2), color: "primary", description: "Meeting" },
  { date: getDummyDate(-7), color: "success", description: "Anna's birthday" },
];

const getEvent = (date: Date) => {
  return events.find((event) => event.date.toDateString() === date.toDateString());
};
</script>

<template>
  <OnyxCalendar class="calendar" v-bind="props" :view-month="testDate">
    <template #day="{ date, size: daySize }">
      <div class="event">
        <OnyxBadge v-if="getEvent(date)" :color="getEvent(date)?.color" dot />
        <span
          v-if="daySize === 'big'"
          class="event__description onyx-text--small onyx-truncation-ellipsis"
        >
          {{ getEvent(date)?.description }}
        </span>
      </div>
    </template>
  </OnyxCalendar>
</template>

<style lang="scss" scoped>
.calendar {
  &.onyx-calendar--small {
    .event {
      justify-content: center;
    }
  }
}

.event {
  margin-top: var(--onyx-density-2xs);
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
  text-align: left;

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
