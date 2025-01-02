<script lang="ts" setup>
import { defineSlots, provide, toRefs } from "vue";
import { useDensity } from "../../";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import {
  ACCORDION_INJECTION_KEY,
  type AccordionInjectionKey,
  type OnyxAccordionProps,
} from "./types";
import { useAccordion } from "./useAccordion";

const props = withDefaults(defineProps<OnyxAccordionProps>(), {
  exclusive: false,
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});
defineSlots<{
  /**
   * Displays OnyxAccordionItem components.
   */
  default?(): unknown;
}>();

const { exclusive, disabled } = toRefs(props);
const { openItems, updateOpen } = useAccordion(exclusive);
const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

provide(ACCORDION_INJECTION_KEY as AccordionInjectionKey, {
  openItems,
  updateOpen,
  disabled,
  skeleton,
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-accordion', densityClass]">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
.onyx-accordion {
  @include layers.component() {
    width: 100%;
  }
}
</style>
