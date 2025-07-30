<script lang="ts" setup>
import { iconCheckSmall, iconFileCopy, iconHome } from "@sit-onyx/icons";
import {
  OnyxButton,
  OnyxCard,
  OnyxHeadline,
  OnyxIcon,
  OnyxSystemButton,
  OnyxTag,
} from "../../../index.js";
</script>

<template>
  <OnyxCard class="card">
    <div class="card__header">
      <div class="card__icon-wrapper">
        <OnyxIcon class="card__icon" :icon="iconCheckSmall" size="32px" />
      </div>

      <div>
        <OnyxHeadline is="h2">Action successful!</OnyxHeadline>
        <div class="card__description onyx-text--small">
          Lorem ipsum dolor sit amet consectetur.
        </div>
      </div>
    </div>

    <hr class="card__separator" />

    <div class="card__details">
      <div class="detail">
        <span class="detail__label">Number</span>
        <span class="detail__value detail__value--mono">
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

    <OnyxButton class="card__button" label="Home" mode="outline" :icon="iconHome" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);
  width: 16rem;
  text-align: center;

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-card-gap);
    align-items: center;
  }

  &__icon-wrapper {
    border-radius: var(--onyx-radius-full);
    background: var(--onyx-color-base-success-100);
    padding: var(--onyx-density-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
  }

  &__icon {
    color: #fff;
    border-radius: var(--onyx-radius-full);
    background: var(--onyx-color-base-success-400);
    padding: var(--onyx-density-2xs);
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
    margin-top: var(--onyx-density-3xs);
  }

  &__separator {
    all: initial;
    line-height: inherit;
    height: var(--onyx-1px-in-rem);
    background-color: var(--onyx-color-component-border-neutral);
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

    &--mono {
      font-family: var(--onyx-font-family-mono);
    }
  }
}
</style>
