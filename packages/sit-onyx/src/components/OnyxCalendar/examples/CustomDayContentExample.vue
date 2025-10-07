<script setup lang="ts">
import { OnyxBadge, OnyxUnstableCalendar, type OnyxColor } from "../../..";

const today = new Date();
type EventType = { date: string; color: OnyxColor; description: string };

const events: EventType[] = [
  {
    date: new Date(today.setDate(today.getDate() - 2)).toISOString().slice(0, 10),
    color: "primary",
    description: "Meeting",
  },
  {
    date: new Date(today.setDate(today.getDate() - 7)).toISOString().slice(0, 10),
    color: "success",
    description: "Anna Birthday",
  },
  {
    date: new Date(today.setDate(today.getDate() + 3)).toISOString().slice(0, 10),
    color: "info",
    description: "Dentist Appointment",
  },
  {
    date: new Date(today.setDate(today.getDate() + 7)).toISOString().slice(0, 10),
    color: "success",
    description: "Max Birthday",
  },
  {
    date: new Date(today.setDate(today.getDate() + 12)).toISOString().slice(0, 10),
    color: "primary",
    description: "Team-Event",
  },
];

const getEvent = (date: Date) => {
  return events.find((event) => event.date === date.toISOString().slice(0, 10));
};
</script>

<template>
  <OnyxUnstableCalendar class="calendar">
    <template #day="{ date, size }">
      <div v-if="date" class="onyx-calendar-event-container">
        <OnyxBadge v-if="getEvent(date)" :color="getEvent(date)?.color" dot> </OnyxBadge>
        <p v-if="size === 'big'">{{ getEvent(date)?.description }}</p>
      </div>
    </template>
  </OnyxUnstableCalendar>
</template>

<style lang="scss" scoped>
.onyx-calendar {
  max-width: 45rem;
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
