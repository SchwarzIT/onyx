<script lang="ts" setup>
import type { OnyxVisuallyHiddenProps } from "./types.js";

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
@use "../../styles/mixins/visibility.scss";

.onyx-visually-hidden {
  @include layers.component() {
    @include visibility.visually-hidden();
  }
}
</style>
