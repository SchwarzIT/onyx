<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useCustomValidity } from "../../composables/useCustomValidity";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxInputProps } from "./types";

const props = withDefaults(defineProps<OnyxInputProps>(), {
  modelValue: "",
  type: "text",
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  disabled: false,
  loading: false,
  skeleton: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the current value changes but only when the input is blurred.
   */
  change: [value: string];
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
  const inputValue = (event.target as HTMLInputElement).value;
  emit("change", inputValue);
};

const patternSource = computed(() => {
  if (props.pattern instanceof RegExp) return props.pattern.source;
  return props.pattern;
});

const counterText = computed(() =>
  props.withCounter && props.maxlength ? `${value.value.length}/${props.maxlength}` : undefined,
);
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-input-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-input-skeleton__label" />
    <OnyxSkeleton class="onyx-input-skeleton__input" />
  </div>

  <div v-else :class="['onyx-input', densityClass]">
    <OnyxFormElement
      v-bind="props"
      :label="!props.hideLabel ? props.label : undefined"
      :error-messages="errorMessages"
      :footer-right-text="counterText"
    >
      <div class="onyx-input__wrapper">
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-input__loading" type="circle" />

        <!-- eslint-disable vuejs-accessibility/no-autofocus -
         We want to provide the flexibility to have the autofocus property.
         The JSDoc description includes a warning that it should be used carefully.
      -->
        <input
          v-model="value"
          v-custom-validity
          class="onyx-input__native"
          :placeholder="props.placeholder"
          :type="props.type"
          :required="props.required"
          :autocapitalize="props.autocapitalize"
          :autocomplete="props.autocomplete"
          :autofocus="props.autofocus"
          :name="props.name"
          :pattern="patternSource"
          :readonly="props.readonly"
          :disabled="props.disabled || props.loading"
          :minlength="props.minlength"
          :maxlength="props.maxlength"
          :aria-label="props.hideLabel ? props.label : undefined"
          :title="props.hideLabel ? props.label : undefined"
          @change="handleChange"
          @focus="emit('focus')"
          @blur="emit('blur')"
        />
        <!-- eslint-enable vuejs-accessibility/no-autofocus -->
      </div>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";
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

.onyx-input,
.onyx-input-skeleton {
  @include density.compact {
    --onyx-input-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-input-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-input-padding-vertical: var(--onyx-spacing-sm);
  }
}

.onyx-input-skeleton {
  @include input.define-skeleton-styles(
    $height: calc(1lh + 2 * var(--onyx-input-padding-vertical))
  );
}

.onyx-input {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-input",
      $vertical-padding: var(--onyx-input-padding-vertical)
    );

    &__wrapper {
      &:has(.onyx-input__native:read-write) {
        &:has(#{get-autofill-selectors(".onyx-input__native")}) {
          background-color: var(--onyx-color-base-warning-100);
        }
      }
    }

    &__native {
      #{get-autofill-selectors("&")} {
        background-color: transparent;
        -webkit-text-fill-color: var(--onyx-color-text-icons-neutral-intense);

        // many browsers use "!important" to set the autofill background so we need this
        // transition workaround to make the background transparent
        transition: background-color calc(infinity * 1s);
      }
    }

    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
    }
  }
}
</style>
