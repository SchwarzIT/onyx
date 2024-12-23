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
const { disabled } = toRefs(props);
const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const accordionRef = ref<HTMLElement>();
const openItems = ref<Set<string>>(new Set());

const updateOpen = (id: string, value: boolean) => {
  if (props.exclusive) {
    if (value) {
      openItems.value = new Set([id]);
    } else {
      openItems.value.delete(id);
    }
  } else {
    if (value) {
      openItems.value.add(id);
    } else {
      openItems.value.delete(id);
    }
  }
};
provide(ACCORDION_INJECTION_KEY as AccordionInjectionKey, {
  openItems,
  updateOpen,
  disabled,
  skeleton,
});

defineSlots<{
  default?(): unknown;
}>();
</script>

<template>
  <div ref="accordionRef" :class="['onyx-component', 'onyx-accordion', densityClass]">
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
