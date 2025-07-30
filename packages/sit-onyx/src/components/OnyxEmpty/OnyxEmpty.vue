<script lang="ts" setup>
import { iconCircleX } from "@sit-onyx/icons";
import { useDensity, type DensityProp } from "../../composables/density.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";

const props = defineProps<DensityProp>();

const slots = defineSlots<{
  /**
   * Label / text to display.
   */
  default(): unknown;
  /**
   * Optional slot to override the default icon.
   */
  icon?(): unknown;
  /**
   * Optional slot to place custom buttons.
   */
  buttons?(): unknown;
}>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-component', 'onyx-empty', densityClass]">
    <slot name="icon">
      <OnyxIcon :icon="iconCircleX" size="48px" />
    </slot>

    <div class="onyx-empty__label onyx-text onyx-truncation-multiline">
      <slot></slot>
    </div>

    <div v-if="!!slots.buttons" class="onyx-empty__buttons">
      <slot name="buttons"></slot>
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
    color: var(--onyx-color-text-icons-neutral-soft);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--onyx-density-md);

    &__label {
      font-weight: var(--onyx-font-weight-semibold);
      white-space: pre-line;
    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--onyx-density-xs);
    }
  }
}
</style>
