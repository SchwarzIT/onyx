<script lang="ts" setup>
import arrowSmallUp from "@sit-onyx/icons/arrow-small-up.svg?raw";
import expandWindow from "@sit-onyx/icons/expand-window.svg?raw";
import { OnyxCard, OnyxIcon, OnyxTag } from "../../..";
</script>

<template>
  <OnyxCard class="card" clickable>
    <div class="card__header">
      Headline
      <OnyxIcon :icon="expandWindow" />
    </div>

    <div class="card__content">
      <span class="card__value"> 5.0 </span>
      <OnyxTag label="4.2 %" :icon="arrowSmallUp" density="compact" color="success" />
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  width: 16rem;

  &__header {
    color: var(--onyx-color-text-icons-neutral-medium);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-card-gap);
    width: 100%;
  }

  &__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-md);
  }

  &__value {
    font-size: 3rem;
    font-weight: var(--onyx-font-weight-medium);
    line-height: 2.75rem;
  }
}
</style>
