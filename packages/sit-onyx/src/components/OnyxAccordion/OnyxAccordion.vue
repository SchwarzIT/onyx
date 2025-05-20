<script lang="ts" setup generic="TValue extends PropertyKey">
import { defineProps, provide, ref, toRef, toRefs, watch, watchEffect, type Ref } from "vue";
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { useVModel } from "../../composables/useVModel";
import type { Nullable } from "../../types";
import {
  ACCORDION_INJECTION_KEY,
  type AccordionInjectionKey,
  type OnyxAccordionProps,
} from "./types";

const props = withDefaults(defineProps<OnyxAccordionProps<TValue>>(), {
  exclusive: false,
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  type: "default",
});

const emit = defineEmits<{
  /**
   * Emitted when the list of open items changes.
   */
  "update:modelValue": [value: Nullable<TValue[]>];
}>();

defineSlots<{
  /**
   * Displays OnyxAccordionItem components.
   */
  default(): unknown;
}>();

/**
 * Internally managed open items in case no modelValue is set by the user.
 */
const _openItems = ref<TValue[]>([]) as Ref<TValue[]>;
watchEffect(() => (_openItems.value = props.modelValue ?? []));

const openItems = useVModel({
  // if modelValue is set by the user, it should be used instead of the internally managed open items
  props,
  emit,
  key: "modelValue",
  default: () => [] as TValue[],
});

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
  type: toRef(() => props.type),
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
