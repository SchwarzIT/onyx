<script lang="ts" setup>
import type { OnyxHeadlineProps } from "./types";

const props = withDefaults(defineProps<OnyxHeadlineProps>(), {
  monospace: false,
});

defineSlots<{
  /**
   * Headline content.
   */
  default(): unknown;
}>();
</script>

<template>
  <component
    :is="props.is"
    :class="[
      'onyx-headline',
      `onyx-headline--${props.is}`,
      props.monospace ? 'onyx-headline--monospace' : '',
    ]"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss">
.onyx-headline {
  font-weight: 600;
  font-family: var(--onyx-font-family);

  :where(&) {
    margin: 0; // remove default browser margins
    color: var(--onyx-color-text-icons-neutral-intense);
  }

  &--monospace {
    font-family: var(--onyx-font-family-mono);
  }

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
</style>
