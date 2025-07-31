<script lang="ts" setup>
import { iconCalendarClock, iconMoreVertical } from "@sit-onyx/icons";
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
    <OnyxIcon color="primary" :icon="iconCalendarClock" size="64px" />

    <div>
      <div class="card__content">
        <OnyxHeadline is="h2">Headline</OnyxHeadline>

        <OnyxFlyoutMenu label="Actions" trigger="click">
          <template #button="{ trigger }">
            <OnyxSystemButton v-bind="trigger" :icon="iconMoreVertical" label="Open link" />
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
