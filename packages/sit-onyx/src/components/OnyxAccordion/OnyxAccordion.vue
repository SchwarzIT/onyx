<script lang="ts" setup generic="TValue extends PropertyKey">
import { provide, toRef, toRefs, watch } from "vue";
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

/**
 * Currently opened items. Will include the `value` property of the nested `OnyxAccordionItems`.
 */
const openItems = defineModel<TValue[]>({ default: () => [] });

const { disabled, exclusive } = toRefs(props);
const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const updateOpen = (value: TValue, isOpen: boolean) => {
  if (!isOpen) {
    if (!openItems.value.includes(value)) return;
    openItems.value = openItems.value.filter((i) => i !== value);
    return;
  }
  if (exclusive.value) {
    openItems.value = [value];
    return;
  }
  if (!openItems.value.includes(value)) {
    openItems.value = openItems.value.concat(value);
  }
};

watch(
  exclusive,
  (newExclusive) => {
    if (newExclusive && openItems.value.length > 1) {
      const lastOpenedItem = openItems.value.at(-1);
      openItems.value = lastOpenedItem != undefined ? [lastOpenedItem] : [];
    }
  },
  { immediate: true },
);

provide(ACCORDION_INJECTION_KEY as AccordionInjectionKey<TValue>, {
  openItems: toRef(() => openItems.value),
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
