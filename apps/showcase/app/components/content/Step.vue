<script lang="ts" setup>
import { iconArrowSmallRight } from "@sit-onyx/icons";

const slots = defineSlots<{
  /**
   * Main step content.
   */
  default(): unknown;
  /**
   * Headline content.
   */
  headline?(): unknown;
}>();
</script>

<template>
  <li class="step">
    <div class="step__indicator">
      <OnyxIcon :icon="iconArrowSmallRight" />
    </div>

    <div class="step__content">
      <div v-if="slots.headline" class="step__headline">
        <slot name="headline" mdc-unwrap="p"></slot>
      </div>

      <slot mdc-unwrap="p"></slot>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.step {
  --step-indicator-size: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: var(--onyx-density-md);

  &__indicator {
    color: var(--onyx-color-text-icons-primary-intense);
    background-color: var(--onyx-color-base-primary-100);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-primary);
    border-radius: var(--onyx-radius-full);
    height: var(--step-indicator-size);
    width: var(--step-indicator-size);
    min-width: var(--step-indicator-size);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }

  &__headline {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-sm);
    flex-wrap: wrap;

    color: var(--onyx-color-text-icons-primary-intense);
    font-family: var(--onyx-font-family-h3);
    font-size: var(--onyx-font-size-md);
    font-weight: var(--onyx-font-weight-semibold);
    line-height: var(--onyx-font-line-height-md);
  }
}
</style>
