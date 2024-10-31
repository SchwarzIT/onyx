import { computed, ref, watch, watchEffect, type Directive } from "vue";
import type { InputType } from "../components/OnyxInput/types";
import { injectI18n } from "../i18n";
import enUS from "../i18n/locales/en-US.json";
import type { BaseSelectOption } from "../types";
import { areObjectsFlatEqual } from "../utils/objects";
import { getFirstInvalidType, transformValidityStateToObject } from "../utils/validity";

export type CustomMessageType = string | FormMessages;

export type CustomValidityProp = {
  /**
   * Custom error message to show. Will only show up after the user has interacted with the input.
   */
  customError?: CustomMessageType;
  /**
   * Custom success message to show. Will only show up after the user has interacted with the input.
   */
  customSuccess?: CustomMessageType;
};

export type UseCustomValidityOptions = {
  /**
   * Component props as defined with `const props = defineProps()`
   */
  props: CustomValidityProp & {
    modelValue?: unknown;
    type?: InputType;
    maxlength?: number;
    minlength?: number;
    min?: number;
    max?: number;
    precision?: number;
  } & Pick<BaseSelectOption, "hideLabel" | "label">;
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
 * Translated messages that inform about the validity state of form components
 */
export type FormMessages = {
  /**
   * A short message preview to inform the user about the validity state
   */
  shortMessage: string;
  /**
   * An extended informative message to provide more info
   */
  longMessage?: string;
};

/**
 * Transforms a customMessage into the format needed to display an error preview and extended message
 */
export const getCustomMessages = (customMessage?: CustomMessageType): FormMessages | undefined => {
  if (!customMessage) return;
  if (typeof customMessage === "string") {
    // we can't guarantee a custom error message will be short,
    // so in case it overflows, by adding it to "longMessage",
    // it will still be visible in a tooltip
    return { shortMessage: customMessage, longMessage: customMessage };
  }
  return customMessage;
};

/**
 * Returns a string combining short + long message or just the customMessage if it was provided as single string.
 * Will be used e.g. for customInvalidity and showing a tooltip e.g. in RadioButtons
 */
export const getCustomText = (customError?: CustomMessageType): string | undefined => {
  if (!customError) return;
  if (typeof customError === "string") {
    return customError;
  }
  if (customError.shortMessage === customError.longMessage) {
    return customError.shortMessage;
  }
  const { shortMessage, longMessage } = customError;
  return `${shortMessage}: ${longMessage}`;
};

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
      watchEffect(() => el.setCustomValidity(getCustomText(options.props.customError) ?? ""));

      watch(
        // we need to watch all props instead of only modelValue so the validity is re-checked
        // when the validation rules change
        [() => options.props],
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
        { immediate: true, deep: true },
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

  const errorMessages = computed<FormMessages | undefined>(() => {
    if (!validityState.value || validityState.value.valid) return;

    const errorType = getFirstInvalidType(validityState.value);
    const customErrors = getCustomMessages(options.props.customError);
    // a custom error message always is considered first
    if (customErrors || errorType === "customError") {
      if (!customErrors) return;
      return customErrors;
    }
    if (!errorType) return;

    // if the error is "typeMismatch", we will use an error message depending on the type property
    if (errorType === "typeMismatch") {
      const type = TRANSLATED_INPUT_TYPES.includes(options.props.type as TranslatedInputType)
        ? (options.props.type as TranslatedInputType)
        : "generic";
      return {
        longMessage: t.value(`validations.typeMismatch.${type}.fullError`, {
          value: options.props.modelValue?.toString(),
        }),
        shortMessage: t.value(`validations.typeMismatch.${type}.preview`),
      };
    }

    const validationData = {
      value: options.props.modelValue?.toString(),
      n: options.props.modelValue?.toString().length ?? 0,
      minLength: options.props.minlength,
      maxLength: options.props.maxlength,
      min: options.props.min,
      max: options.props.max,
      step: options.props.precision,
    };

    return {
      longMessage: t.value(`validations.${errorType}.fullError`, validationData),
      shortMessage: t.value(`validations.${errorType}.preview`),
    };
  });

  const successMessages = computed<FormMessages | undefined>(() => {
    if (validityState.value === undefined || !validityState.value.valid) return;

    const errorType = getFirstInvalidType(validityState.value);
    const customErrors = getCustomMessages(options.props.customError);

    // a custom error message always is considered first
    if (customErrors || errorType === "customError") {
      if (customErrors) return;
    }

    const customSuccess = getCustomMessages(options.props.customSuccess);

    return customSuccess;
  });

  return {
    /**
     * Directive to set the custom error message and emit validityChange event.
     */
    vCustomValidity,
    /**
     * A custom error or the default translation of the first invalid state if one exists.
     */
    errorMessages,
    /**
     * A custom success message if provided by the user.
     */
    successMessages,
  };
};
