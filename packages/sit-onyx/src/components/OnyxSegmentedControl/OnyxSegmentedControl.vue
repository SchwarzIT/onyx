<script lang="ts" setup>
import { provide, ref, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import type { Nullable } from "../../types/utils.js";
import type { SegmentedControlElement } from "../OnyxSegmentedControlElement/types.js";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import { type OnyxSegmentedControlProps, type SegmentedControlInject } from "./types.js";

const props = withDefaults(defineProps<OnyxSegmentedControlProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  default?: unknown;
}>();

const emit = defineEmits(["update:modelValue"]);

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const elements = ref<SegmentedControlElement[]>([]);
const activeElement = ref<Nullable<SegmentedControlElement>>(null);

const setActive = (el: SegmentedControlElement) => {
  activeElement.value = el;
  emit("update:modelValue", el.value);
};
const addElement = (el: SegmentedControlElement) => {
  elements.value.push(el);
};

provide<SegmentedControlInject>("segmented-control-config", {
  setActive,
  activeElement,
  elements,
  addElement,
});

watch(
  [() => props.modelValue, elements],
  ([newModelValue, newElements]) => {
    const newActive = newElements.find((el) => el.value === newModelValue);
    if (newActive) {
      activeElement.value = newActive;
      return;
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-segmented-control-skeleton', densityClass]" />
  <div v-else :class="['onyx-component', 'onyx-segmented-control', densityClass]">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-segmented-control {
  @include layers.component() {
    display: flex;
    gap: var(--onyx-density-xs);
    padding: var(--onyx-density-xs);
    background-color: var(--onyx-color-base-neutral-200);
    border-radius: var(--onyx-radius-sm);

    &:has(.onyx-segmented-control-element__icon):not(:has(.onyx-segmented-control-element__label)) {
      width: fit-content;
    }
    &-skeleton {
      height: calc(1.5rem + 4 * var(--onyx-density-xs));
      border-radius: var(--onyx-radius-sm);
    }
  }
}
</style>
