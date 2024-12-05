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
  <component
    :is="props.is"
    :class="['onyx-component', 'onyx-headline', `onyx-headline--${props.is}`]"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/sizes";

.onyx-headline {
  @include layers.component() {
    font-weight: 600;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);

    @include sizes.define-headline-sizes();
  }
}
</style>
