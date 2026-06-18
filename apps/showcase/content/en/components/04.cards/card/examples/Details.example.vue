<script lang="ts" setup>
import { iconCheck, iconFileCopy, iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxButton,
  OnyxCard,
  OnyxHeadline,
  OnyxIcon,
  OnyxSeparator,
  OnyxSystemButton,
  OnyxTag,
} from "sit-onyx";
</script>

<template>
  <OnyxCard class="card">
    <div class="card__header">
      <div class="card__icon-wrapper">
        <OnyxIcon class="card__icon" :icon="iconCheck" size="16px" />
      </div>

      <div>
        <OnyxHeadline is="h2">Action successful!</OnyxHeadline>
        <div class="card__description onyx-text--small">
          Lorem ipsum dolor sit amet consectetur.
        </div>
      </div>
    </div>

    <OnyxSeparator />

    <div class="card__details">
      <div class="detail">
        <span class="detail__label">Number</span>
        <span class="detail__value onyx-text--monospace">
          48164100740
          <OnyxSystemButton label="Copy number" :icon="iconFileCopy" />
        </span>
      </div>

      <div class="detail">
        <span class="detail__label">Date</span>
        <span class="detail__value"> 10/08/25 </span>
      </div>

      <div class="detail">
        <span class="detail__label">Time</span>
        <span class="detail__value"> 10:42 </span>
      </div>

      <div class="detail">
        <span class="detail__label">Status</span>
        <span class="detail__value">
          <OnyxTag label="waiting" color="warning" />
        </span>
      </div>
    </div>

    <OnyxButton class="card__button" label="Button" mode="outline" :icon="iconPlaceholder" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);
  text-align: center;

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-card-gap);
    align-items: center;
  }

  &__icon-wrapper {
    border-radius: var(--onyx-radius-full);
    background-color: var(--onyx-color-base-success-100);
    padding: var(--onyx-density-lg);
    width: max-content;
  }

  &__icon {
    color: #fff;
    background-color: var(--onyx-color-text-icons-success-intense);
    border-radius: var(--onyx-radius-full);
    padding: var(--onyx-density-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
    margin-top: var(--onyx-density-3xs);
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xs);
  }

  &__button {
    width: 100%;
  }
}

.detail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--onyx-density-xs);

  &__label {
    color: var(--onyx-color-text-icons-neutral-soft);
    font-size: var(--onyx-font-size-sm);
    line-height: var(--onyx-font-line-height-sm);
  }

  &__value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--onyx-density-2xs);
  }
}
</style>
