<script lang="ts" setup>
import { defineSlots, provide, ref, toRefs } from "vue";
import { useDensity } from "../../";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import {
  ACCORDION_INJECTION_KEY,
  type AccordionInjectionKey,
  type OnyxAccordionProps,
} from "./types";

const props = withDefaults(defineProps<OnyxAccordionProps>(), {
  exclusive: false,
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});
defineSlots<{
  /**
   * Displays OnyxAccordionItem components.
   */
  default(): unknown;
}>();

const openItems = ref(new Set<string>());

const { disabled } = toRefs(props);
const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const updateOpen = (id: string, isOpen: boolean) => {
  if (!isOpen) {
    openItems.value.delete(id);
    return;
  }
  if (props.exclusive) openItems.value.clear();
  openItems.value.add(id);
};

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
