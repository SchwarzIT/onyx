<script lang="ts" setup>
import { OnyxBadge, OnyxCalendar, OnyxColor } from "sit-onyx";

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

const findEvent = (date: Date) => {
  return events.find((event) => event.date.toDateString() === date.toDateString());
};
</script>

<template>
  <OnyxCalendar show-calendar-weeks>
    <template #day="{ date, size }">
      <div v-if="findEvent(date)" class="event">
        <OnyxBadge :color="findEvent(date)?.color" dot />
        <span
          v-if="size === 'big'"
          class="event__description onyx-text--small onyx-truncation-ellipsis"
        >
          {{ findEvent(date)?.description }}
        </span>
      </div>
    </template>
  </OnyxCalendar>
</template>

<style lang="scss" scoped>
.event {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-xs);
  text-align: left;
  margin-top: var(--onyx-density-2xs);

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  .onyx-calendar--small & {
    justify-content: center;
  }
}
</style>
