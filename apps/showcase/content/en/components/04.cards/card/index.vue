<script lang="ts" setup>
import { iconExpandWindow, iconPlaceholder } from "@sit-onyx/icons";
import { OnyxCard, OnyxHeadline, OnyxIcon } from "sit-onyx";
</script>

<template>
  <OnyxCard class="card">
    <OnyxIcon :icon="iconPlaceholder" size="48px" />

    <div class="card__content">
      <OnyxHeadline is="h3">Headline</OnyxHeadline>
      Lorem ipsum dolor sit amet consectetur.
    </div>

    <OnyxIcon class="card__arrow" :icon="iconExpandWindow" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  flex-direction: row;
  gap: var(--onyx-density-md);
  zoom: 0.8;

  &:hover {
    background-color: var(--onyx-color-base-neutral-200);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
    flex-grow: 1;
  }

  &__arrow {
    align-self: center;
  }
}
</style>
