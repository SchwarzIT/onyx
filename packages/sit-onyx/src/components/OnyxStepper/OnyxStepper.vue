<script lang="ts" setup>
import { iconMinus, iconPlus } from "@sit-onyx/icons";
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { applyLimits, roundToPrecision } from "../../utils/numbers.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { OnyxFormElementV2Slots } from "../OnyxFormElementV2/types.js";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxStepperProps } from "./types.js";

const props = withDefaults(defineProps<OnyxStepperProps>(), {
  stepSize: 1,
  readonly: false,
  loading: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  hideButtons: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * update modeValue
   */
  "update:modelValue": [value?: Nullable<number>];
}>();

const slots =
  defineSlots<
    Pick<
      OnyxFormElementV2Slots,
      "leading" | "leadingIcons" | "trailingIcons" | "trailing" | "bottomRight"
    >
  >();

const { t, locale } = injectI18n();
const input = useTemplateRef("input");

const { disabled } = useFormContext(props);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit });
const { formElementV2Props } = useLegacyFormElementProps({ props, errorMessages });

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

/**
 * Used to detect user interaction to simulate the behavior of :user-invalid for the native input
 * because the native browser :user-invalid does not trigger when the value is changed via Arrow up/down or increase/decrease buttons
 */
const wasTouched = ref(false);

const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
});

/**
 * Used for syncing the actual input value.
 * We use string to be able to control the number of decimal places.
 */
const inputValue = ref<string>();
const displayValue = computed(() => getDisplayValue.value(modelValue.value));
const getFormattedValue = computed(() => {
  return (value?: Nullable<number>) => {
    if (value != undefined && isNaN(value)) return "";

    // using "!=" here to check for both undefined and null
    if (props.precision !== undefined && value != undefined) {
      return roundToPrecision(value, props.precision);
    } else {
      return value?.toString() ?? "";
    }
  };
});
const getDisplayValue = computed(() => {
  return (value: Nullable<number>) => {
    if (value == undefined || Number.isNaN(value)) return "";
    if (props.formatNumber) {
      if (typeof props.formatNumber === "boolean") {
        if (props.precision) {
          return value.toLocaleString(locale.value, {
            minimumFractionDigits: props.precision,
            maximumFractionDigits: props.precision,
          });
        }
        return value.toLocaleString(locale.value);
      } else {
        return props.formatNumber(value);
      }
    }
    if (props.precision) {
      return roundToPrecision(value, props.precision);
    }
    return String(value);
  };
});

watchEffect(() => {
  inputValue.value = getFormattedValue.value(modelValue.value);
});

const handleClick = (direction: "stepUp" | "stepDown") => {
  wasTouched.value = true;
  const currentValue = modelValue.value || 0;
  const stepValue = (direction === "stepUp" ? 1 : -1) * props.stepSize;
  const newValue = parseFloat(getFormattedValue.value(currentValue + stepValue));
  modelValue.value = applyLimits(newValue, props.min, props.max);
};

const handleChange = () => {
  wasTouched.value = true;
  if (inputValue.value == undefined) {
    modelValue.value = undefined;
    return;
  }
  inputValue.value = getFormattedValue.value(parseFloat(inputValue.value));
  const parsedValue = parseFloat(inputValue.value);
  modelValue.value = isNaN(parsedValue) ? undefined : parsedValue;
};

const handleBlur = () => {
  // Reformat the value on blur
  inputValue.value = getFormattedValue.value(modelValue.value);
};

const incrementLabel = computed(() => t.value("stepper.increment", { stepSize: props.stepSize }));
const decrementLabel = computed(() => t.value("stepper.decrement", { stepSize: props.stepSize }));

const showButtons = computed(() => !(props.hideButtons || slots.leading || slots.trailing));

defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <OnyxFormElementV2 v-bind="mergeVueProps(formElementV2Props, rootAttrs)" class="onyx-stepper">
    <template #default="inputProps">
      <div class="onyx-stepper__display-wrapper">
        <p class="onyx-stepper__display" aria-hidden="true">
          {{ displayValue }}
        </p>

        <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -- provided by inputProps -->
        <input
          v-bind="mergeVueProps(inputProps, restAttrs)"
          ref="input"
          v-model="inputValue"
          v-custom-validity
          :class="['onyx-stepper__input', { 'onyx-form-element-v2__input--touched': wasTouched }]"
          type="number"
          :autofocus="props.autofocus"
          :disabled="disabled || props.loading"
          :min="props.min"
          :max="props.max"
          :name="props.name"
          :placeholder="props.placeholder"
          :readonly="props.readonly"
          :required="props.required"
          :step="props.validStepSize ?? 'any'"
          @change="handleChange"
          @blur="handleBlur"
          @focusin="(e) => (e.target as HTMLInputElement)?.select()"
          @keydown.up.prevent="handleClick('stepUp')"
          @keydown.down.prevent="handleClick('stepDown')"
        />
      </div>
    </template>

    <template v-if="showButtons || slots.leading" #leading>
      <slot name="leading">
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="
            disabled ||
            readonly ||
            props.loading ||
            (props.min !== undefined &&
              modelValue !== undefined &&
              modelValue !== null &&
              modelValue <= props.min)
          "
          :aria-label="decrementLabel"
          tabindex="-1"
          @click="handleClick('stepDown')"
        >
          <OnyxIcon :icon="iconMinus" />
        </button>
      </slot>
    </template>

    <template v-if="showButtons || slots.trailing" #trailing>
      <slot name="trailing">
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="
            disabled ||
            readonly ||
            props.loading ||
            (props.max !== undefined &&
              modelValue !== undefined &&
              modelValue !== null &&
              modelValue >= props.max)
          "
          :aria-label="incrementLabel"
          tabindex="-1"
          @click="handleClick('stepUp')"
        >
          <OnyxIcon :icon="iconPlus" />
        </button>
      </slot>
    </template>

    <template v-if="slots.leadingIcons" #leadingIcons>
      <slot name="leadingIcons"></slot>
    </template>

    <template v-if="slots.trailingIcons" #trailingIcons>
      <slot name="trailingIcons"></slot>
    </template>

    <template v-if="slots.bottomRight" #bottomRight>
      <slot name="bottomRight"></slot>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-stepper {
  @include layers.component() {
    --onyx-stepper-text-align: center;

    &__counter {
      border: none;
      height: 100%;
      background-color: transparent;
      color: var(--onyx-color-text-icons-neutral-medium);
      display: inline-flex;
      align-items: center;
      padding: var(--onyx-form-element-v2-padding-block);
      border-radius: inherit;
      outline: none;

      &:enabled {
        cursor: pointer;

        &:hover,
        &:focus-visible {
          color: var(--onyx-color-text-icons-primary-intense);
        }

        &:focus-visible {
          outline: none;
          background-color: var(--onyx-color-base-primary-100);
        }

        &:active {
          background-color: var(--onyx-color-base-primary-100);
        }
      }

      &:disabled {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    &__input {
      text-align: var(--onyx-stepper-text-align);

      &:not(:focus-visible) {
        color: transparent;
      }
    }

    .onyx-form-element-v2__input-container {
      &:has(.onyx-form-element-v2__icons--leading) .onyx-stepper__display {
        padding-left: var(--onyx-form-element-v2-padding-inline-icons);
      }

      &:has(.onyx-form-element-v2__icons--trailing) .onyx-stepper__display {
        padding-right: var(--onyx-form-element-v2-padding-inline-icons);
      }
    }

    &__display-wrapper {
      position: relative;
      width: 100%;
    }

    &__display {
      position: absolute;
      height: 100%;
      width: 100%;
      color: var(--onyx-color-text-icons-neutral-intense);
      pointer-events: none;
      display: flex;
      justify-content: var(--onyx-stepper-text-align);
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      padding: var(--onyx-form-element-v2-padding-block) var(--onyx-form-element-v2-padding-inline);

      &:has(+ .onyx-stepper__input:focus-visible) {
        display: none;
      }
    }
  }
}
</style>
