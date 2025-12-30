<script lang="ts" setup>
import { useDensity, type DensityProp } from "../../composables/density.js";
import OnyxEmptySVG from "../illustrations/OnyxEmptySVG/OnyxEmptySVG.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";

const props = defineProps<DensityProp>();

const slots = defineSlots<{
  /**
   * Label / headline to display.
   */
  default(): unknown;
  /**
   * Optional description text to display.
   */
  description?(): unknown;
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
      <OnyxEmptySVG class="onyx-empty__image" />
    </slot>

    <div class="onyx-empty__text-wrapper">
      <OnyxHeadline is="h3" class="onyx-empty__label onyx-truncation-multiline">
        <slot></slot>
      </OnyxHeadline>
      <p v-if="!!slots.description" class="onyx-empty__description onyx-truncation-multiline">
        <slot name="description"></slot>
      </p>
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
    &__text-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
    }

    &__description {
      color: var(--onyx-color-text-icons-neutral-intense);
      font-size: var(--onyx-font-size-sm);
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
