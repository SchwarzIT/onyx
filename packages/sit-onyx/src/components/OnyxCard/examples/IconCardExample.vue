<script lang="ts" setup>
import calendarClock from "@sit-onyx/icons/calendar-clock.svg?raw";
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import {
  OnyxCard,
  OnyxFlyoutMenu,
  OnyxHeadline,
  OnyxIcon,
  OnyxMenuItem,
  OnyxSystemButton,
} from "../../../index.js";
</script>

<template>
  <OnyxCard class="card">
    <OnyxIcon color="primary" :icon="calendarClock" size="64px" />

    <div>
      <div class="card__content">
        <OnyxHeadline is="h2">Headline</OnyxHeadline>

        <OnyxFlyoutMenu label="Actions" trigger="click">
          <template #button="{ trigger }">
            <OnyxSystemButton v-bind="trigger" :icon="moreVertical" label="Open link" />
          </template>

          <template #options>
            <OnyxMenuItem>Action 1</OnyxMenuItem>
            <OnyxMenuItem>Action 2</OnyxMenuItem>
            <OnyxMenuItem>Action 3</OnyxMenuItem>
          </template>
        </OnyxFlyoutMenu>
      </div>

      <p class="card__description">Lorem ipsum dolor sit amet consectetur.</p>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  width: 18rem;
  flex-direction: row;
  gap: var(--onyx-density-md);
  align-items: center;

  &__content {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }
}
</style>
