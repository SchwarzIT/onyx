<script lang="ts" setup>
import { iconArrowSmallRight } from "@sit-onyx/icons";

const props = defineProps<{
  headline: string;
}>();

defineSlots<{
  /**
   * Chart content.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="card">
    <div class="card__header">
      <OnyxHeadline is="h3"> {{ props.headline }} </OnyxHeadline>

      <OnyxButton
        type="button"
        color="neutral"
        :icon="iconArrowSmallRight"
        :label="$t('charts.fullStats')"
      />
    </div>

    <slot></slot>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-lg);
  height: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
