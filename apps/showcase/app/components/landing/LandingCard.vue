<script lang="ts" setup>
import { iconArrowSmallRight } from "@sit-onyx/icons";
import type { SharedLinkProps } from "#root/packages/sit-onyx/dist";

const props = defineProps<{
  link?: string | SharedLinkProps;
}>();

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <GradientCard class="offer-card">
    <div class="offer-card__content">
      <slot></slot>
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
  </GradientCard>
</template>

<style lang="scss" scoped>
.offer-card {
  gap: var(--onyx-density-xl);
  justify-content: space-between;

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
