<script lang="ts" setup>
import { iconArrowSmallRight } from "@sit-onyx/icons";
import type { SharedLinkProps } from "#root/packages/sit-onyx/dist";

const props = defineProps<{
  headline: string;
  link?: string | SharedLinkProps;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="offer-card">
    <div class="offer-card__content">
      <OnyxHeadline is="h3" show-as="h2">{{ props.headline }}</OnyxHeadline>
      <div class="onyx-text--small">
        <slot></slot>
      </div>
    </div>

    <OnyxButton
      v-if="props.link"
      class="offer-card__button"
      :label="$t('checkOut')"
      color="primary"
      mode="plain"
      :icon="iconArrowSmallRight"
      :link="props.link"
    />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.offer-card {
  border-radius: var(--onyx-radius-lg);
  padding: var(--onyx-density-xl);
  justify-content: space-between;
  gap: var(--onyx-density-xl);
  flex: 1;
  background: radial-gradient(
    ellipse at bottom right,
    color-mix(in srgb, var(--onyx-color-base-primary-500) 10%, transparent) 0%,
    transparent 100%
  );

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xs);
  }

  &__button {
    --button-icon-color: var(--onyx-color-text-icons-primary-intense);
    align-self: flex-end;

    &:hover {
      --button-icon-color: var(--onyx-color-text-icons-primary-bold);
    }

    :deep(.onyx-button__icon) {
      --icon-color: var(--button-icon-color);
    }
  }
}
</style>
