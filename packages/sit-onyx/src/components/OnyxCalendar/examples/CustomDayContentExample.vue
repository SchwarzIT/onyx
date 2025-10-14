<script setup lang="ts">
import { OnyxBadge, OnyxUnstableCalendar, type OnyxColor } from "../../../index.js";

type Event = { date: Date; color: OnyxColor; description: string };

const getDummyDate = (dayOffset: number) => {
  const today = new Date();
  today.setDate(today.getDate() + dayOffset);
  return today;
};

const events: Event[] = [
  { date: getDummyDate(-2), color: "primary", description: "Meeting" },
  { date: getDummyDate(-7), color: "success", description: "Anna's birthday" },
  { date: getDummyDate(3), color: "info", description: "Dentist" },
  { date: getDummyDate(7), color: "success", description: "Max's birthday" },
  { date: getDummyDate(12), color: "primary", description: "Team-Event" },
];

const getEvent = (date: Date) => {
  return events.find((event) => event.date.toDateString() === date.toDateString());
};
</script>

<template>
  <OnyxUnstableCalendar class="calendar">
    <template #day="{ date, size }">
      <div class="event">
        <OnyxBadge v-if="getEvent(date)" :color="getEvent(date)?.color" dot />
        <span
          v-if="size === 'big'"
          class="event__description onyx-text--small onyx-truncation-ellipsis"
        >
          {{ getEvent(date)?.description }}
        </span>
      </div>
    </template>
  </OnyxUnstableCalendar>
</template>

<style lang="scss" scoped>
.calendar {
  max-width: 45rem;

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
