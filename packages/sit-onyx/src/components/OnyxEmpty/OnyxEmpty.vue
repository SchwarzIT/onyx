<script lang="ts" setup>
import circleX from "@sit-onyx/icons/circle-x.svg?raw";
import { useDensity, type DensityProp } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";

const props = defineProps<DensityProp>();

defineSlots<{
  /**
   * Label / text to display.
   */
  default(): unknown;
  /**
   * Optional slot to override the default icon.
   */
  icon?(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-empty', densityClass]">
    <slot name="icon">
      <OnyxIcon :icon="circleX" size="48px" />
    </slot>

    <div class="onyx-empty__label onyx-text onyx-truncation-multiline">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-empty {
  @include layers.component() {
    padding: var(--onyx-density-xl);
    max-width: max-content;
    font-family: var(--onyx-font-family);
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--onyx-density-md);

    &__label {
      color: var(--onyx-color-text-icons-neutral-soft);
      font-weight: 600;
      white-space: pre-line;
    }

    .onyx-icon {
      color: var(--onyx-color-text-icons-primary-medium);
    }
  }
}
</style>
