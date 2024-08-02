<script lang="ts" setup>
import type { OnyxHeadlineProps } from "./types";

const props = defineProps<OnyxHeadlineProps>();

defineSlots<{
  /**
   * Headline content.
   */
  default(): unknown;
}>();
</script>

<template>
  <component :is="props.is" :class="['onyx-headline', `onyx-headline--${props.is}`]">
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-headline {
  @include layers.component() {
    font-weight: 600;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);

    &--h1 {
      font-size: 1.75rem;
      line-height: 2.5rem;
    }

    &--h2 {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    &--h3 {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    &--h4,
    &--h5,
    &--h6 {
      font-size: 0.8125rem;
      line-height: 1.25rem;
    }
  }
}
</style>
