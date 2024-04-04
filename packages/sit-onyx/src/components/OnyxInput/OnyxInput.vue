<script lang="ts" setup>
import { computed } from "vue";
import OnyxLoadingIndicator from "../OnyxLoadingIndicator/OnyxLoadingIndicator.vue";
import type { OnyxInputProps } from "./types";
import { useRequired } from "../../composables/required";
import { useDensity } from "../../composables/density";

const props = withDefaults(defineProps<OnyxInputProps>(), {
  modelValue: "",
  type: "text",
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  disabled: false,
  loading: false,
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
}>();

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
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

const shouldShowCounter = computed(() => props.withCounter && props.maxlength);
</script>

<template>
  <div :class="['onyx-input', requiredTypeClass, densityClass]">
    <label>
      <div
        v-if="!props.hideLabel"
        :class="['onyx-input__label', 'onyx-text--small', requiredMarkerClass]"
      >
        <div class="onyx-truncation-ellipsis">{{ props.label }}</div>
      </div>

      <div class="onyx-input__wrapper">
        <OnyxLoadingIndicator v-if="props.loading" class="onyx-input__loading" type="circle" />

        <!-- eslint-disable vuejs-accessibility/no-autofocus -
         We want to provide the flexibility to have the autofocus property.
         The JSDoc description includes a warning that it should be used carefully.
      -->
        <input
          v-model="value"
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
    </label>

    <div v-if="props.message || shouldShowCounter" class="onyx-input__footer onyx-text--small">
      <span v-if="props.message" class="onyx-truncation-ellipsis">{{ props.message }}</span>
      <span v-if="shouldShowCounter" class="onyx-input__counter">
        {{ value.length }}/{{ props.maxlength }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/styles/mixins/layers.scss";
@use "@/styles/mixins/density.scss";

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

.onyx-input {
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

.onyx-input {
  @include layers.component() {
    --border-color: var(--onyx-color-base-neutral-300);
    --selection-color: var(--onyx-color-base-primary-200);

    font-family: var(--onyx-font-family);
    display: block;
    flex-direction: column;
    gap: var(--onyx-spacing-5xs);

    &__label {
      display: flex;
      margin-bottom: var(--onyx-spacing-5xs);
      color: var(--onyx-color-text-icons-neutral-medium);

      // optional marker should be displayed at the very end of the label
      &.onyx-optional-marker {
        justify-content: space-between;
      }
    }

    $line-height: 1.5rem;

    &__wrapper {
      border-radius: var(--onyx-radius-sm);
      border: var(--onyx-1px-in-rem) solid var(--border-color);
      background-color: var(--onyx-color-base-background-blank);
      color: var(--onyx-color-text-icons-neutral-intense);

      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-2xs);

      font-size: 1rem;
      line-height: $line-height;

      padding: var(--onyx-input-padding-vertical) var(--onyx-spacing-sm);
      height: calc($line-height + 2 * var(--onyx-input-padding-vertical));

      &:has(.onyx-input__native:read-write:hover) {
        border-color: var(--onyx-color-base-primary-400);
      }

      &:has(.onyx-input__native:enabled:focus) {
        --border-color: var(--onyx-color-base-primary-500);
        outline: var(--onyx-spacing-4xs) solid var(--onyx-color-base-primary-200);
      }

      // :read-only is valid for readonly and disabled state so we put shared styles for both states here
      &:has(.onyx-input__native:read-only) {
        --selection-color: var(--onyx-color-base-neutral-200);
        background-color: var(--onyx-color-base-background-tinted);
      }

      // styles for readonly but NOT disabled
      &:has(.onyx-input__native:enabled:read-only) {
        &:has(.onyx-input__native:hover) {
          --border-color: var(--onyx-color-base-neutral-400);
        }

        &:has(.onyx-input__native:focus) {
          --border-color: var(--onyx-color-base-neutral-500);
          outline-color: var(--onyx-color-base-neutral-200);
        }
      }

      &:has(.onyx-input__native:read-write) {
        &:has(#{get-autofill-selectors(".onyx-input__native")}) {
          background-color: var(--onyx-color-base-warning-100);
        }
      }
    }

    &__native {
      // reset native input styles so they are inherited from the parent
      border: none;
      border-radius: inherit;
      background-color: transparent;
      color: inherit;
      width: 100%;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      padding: 0;

      &::placeholder {
        color: var(--onyx-color-text-icons-neutral-soft);
        font-weight: 400;
        opacity: 1;
      }

      &::selection {
        background: var(--selection-color);
      }

      #{get-autofill-selectors("&")} {
        background-color: transparent;
        -webkit-text-fill-color: var(--onyx-color-text-icons-neutral-intense);

        // many browsers use "!important" to set the autofill background so we need this
        // transition workaround to make the background transparent
        transition: background-color calc(infinity * 1s);
      }
    }

    &:has(&__native:disabled) {
      .onyx-input {
        &__label {
          color: var(--onyx-color-text-icons-neutral-soft);
        }

        &__wrapper {
          color: var(--onyx-color-text-icons-neutral-soft);
        }
      }
    }

    &__loading {
      color: var(--onyx-color-text-icons-primary-intense);
    }

    &__footer {
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-2xs);
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &__counter {
      text-align: right;
      flex-grow: 1;
    }
  }
}
</style>
