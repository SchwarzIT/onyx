<script setup lang="ts">
import { iconMinusSmall, iconPlusSmall } from "@sit-onyx/icons";
import { computed, type HTMLAttributes } from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import type { OnyxIconButtonProps } from "../OnyxIconButton/types.js";
import OnyxStepper from "../OnyxStepper/OnyxStepper.vue";
import type { OnyxSliderControlProps } from "./types.js";

const props = defineProps<OnyxSliderControlProps>();

const emit = defineEmits<{
  /**
   * Emitted when the value changes.
   */
  "update:modelValue": [value: number];
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

const modelValue = useVModel({
  props,
  emit: emit,
  key: "modelValue",
});

const handleIconClick = () => {
  if (props.control !== "icon") return;
  const offset = props.direction === "increase" ? props.step : -props.step;
  modelValue.value += offset;
};

const handleStepperChange = (value?: Nullable<number>) => {
  if (value == undefined) return;
  modelValue.value = value;
};

const stepperLabel = computed(() => {
  if (props.control !== "input") return t.value("slider.changeValue");
  if (props.direction === "increase") return t.value("slider.changeStartValue");
  else if (props.direction === "decrease") return t.value("slider.changeEndValue");
  return t.value("slider.changeValue");
});

const sharedIconButtonProps = computed(() => {
  return {
    disabled: props.disabled,
    color: "neutral",
    // tabindex is set here because the icon buttons are only relevant for mouse users
    // so they should be ignored by keyboard / screen readers because the slider itself is already (keyboard) accessible.
    tabindex: -1,
    onClick: handleIconClick,
    onMousedown: (ev) => {
      // needed to not loose the tooltip focus when holding down the mouse during a click
      ev.preventDefault();
    },
  } satisfies Partial<OnyxIconButtonProps> & HTMLAttributes;
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-slider-control', densityClass]">
    <template v-if="props.control === 'value'">
      {{ modelValue }}
    </template>

    <template v-else-if="props.control === 'icon'">
      <OnyxIconButton
        v-if="props.direction === 'decrease'"
        v-bind="sharedIconButtonProps"
        :label="t('slider.decreaseValueBy', { n: props.step })"
        :icon="iconMinusSmall"
      />
      <OnyxIconButton
        v-else-if="props.direction === 'increase'"
        v-bind="sharedIconButtonProps"
        :label="t('slider.increaseValueBy', { n: props.step })"
        :icon="iconPlusSmall"
      />
    </template>

    <OnyxStepper
      v-else-if="props.control === 'input'"
      :label="stepperLabel"
      hide-label
      hide-buttons
      :disabled="props.disabled"
      :model-value="props.modelValue"
      :step-size="props.step"
      :min="props.min"
      :max="props.max"
      @update:model-value="handleStepperChange"
    />
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
