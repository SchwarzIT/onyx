<script lang="ts" setup>
import { provide, ref, toRefs, watch } from "vue";
import { useDensity } from "../../";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxAccordionItem from "../OnyxAccordionItem/OnyxAccordionItem.vue";
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

const { disabled, exclusive } = toRefs(props);
const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const updateOpen = (id: string, isOpen: boolean) => {
  if (!isOpen) {
    openItems.value.delete(id);
    return;
  }
  if (exclusive.value) openItems.value.clear();
  openItems.value.add(id);
};

watch(exclusive, (newExclusive) => {
  if (newExclusive) {
    openItems.value.clear();
  }
});

provide(ACCORDION_INJECTION_KEY as AccordionInjectionKey, {
  openItems,
  updateOpen,
  disabled,
  skeleton,
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-accordion', densityClass]">
    <template v-if="typeof skeleton === 'number'">
      <OnyxAccordionItem v-for="i in skeleton" :key="i" skeleton />
    </template>
    <slot v-else></slot>
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
