<script lang="ts" setup>
import type { OnyxVisuallyHiddenProps } from "./types";

defineSlots<{
  /**
   * Content that should be visually hidden.
   */
  default: () => unknown;
}>();

const props = withDefaults(defineProps<OnyxVisuallyHiddenProps>(), { is: "span" });
</script>

<template>
  <component :is="props.is" class="onyx-component onyx-visually-hidden"><slot></slot></component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-visually-hidden {
  @include layers.component() {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 0;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
}
</style>
