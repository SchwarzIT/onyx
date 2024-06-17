<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useCustomValidity } from "../../composables/useCustomValidity";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxTextareaProps } from "./types";

const props = withDefaults(defineProps<OnyxTextareaProps>(), {
  modelValue: "",
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  disabled: false,
  skeleton: false,
  disableManualResize: false,
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

const counterText = computed(() =>
  props.withCounter && props.maxlength ? `${value.value.length}/${props.maxlength}` : undefined,
);

/**
 * Current CSS variables for the autosize min/max height.
 */
const autosizeMinMaxStyles = computed(() => {
  if (!props.autosize) return;
  const min = props.autosize.min ? Math.max(props.autosize.min, 2) : undefined; // ensure min is not smaller than 2
  const max = props.autosize.max;
  return [min ? `--min-autosize-rows: ${min}` : "", `--max-autosize-rows: ${max ?? "unset"}`];
});

/**
 * Syncs the "data-autosize-value" on textarea input.
 * Is needed in order for the autosize to work when no v-model is bind to the OnyxTextarea.
 */
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  target.parentElement?.setAttribute("data-autosize-value", target.value);
};
</script>

<template>
  <div
    v-if="props.skeleton"
    :class="['onyx-textarea-skeleton', densityClass]"
    :style="autosizeMinMaxStyles"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-textarea-skeleton__label" />
    <OnyxSkeleton class="onyx-textarea-skeleton__input" />
  </div>

  <div v-else :class="['onyx-textarea', densityClass]" :style="autosizeMinMaxStyles">
    <OnyxFormElement
      v-bind="props"
      :label="!props.hideLabel ? props.label : undefined"
      :error-messages="errorMessages"
      :footer-right-text="counterText"
    >
      <div class="onyx-textarea__wrapper" :data-autosize-value="value">
        <!-- eslint-disable vuejs-accessibility/no-autofocus -
         We want to provide the flexibility to have the autofocus property.
         The JSDoc description includes a warning that it should be used carefully.
      -->
        <textarea
          v-model="value"
          v-custom-validity
          class="onyx-textarea__native"
          :class="{ 'onyx-textarea__native--no-resize': props.disableManualResize }"
          :placeholder="props.placeholder"
          :required="props.required"
          :autocapitalize="props.autocapitalize"
          :autofocus="props.autofocus"
          :name="props.name"
          :readonly="props.readonly"
          :disabled="props.disabled"
          :minlength="props.minlength"
          :maxlength="props.maxlength"
          :aria-label="props.hideLabel ? props.label : undefined"
          :title="props.hideLabel ? props.label : undefined"
          @input="handleInput"
          @change="handleChange"
          @focus="emit('focus')"
          @blur="emit('blur')"
        ></textarea>
        <!-- eslint-enable vuejs-accessibility/no-autofocus -->
      </div>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/input.scss";

.onyx-textarea,
.onyx-textarea-skeleton {
  --min-autosize-rows: 3;
  --max-autosize-rows: 10;

  --min-height: calc(var(--min-autosize-rows) * 1lh + 2 * var(--onyx-textarea-padding-vertical));
  --max-height: calc(var(--max-autosize-rows) * 1lh + 2 * var(--onyx-textarea-padding-vertical));

  // remove max height and disable auto-sizing if user resizes the textarea manually
  &:has(.onyx-textarea__native[style*="height"]) {
    --max-height: unset;

    .onyx-textarea__wrapper::after {
      // workaround for [#1142](https://github.com/SchwarzIT/onyx/issues/1142)
      // `display: none` or changing "content" causes user resizing to be interrupted
      height: 0;
    }
  }

  @include density.compact {
    --onyx-textarea-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-textarea-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-textarea-padding-vertical: var(--onyx-spacing-sm);
  }
}

.onyx-textarea-skeleton {
  @include input.define-skeleton-styles($height: var(--min-height));
}

/**
* Styles that are shared between the <textarea> and the ::after element of the wrapper
* that is used for the autosize feature.
*/
@mixin define-shared-autosize-styles() {
  grid-area: 1 / 1;
  height: 100%;
  min-height: var(--min-height);
  max-height: var(--max-height);
  padding: var(--onyx-textarea-padding-vertical) var(--onyx-spacing-sm);
}

.onyx-textarea {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-textarea",
      $vertical-padding: var(--onyx-textarea-padding-vertical)
    );

    &__wrapper {
      padding: 0;
      height: unset;
      display: grid;

      // auto-resize, based on: https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas
      &::after {
        @include define-shared-autosize-styles;
        /* Note the weird space! Needed to prevent jumpy behavior */
        content: attr(data-autosize-value) " ";
        white-space: pre-wrap; // this is how textarea text behaves
        visibility: hidden; // hidden from view, clicks, and screen readers
        overflow-wrap: anywhere;
      }
    }

    &__native {
      @include define-shared-autosize-styles;
      resize: vertical;

      &--no-resize {
        resize: none;
      }
    }
  }
}
</style>
