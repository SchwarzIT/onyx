<script lang="ts" setup>
import minus from "@sit-onyx/icons/minus.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { injectI18n } from "../../i18n";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxStepperProps } from "./types";

const props = withDefaults(defineProps<OnyxStepperProps>(), {
  modelValue: 0,
  step: 1,
  stripStep: false,
  placeholder: "0",
  disabled: false,
  readonly: false,
  loading: false,
  skeleton: false,
});

const { t } = injectI18n();

const emit = defineEmits<{
  /** Emitted when the input value changes. */
  "update:modelValue": [value: number];
  /**
   * Emitted when the current value changes but only when the input is blurred.
   */
  change: [value: number];
  /**
   * Emitted when the input is focussed.
   */
  focus: [];
  /**
   * Emitted when the input is blurred.
   */
  blur: [];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit });

const { densityClass } = useDensity(props);

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleChange = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).valueAsNumber;
  emit("update:modelValue", inputValue);
};

const handleCounterButton = (event: Event, operation: "add" | "substract") => {
  event.preventDefault();
  if (props.disabled || props.readonly || props.loading) return;

  if (operation === "add") {
    const newValue = value.value + props.step;

    if (props.max && newValue > props.max) return;
    value.value = value.value + props.step;
  } else {
    const newValue = value.value - props.step;

    if (props.min && newValue < props.min) return;
    value.value = value.value - props.step;
  }
};
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-stepper-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-stepper-skeleton__label" />
    <OnyxSkeleton class="onyx-stepper-skeleton__input" />
  </div>
  <div v-else :class="['onyx-stepper', densityClass]">
    <OnyxFormElement v-bind="props" :error-messages="errorMessages">
      <div class="onyx-stepper__wrapper">
        <span
          tabindex="0"
          role="button"
          class="onyx-stepper__counter"
          :class="{ 'onyx-stepper__counter--disabled': props.min && props.min === value }"
          :aria-label="t('substract')"
          @click="handleCounterButton($event, 'substract')"
          @keydown.enter="handleCounterButton($event, 'substract')"
        >
          <OnyxIcon :icon="minus" />
        </span>
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-stepper__loading" type="circle" />
        <input
          v-else
          v-model="value"
          v-custom-validity
          class="onyx-stepper__native"
          type="number"
          :aria-label="props.hideLabel ? props.label : undefined"
          :autofocus="props.autofocus"
          :disabled="props.disabled || props.loading"
          :min="props.min"
          :max="props.max"
          :name="props.name"
          :placeholder="props.placeholder"
          :readonly="props.readonly"
          :required="props.required"
          :step="props.step"
          :title="props.hideLabel ? props.label : undefined"
          @change="handleChange"
          @focus="emit('focus')"
          @blur="emit('blur')"
        />
        <span
          tabindex="0"
          role="button"
          class="onyx-stepper__counter"
          :class="{ 'onyx-stepper__counter--disabled': props.max && props.max === value }"
          :aria-label="t('add')"
          @click="handleCounterButton($event, 'add')"
          @keydown.enter="handleCounterButton($event, 'add')"
        >
          <OnyxIcon :icon="plus" />
        </span>
      </div>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers";
@use "../../styles/mixins/input.scss";

/**
* Gets a comma separated CSS selector for the input autofill.
* Includes default browser selectors as well as some specific selectors e.g. for certain password managers.
*/
@function get-autofill-selectors($prefix: "") {
  $output: "";
  $selectors: (":autofill", "[data-test-autofill]", "[data-com-onepassword-filled]");

  @each $selector in $selectors {
    $prefixed-selector: $prefix + $selector;

    @if $output == "" {
      $output: $prefixed-selector;
    } @else {
      $output: $output + ", " + $prefixed-selector;
    }
  }

  @return $output;
}

.onyx-stepper,
.onyx-stepper-skeleton {
  @include density.compact {
    --onyx-stepper-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-stepper-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-stepper-padding-vertical: var(--onyx-spacing-sm);
  }
}

.onyx-stepper-skeleton {
  @include input.define-skeleton-styles(
    $height: calc(1lh + 2 * var(--onyx-stepper-padding-vertical))
  );
}

.onyx-stepper {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-stepper",
      $vertical-padding: var(--onyx-stepper-padding-vertical)
    );

    &__wrapper {
      &:has(.onyx-stepper__native:read-write) {
        &:has(#{get-autofill-selectors(".onyx-stepper__native")}) {
          background-color: var(--onyx-color-base-warning-100);
        }
      }

      gap: 0;
      padding: 0;
      justify-content: space-between;
    }

    &__counter {
      border: none;
      height: 100%;
      background-color: transparent;
      color: inherit;
      display: inline-flex;
      align-items: center;
      padding: var(--onyx-stepper-padding-vertical);
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      outline: none;
    }

    &__native {
      #{get-autofill-selectors("&")} {
        background-color: transparent;
        -webkit-text-fill-color: var(--onyx-color-text-icons-neutral-intense);

        // many browsers use "!important" to set the autofill background so we need this
        // transition workaround to make the background transparent
        transition: background-color calc(infinity * 1s);
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      -moz-appearance: textfield;
      text-align: center;
    }

    &:has(.onyx-stepper__native:enabled):has(.onyx-stepper__native:read-write) {
      .onyx-stepper__counter:not(.onyx-stepper__counter--disabled) {
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

        &:first-child {
          border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
        }
      }
    }
  }
}
</style>
