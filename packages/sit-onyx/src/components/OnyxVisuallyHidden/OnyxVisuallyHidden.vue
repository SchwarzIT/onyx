<script lang="ts" setup>
import type { OnyxVisuallyHiddenProps } from "./types.js";

const slots = defineSlots<{
  /**
   * Content that should be visually hidden.
   */
  default?: () => unknown;
}>();

const props = withDefaults(defineProps<OnyxVisuallyHiddenProps>(), { is: "span" });
</script>

<template>
  <!-- This v-if check is needed to prevent hydration errors in SSR: It ensures that self-closing elements (like `<input />`) are rendered correctly -->
  <component :is="props.is" v-if="slots.default" class="onyx-component onyx-visually-hidden">
    <slot></slot>
  </component>

  <component :is="props.is" v-else class="onyx-component onyx-visually-hidden" />
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
