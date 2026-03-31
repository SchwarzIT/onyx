<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useFormElementError } from "../../composables/useFormElementError.js";
import { useLenientMaxLengthValidation } from "../../composables/useLenientMaxLengthValidation.js";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import type { OnyxTextareaProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTextareaProps>(), {
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  disableManualResize: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the input value changes.
   */
  "update:modelValue": [value: string];
}>();

/**
 * Current value of the textarea.
 */
const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
  default: "",
});

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();

const { maxLength, maxLengthError } = useLenientMaxLengthValidation({ props, modelValue });
const error = computed(() => props.error ?? maxLengthError.value);
const { vCustomValidity, errorMessages } = useFormElementError({ props, emit, error });
const { formElementV2Props } = useLegacyFormElementProps({ props, errorMessages });

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

const { disabled } = useFormContext(props);

const input = useTemplateRef("input");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <OnyxFormElementV2
    class="onyx-textarea"
    v-bind="mergeVueProps(formElementV2Props, rootAttrs)"
    :style="autosizeMinMaxStyles"
  >
    <template #default="inputProps">
      <div class="onyx-textarea__wrapper" :data-autosize-value="modelValue">
        <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -- provided by "inputProps" -->
        <textarea
          v-bind="mergeVueProps(inputProps, restAttrs)"
          v-model="modelValue"
          v-custom-validity
          :class="[
            'onyx-textarea__native',
            { 'onyx-textarea__native--no-resize': props.disableManualResize },
          ]"
          :placeholder="props.placeholder"
          :required="props.required"
          :autocapitalize="props.autocapitalize"
          :autofocus="props.autofocus"
          :name="props.name"
          :readonly="props.readonly"
          :disabled
          :minlength="props.minlength"
          :maxlength="maxLength"
          @input="handleInput"
        />
      </div>
    </template>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-textarea {
  @include layers.component() {
    --min-autosize-rows: 3;
    --max-autosize-rows: 10;
    --min-height: calc(
      var(--min-autosize-rows) * 1lh + 2 * var(--onyx-form-element-v2-padding-block)
    );
    --max-height: calc(
      var(--max-autosize-rows) * 1lh + 2 * var(--onyx-form-element-v2-padding-block)
    );

    --onyx-form-element-v2-content-height: calc(1lh * var(--min-autosize-rows));

    // remove max height and disable auto-sizing if user resizes the textarea manually
    &:has(.onyx-textarea__native[style*="height"]) {
      --max-height: unset;

      .onyx-textarea__wrapper::after {
        // workaround for [#1142](https://github.com/SchwarzIT/onyx/issues/1142)
        // `display: none` or changing "content" causes user resizing to be interrupted
        height: 0;
      }
    }
  }
}

.onyx-textarea {
  @include layers.component() {
    &__wrapper {
      padding: 0;
      display: grid;
      width: 100%;
      height: 100%;

      // auto-resize, based on: https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas
      &::after {
        /* Note the weird space! Needed to prevent jumpy behavior */
        content: attr(data-autosize-value) " ";
        white-space: pre-wrap; // this is how textarea text behaves
        visibility: hidden; // hidden from view, clicks, and screen readers
        overflow-wrap: anywhere;
        overflow-y: hidden;
      }
    }

    /**
     * Styles that are shared between the <textarea> and the ::after element of the wrapper
     * that is used for the autosize feature.
     */
    &__wrapper:after,
    &__native {
      grid-area: 1 / 1;
      height: 100%;
      min-height: var(--min-height);
      max-height: var(--max-height);
      padding: var(--onyx-form-element-v2-padding-block) var(--onyx-form-element-v2-padding-inline);
    }

    &__native {
      resize: vertical;

      &--no-resize {
        resize: none;
      }
    }
  }
}
</style>
