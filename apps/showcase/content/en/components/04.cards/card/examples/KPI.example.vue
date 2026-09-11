<script lang="ts" setup>
import { iconArrowSmallUp, iconPlaceholder } from "@sit-onyx/icons";
import { OnyxCard, OnyxIcon, OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxCard class="card">
    <div class="card__header">
      Example KPI name

      <div class="card__icon">
        <OnyxIcon :icon="iconPlaceholder" size="16px" />
      </div>
    </div>

    <div class="card__content">
      <span class="card__value"> 5.0 </span>
      <OnyxTag label="4.2 %" :icon="iconArrowSmallUp" density="compact" color="success" />
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  &__header {
    color: var(--onyx-color-text-icons-neutral-medium);
    display: flex;
    justify-content: space-between;
    gap: var(--onyx-card-gap);
    width: 100%;
  }

  &__icon {
    color: #fff;
    background-color: var(--onyx-color-text-icons-primary-intense);
    border-radius: var(--onyx-radius-full);
    padding: var(--onyx-density-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
  }

  &__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-md);
  }

  &__value {
    font-size: 3rem;
    line-height: 2.75rem;
    font-weight: var(--onyx-font-weight-semibold);
  }
}
</style>
