<script lang="ts" setup>
import { computed, inject, onMounted, ref, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { SegmentedControlInject } from "../OnyxSegmentedControl/types.js";
import type { SegmentedControlElement, SegmentedControlElementProps } from "./types.js";

const props = withDefaults(defineProps<SegmentedControlElementProps>(), {
  disabled: false,
});
defineSlots<{
  default?: unknown;
}>();

const { elements, setActive, activeElement, addElement } = inject<SegmentedControlInject>(
  "segmented-control-config",
  {
    elements: ref([]),
    setActive: () => {},
    activeElement: ref(null),
    addElement: () => {},
  },
);

const segmentedControlElement = useTemplateRef("elementRef");
const { densityClass } = useDensity(props);

const isFocuseable = computed(() => {
  if (props.disabled) return false;

  const firstEnabled = elements.value.find((el) => !el.disabled);

  return (
    activeElement.value?.value === props.value ||
    (!activeElement.value && firstEnabled?.value === props.value)
  );
});

const getElement = () => ({
  value: props.value,
  element: segmentedControlElement.value,
  disabled: props.disabled,
});

const handleKeydown = (event: KeyboardEvent) => {
  const currentIndex = elements.value.findIndex(
    (el: SegmentedControlElement) => el.value === props.value,
  );
  if (currentIndex === -1) return;

  const len = elements.value.length;

  const getNextEnabledIndex = (start: number, step: 1 | -1) => {
    let i = start;
    for (let count = 0; count < len; count++) {
      i = (i + step + len) % len;
      if (!elements.value[i]?.disabled) return i;
    }
    return start;
  };

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    const nextIndex = getNextEnabledIndex(currentIndex, 1);
    elements.value[nextIndex]?.element?.focus();
    setActive(elements.value[nextIndex]);
    event.preventDefault();
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    const prevIndex = getNextEnabledIndex(currentIndex, -1);
    elements.value[prevIndex]?.element?.focus();
    setActive(elements.value[prevIndex]);
    event.preventDefault();
  } else if (event.key === "Space") {
    if (!props.disabled) {
      setActive(getElement());
    }
  }
};

onMounted(() => {
  addElement(getElement());
});
</script>

<template>
  <button
    ref="elementRef"
    :class="{
      'onyx-component': true,
      'onyx-segmented-control-element': true,
      'onyx-segmented-control-element--active': activeElement?.value === props.value,
      ...densityClass,
    }"
    type="button"
    :aria-label="props.label ? props.label : props.value"
    :tabindex="isFocuseable ? '0' : '-1'"
    :disabled="disabled"
    @click="setActive(getElement())"
    @keydown="handleKeydown"
  >
    <slot>
      <OnyxIcon v-if="props.icon" :icon="props.icon" class="onyx-segmented-control-element__icon" />
      <p v-if="props.label || !props.icon" class="onyx-segmented-control-element__label">
        {{ props.label ? props.label : props.value }}
      </p>
    </slot>
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-segmented-control-element {
  @include layers.component() {
    padding: var(--onyx-density-xs);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    border: none;
    border-radius: var(--onyx-radius-sm);
    background-color: var(--onyx-color-base-neutral-200);
    color: var(--onyx-color-text-icons-neutral-medium);
    font-weight: var(--onyx-font-weight-regular);
    font-family: var(--onyx-font-family);
    width: 100%;
    cursor: pointer;
    --outline-color: var(--onyx-color-component-focus-primary);
    &--active {
      background-color: var(--onyx-color-base-background-blank);
      font-weight: var(--onyx-font-weight-semibold);
    }
    &:hover {
      color: var(--onyx-color-text-icons-primary-bold);
    }

    &:focus-visible {
      outline: var(--onyx-outline-width) solid var(--outline-color);
    }

    &:has(> .onyx-segmented-control-element__icon):not(
        :has(> .onyx-segmented-control-element__label)
      ) {
      width: auto;
    }
    &:disabled {
      color: var(--onyx-color-text-icons-neutral-soft);
      cursor: default;
    }
  }
}
</style>
