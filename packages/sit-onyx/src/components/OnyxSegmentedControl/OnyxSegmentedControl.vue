<script lang="ts" setup>
import { useId } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import { type OnyxSegmentedControlProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSegmentedControlProps>(), {
  name: () => useId(), // the name must be globally unique
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  default?: unknown;
}>();

const emit = defineEmits(["update:modelValue"]);

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const modelValue = useVModel<OnyxSegmentedControlProps, "modelValue">({
  props,
  emit,
  key: "modelValue",
});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-segmented-control-skeleton', densityClass]" />
  <div v-else :class="['onyx-component', 'onyx-segmented-control', densityClass]">
    <div v-for="option in options" :key="option.value" class="onyx-segmented-control-element">
      <OnyxVisuallyHidden>
        <input
          :id="option.value"
          v-model="modelValue"
          :name="props.name"
          type="radio"
          :value="option.value"
          :disabled="option.disabled"
          class="onyx-segmented-control-element__input"
          :aria-label="option.label"
        />
      </OnyxVisuallyHidden>
      <label :for="option.value" class="onyx-segmented-control-element__label">
        <OnyxIcon
          v-if="option.icon"
          :icon="option.icon"
          class="onyx-segmented-control-element__icon"
        />
        <p v-if="!option.hideLabel" class="onyx-segmented-control-element__text">
          {{ option.label }}
        </p>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
.onyx-segmented-control {
  @include layers.component() {
    --outline-color: var(--onyx-color-component-focus-primary);

    display: flex;
    gap: var(--onyx-density-2xs);
    padding: var(--onyx-density-2xs);
    background-color: var(--onyx-color-base-neutral-200);
    border-radius: var(--onyx-radius-sm);

    &:has(.onyx-segmented-control-element__icon):not(:has(.onyx-segmented-control-element__text)) {
      width: fit-content;
    }
    &-skeleton {
      height: calc(var(--onyx-font-line-height-md) + 4 * var(--onyx-density-2xs));
      border-radius: var(--onyx-radius-sm);
    }
    &-element {
      box-sizing: border-box;

      border-radius: var(--onyx-radius-sm);
      color: var(--onyx-color-text-icons-neutral-medium);
      font-weight: var(--onyx-font-weight-regular);
      font-family: var(--onyx-font-family);
      line-height: var(--onyx-font-line-height-md);
      width: 100%;

      &__label {
        padding: var(--onyx-density-2xs);
        cursor: pointer;

        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: var(--onyx-density-xs);
      }
      &:hover {
        color: var(--onyx-color-text-icons-primary-bold);
      }
      &:has(.onyx-segmented-control-element__input:checked) {
        background-color: var(--onyx-color-base-background-blank);
        font-weight: var(--onyx-font-weight-semibold);
      }
      &:has(.onyx-segmented-control-element__input:focus-visible) {
        outline: var(--onyx-outline-width) solid var(--outline-color);
      }
      &:has(.onyx-segmented-control-element__input:disabled) {
        color: var(--onyx-color-text-icons-neutral-soft);
        .onyx-segmented-control-element__label {
          cursor: default;
        }
      }
    }
  }
}
</style>
