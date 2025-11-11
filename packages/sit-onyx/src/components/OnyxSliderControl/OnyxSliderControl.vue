<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script setup lang="ts" generic="TSliderMode extends SliderMode">
import { iconMinusSmall, iconPlusSmall } from "@sit-onyx/icons";
import { useDensity } from "../../composables/density.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import type { SliderMode } from "../OnyxSlider/types.js";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import type { OnyxSliderControlProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSliderControlProps>(), {
  control: "value",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const { densityClass } = useDensity(props);

const modelValue = useVModel<OnyxSliderControlProps, "modelValue", number>({
  props,
  emit: emit,
  key: "modelValue",
});

const handleIconClick = () => {
  const currentValue = modelValue.value;

  if (props.control !== "icon" || typeof currentValue !== "number") return;

  const newValue =
    props.direction === "increase"
      ? currentValue + (props.shiftStep ?? 1)
      : currentValue - (props.shiftStep ?? 1);

  modelValue.value = newValue;
};

const handleStepperChange = (value?: Nullable<number>) => {
  if (typeof value === "number") {
    modelValue.value = value;
  }
};

const { t } = injectI18n();
</script>

<template>
  <div :class="['onyx-component', 'onyx-slider-control', densityClass]">
    <template v-if="props.control === 'value'">
      {{ modelValue }}
    </template>

    <template v-if="props.control === 'icon'">
      <OnyxIconButton
        v-if="props.direction === 'decrease'"
        :disabled="props.disabled"
        color="neutral"
        :label="t('slider.decreaseValueBy', { n: props.shiftStep })"
        :icon="iconMinusSmall"
        tabindex="0"
        @click="handleIconClick"
      />
      <OnyxIconButton
        v-if="props.direction === 'increase'"
        :disabled="props.disabled"
        color="neutral"
        :label="t('slider.increaseValueBy', { n: props.shiftStep })"
        :icon="iconPlusSmall"
        tabindex="0"
        @click="handleIconClick"
      />
    </template>

    <template v-if="props.control === 'input'">
      <OnyxStepper
        :label="t('slider.changeValue')"
        hide-label
        hide-buttons
        :disabled="props.disabled"
        :model-value="props.modelValue"
        @update:model-value="handleStepperChange"
      />
    </template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-slider-control {
  @include layers.component() {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    min-width: 2.5rem;
    height: 2.5rem;
    font-size: var(--onyx-font-size-md);
    font-family: var(--onyx-font-family-paragraph);
    line-height: var(--onyx-font-line-height-sm);
    user-select: none;
  }
}
</style>
