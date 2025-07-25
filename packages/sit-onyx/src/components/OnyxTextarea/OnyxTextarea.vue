<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { getFormMessages, useCustomValidity } from "../../composables/useCustomValidity.js";
import { useErrorClass } from "../../composables/useErrorClass.js";
import { useLenientMaxLengthValidation } from "../../composables/useLenientMaxLengthValidation.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import type { Nullable } from "../../types/index.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElement from "../OnyxFormElement/OnyxFormElement.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxTextareaProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTextareaProps>(), {
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
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
  "update:modelValue": [value: Nullable<string>];
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
const customError = computed(() => props.customError ?? maxLengthError.value);
const { vCustomValidity, errorMessages } = useCustomValidity({ props, emit, customError });

const { densityClass } = useDensity(props);
const successMessages = computed(() => getFormMessages(props.success));
const messages = computed(() => getFormMessages(props.message));

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

const { disabled, showError } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const errorClass = useErrorClass(showError);

const input = useTemplateRef("inputRef");
defineExpose({ input });
useAutofocus(input, props);
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-component', 'onyx-textarea-skeleton', densityClass]"
    :style="autosizeMinMaxStyles"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-textarea-skeleton__label" />
    <OnyxSkeleton class="onyx-textarea-skeleton__input" />
  </div>

  <div
    v-else
    :class="['onyx-component', 'onyx-textarea', errorClass, densityClass]"
    :style="autosizeMinMaxStyles"
    v-bind="rootAttrs"
  >
    <OnyxFormElement
      v-bind="props"
      :message="messages"
      :success-messages="successMessages"
      :error-messages="errorMessages"
    >
      <template #default="{ id: textareaId }">
        <div class="onyx-textarea__wrapper" :data-autosize-value="modelValue">
          <textarea
            :id="textareaId"
            ref="inputRef"
            v-model="modelValue"
            v-custom-validity
            class="onyx-textarea__native"
            :class="{ 'onyx-textarea__native--no-resize': props.disableManualResize }"
            :placeholder="props.placeholder"
            :required="props.required"
            :autocapitalize="props.autocapitalize"
            :autofocus="props.autofocus"
            :name="props.name"
            :readonly="props.readonly"
            :disabled="disabled"
            :minlength="props.minlength"
            :maxlength="maxLength"
            :aria-label="props.hideLabel ? props.label : undefined"
            :title="props.hideLabel ? props.label : undefined"
            v-bind="restAttrs"
            @input="handleInput"
          ></textarea>
        </div>
      </template>
    </OnyxFormElement>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-textarea,
.onyx-textarea-skeleton {
  --min-autosize-rows: 3;
  --max-autosize-rows: 10;
  --onyx-textarea-padding-vertical: var(--onyx-density-xs);

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
}

.onyx-textarea-skeleton {
  @include input.define-skeleton-styles($height: var(--min-height));
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
      padding: var(--onyx-textarea-padding-vertical) var(--onyx-density-sm);
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
