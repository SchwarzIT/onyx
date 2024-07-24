<script lang="ts" setup>
import minus from "@sit-onyx/icons/minus.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import { computed, ref } from "vue";
import { useDensity } from "../../composables/density";
import { useCustomValidity } from "../../composables/useCustomValidity";
import { injectI18n } from "../../i18n";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxStepperProps } from "./types";

const props = withDefaults(defineProps<OnyxStepperProps>(), {
  step: 1,
  stripStep: false,
  disabled: false,
  readonly: false,
  loading: false,
  skeleton: false,
});

const { t } = injectI18n();
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<{
  /** Emitted when the input value changes. */
  "update:modelValue": [value: number | undefined];
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

const handleClick = (direction: "stepUp" | "stepDown") => {
  if (!inputRef.value) return;

  inputRef.value[`${direction}`]();

  emit("update:modelValue", inputRef.value.valueAsNumber);
};

const incrementLabel = computed(() => t.value("stepper.increment", { stepSize: props.step }));
const decrementLabel = computed(() => t.value("stepper.decrement", { stepSize: props.step }));
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-stepper-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-stepper-skeleton__label" />
    <OnyxSkeleton class="onyx-stepper-skeleton__input" />
  </div>
  <div v-else :class="['onyx-stepper', densityClass]">
    <OnyxFormElement v-bind="props" :error-messages="errorMessages">
      <div class="onyx-stepper__wrapper">
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="
            (props.min && props.min === value) || props.disabled || props.readonly || props.loading
          "
          :aria-label="decrementLabel"
          @click="handleClick('stepDown')"
        >
          <OnyxIcon :icon="minus" />
        </button>
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-stepper__loading" type="circle" />
        <input
          v-else
          ref="inputRef"
          v-model.number="value"
          v-custom-validity
          class="onyx-stepper__native"
          type="number"
          :aria-label="props.label"
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
          @focus="emit('focus')"
          @blur="emit('blur')"
        />
        <button
          type="button"
          class="onyx-stepper__counter"
          :disabled="
            (props.max && props.max === value) || props.disabled || props.readonly || props.loading
          "
          :aria-label="incrementLabel"
          @click="handleClick('stepUp')"
        >
          <OnyxIcon :icon="plus" />
        </button>
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
      gap: 0;
      padding: 0;
      justify-content: space-between;

      &:has(.onyx-stepper__native:read-write) {
        &:has(#{get-autofill-selectors(".onyx-stepper__native")}) {
          background-color: var(--onyx-color-base-warning-100);
        }
      }
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
      -moz-appearance: textfield;
      text-align: center;

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
    }

    &:has(.onyx-stepper__native:enabled:read-write) {
      .onyx-stepper__counter {
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
