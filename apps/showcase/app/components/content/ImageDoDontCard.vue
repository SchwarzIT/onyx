<script lang="ts" setup>
import { iconCheckSmall, iconXSmall } from "@sit-onyx/icons";
import type { OnyxColor } from "sit-onyx";

const props = defineProps<{
  src: string;
  alt: string;
  color: Extract<OnyxColor, "success" | "danger">;
}>();

defineSlots<{
  /**
   * Description content.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxCard class="card">
    <div class="card__image-container">
      <OnyxImage
        class="card__image"
        :src="props.src"
        :alt="props.alt"
        :width="400"
        :height="256"
        shape="rounded"
      />

      <OnyxIcon
        class="card__icon"
        :icon="props.color === 'danger' ? iconXSmall : iconCheckSmall"
        :color="props.color"
      />
    </div>

    <div class="card__description">
      <slot></slot>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  &__image-container {
    position: relative;
  }

  &__image {
    width: 100%;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__icon {
    position: absolute;
    top: var(--onyx-density-xs);
    right: var(--onyx-density-2xs);
    border-radius: var(--onyx-radius-full);
    border-width: var(--onyx-1px-in-rem);
    border-style: solid;
    display: flex;
    align-items: center;
    justify-content: center;

    &.onyx-icon--success {
      background-color: var(--onyx-color-base-success-100);
      border-color: var(--onyx-color-base-success-300);
    }

    &.onyx-icon--danger {
      background-color: var(--onyx-color-base-danger-100);
      border-color: var(--onyx-color-base-danger-300);
    }
  }
}
</style>
