import { computed, ref, watch, watchEffect, type Directive } from "vue";
import { getFirstInvalidType, transformValidityStateToObject } from "../utils/validity";
import { areObjectsFlatEqual } from "../utils/objects";
import enUS from "../i18n/locales/en-US.json";
import { injectI18n } from "../i18n";

export type CustomValidityProp = {
  /**
   * Custom error message to show. Will only show up after the user has interacted with the input.
   */
  customError?: string;
};

export type UseCustomValidityOptions = {
  /**
   * Component props as defined with `const props = defineProps()`
   */
  props: CustomValidityProp & {
    modelValue?: unknown;
    type?: (typeof TRANSLATED_INPUT_TYPES)[number] | string;
    pattern?: string | RegExp;
    maxlength?: number;
    minlength?: number;
    min?: number;
    max?: number;
    step?: number;
  };
  /**
   * Component emit as defined with `const emit = defineEmits()`
   */
  emit: (evt: "validityChange", validity: ValidityState) => void;
};

export type InputValidationElement = Pick<HTMLInputElement, "validity" | "setCustomValidity">;

/**
 * Input types that have a translation for their validation error message.
 */
export const TRANSLATED_INPUT_TYPES = Object.keys(
  enUS.validations.typeMismatch,
) as (keyof typeof enUS.validations.typeMismatch)[];
export type TranslatedInputType = (typeof TRANSLATED_INPUT_TYPES)[number];

/**
 * Composable for unified handling of custom error messages for form components.
 * Will call `setCustomValidity()` accordingly and emit the "validityChange" event
 * whenever the input value / error changes.
 *
 * @example
 * ```html
 * <script lang="ts" setup>
 * const props = defineProps<CustomValidityProp>();
 * const emit = defineEmits<{ validityChange: [validity: ValidityState] }>();
 *
 * const { vCustomValidity } = useCustomValidity({ props, emit });
 * </script>
 *
 * <template>
 *  <input v-custom-validity />
 * </template>
 * ```
 */
export const useCustomValidity = (options: UseCustomValidityOptions) => {
  // TODO: #570 usage of "t" breaks the vitest test!
  const { t } = injectI18n();

  const validityState = ref<Record<keyof ValidityState, boolean>>();
  const isDirty = ref(false);

  /**
   * Sync isDirty state. The component is "dirty" when the value was modified at least once.
   */
  watch(
    () => options.props.modelValue,
    () => (isDirty.value = true),
    { once: true },
  );

  const vCustomValidity = {
    mounted: (el) => {
      /**
       * Sync custom error with the native input validity.
       */
      watchEffect(() => el.setCustomValidity(options.props.customError ?? ""));

      watch(
        [() => options.props.customError, () => options.props.modelValue],
        () => {
          const newValidityState = transformValidityStateToObject(el.validity);

          // do not emit update if input is valid and has never been invalid
          if (!validityState.value && newValidityState.valid) return;

          // ignore if actual validity state value is unchanged
          if (validityState.value && areObjectsFlatEqual(newValidityState, validityState.value)) {
            return;
          }

          validityState.value = newValidityState;
        },
        { immediate: true },
      );

      /**
       * Update validityState ref when the input changes.
       */
      watch(
        [() => options.props.customError, validityState, isDirty],
        () => {
          // do not emit validityChange event if the value was never changed
          if (!isDirty.value || !validityState.value) return;

          options.emit("validityChange", validityState.value);
        },
        { immediate: true },
      );
    },
  } satisfies Directive<InputValidationElement, undefined>;

  const errorMessages = computed<{ longMessage?: string; shortMessage: string }>(() => {
    if (!validityState.value || validityState.value.valid) return { shortMessage: "" };

    const errorType = getFirstInvalidType(validityState.value);
    // a custom error message always is considered first
    if (options.props.customError || errorType === "customError") {
      const message = options.props.customError ?? "";
      return { shortMessage: message, longMessage: message };
    }
    if (!errorType) return { shortMessage: "" };

    // if the error is "typeMismatch", we will use an error message depending on the type property
    if (errorType === "typeMismatch") {
      const type = TRANSLATED_INPUT_TYPES.includes(options.props.type as TranslatedInputType)
        ? (options.props.type as TranslatedInputType)
        : "generic";
      return {
        longMessage: t.value(`validations.typeMismatch.${type}`, {
          value: options.props.modelValue?.toString(),
        }),
        shortMessage: t.value(`validations.preview.typeMismatch.${type}`, {
          value: options.props.modelValue?.toString(),
        }),
      };
    }

    const validationData = {
      value: options.props.modelValue?.toString(),
      n: options.props.modelValue?.toString().length ?? 0,
      minLength: options.props.minlength,
      maxLength: options.props.maxlength,
      min: options.props.min,
      max: options.props.max,
      step: options.props.step,
    };

    return {
      longMessage: t.value(`validations.${errorType}`, validationData),
      shortMessage: t.value(`validations.preview.${errorType}`, validationData),
    };
  });

  return {
    /**
     * Directive to set the custom error message and emit validityChange event.
     */
    vCustomValidity,
    // TODO: add tests
    errorMessages,
  };
};
