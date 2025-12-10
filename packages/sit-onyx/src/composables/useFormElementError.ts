import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";
import type { DateValue, OnyxDatePickerProps } from "../components/OnyxDatePicker/types.js";
import type { InputType } from "../components/OnyxInput/types.js";
import { injectI18n } from "../i18n/index.js";
import enUS from "../i18n/locales/en-US.json";
import { isValidDate } from "../utils/date.js";
import { getFirstInvalidType } from "../utils/validity.js";
import { useCustomValidity, type UseFormValidityOptions } from "./useCustomValidity.js";
import type { MaxLength } from "./useLenientMaxLengthValidation.js";

export type CustomMessageType = string | FormMessages;

export type FormMessages = {
  /**
   * A short message preview to inform the user about the input state.
   * It's usually shown directly underneath the input field.
   */
  shortMessage: string;
  /**
   * An extended informative message to provide more details.
   * It's usually shown in a tooltip next to the shortMessage.
   */
  longMessage?: string;
  /**
   * Will visually hide the message.
   */
  hidden?: boolean;
};
export type CustomValidityProp = {
  /**
   * Custom error message to show. Takes precedence over intrinsic error messages.
   */
  error?: CustomMessageType;
};

export type FormValidationProps = {
  error?: CustomMessageType;
  modelValue?: unknown;
  type?: InputType | OnyxDatePickerProps["type"];
  maxlength?: MaxLength;
  minlength?: number;
  min?: DateValue;
  max?: DateValue;
  validStepSize?: number;
};

export type UseFormElementErrorOptions = Omit<
  UseFormValidityOptions<FormValidationProps>,
  "error"
> & {
  props: FormValidationProps;
  error?: MaybeRefOrGetter<CustomMessageType | undefined>;
};

/**
 * Input types that have a translation for their validation error message.
 */
export const TRANSLATED_INPUT_TYPES = Object.keys(
  enUS.validations.typeMismatch,
) as (keyof typeof enUS.validations.typeMismatch)[];
export type TranslatedInputType = (typeof TRANSLATED_INPUT_TYPES)[number];

/**
 * Transforms a customMessage into the format needed to display an error preview and extended message
 */
export const getFormMessages = (customMessage?: CustomMessageType): FormMessages | undefined => {
  if (!customMessage) return;
  if (typeof customMessage === "string") {
    // we can't guarantee a custom message will be short,
    // so in case it overflows, by adding it to "longMessage",
    // it will still be visible in a tooltip
    return { shortMessage: customMessage, longMessage: customMessage, hidden: false };
  }
  return customMessage;
};

/**
 * Returns a string combining short + long message or just the customMessage if it was provided as single string.
 * Will be used e.g. for customInvalidity and showing a tooltip e.g. in RadioButtons
 */
export const getFormMessageText = (error?: CustomMessageType): string | undefined => {
  if (!error) return;
  if (typeof error === "string") {
    return error;
  }
  if (error.shortMessage === error.longMessage) {
    return error.shortMessage;
  }
  const { shortMessage, longMessage } = error;
  return `${shortMessage}: ${longMessage}`;
};

export const useFormElementError = (options: UseFormElementErrorOptions) => {
  const { t, locale } = injectI18n();
  const isDirty = ref(false);

  const { vCustomValidity, validityState } = useCustomValidity({
    error: computed(() => getFormMessageText(options.props.error || toValue(options.error))),
    props: options.props,
  });

  /**
   * Sync isDirty state. The component is "dirty" when the value was modified at least once.
   */
  watch(
    () => options.props.modelValue,
    () => (isDirty.value = true),
    { once: true },
  );

  watch(
    [validityState, isDirty],
    () => {
      // do not emit validityChange event if the value was never changed
      if (!isDirty.value || !validityState.value) return;
      options.emit("validityChange", validityState.value);
    },
    { immediate: true },
  );

  const errorMessages = computed<FormMessages | undefined>(() => {
    if (!validityState.value || validityState.value.valid) return;
    const errorType = getFirstInvalidType(validityState.value);
    const errors = getFormMessages(options.props.error || toValue(options.error));

    // a custom error message always is considered first
    if (errors || errorType === "customError") {
      if (!errors) return;
      return errors;
    }
    if (!errorType) return;
    const maxlength =
      typeof options.props.maxlength === "object"
        ? options.props.maxlength.max
        : options.props.maxlength;
    const validationData = {
      value: options.props.modelValue?.toString(),
      n: options.props.modelValue?.toString().length ?? 0,
      minLength: options.props.minlength,
      maxLength: maxlength,
      min: formatMinMax(locale.value, options.props.type, options.props.min),
      max: formatMinMax(locale.value, options.props.type, options.props.max),
      step: options.props.validStepSize,
    };
    // if the error is "typeMismatch", we will use an error message depending on the type property
    if (errorType === "typeMismatch") {
      const type = TRANSLATED_INPUT_TYPES.includes(options.props.type as TranslatedInputType)
        ? (options.props.type as TranslatedInputType)
        : "generic";
      return {
        longMessage: t.value(`validations.typeMismatch.${type}.fullError`, validationData),
        shortMessage: t.value(`validations.typeMismatch.${type}.preview`, validationData),
      };
    }
    return {
      longMessage: t.value(`validations.${errorType}.fullError`, validationData),
      shortMessage: t.value(`validations.${errorType}.preview`, validationData),
    };
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
  };
};

const formatMinMax = (
  locale: string,
  type: UseFormElementErrorOptions["props"]["type"],
  value?: DateValue,
): string | undefined => {
  if (!type || !["date", "datetime-local"].includes(type)) return value?.toString();
  const date = value != undefined ? new Date(value) : undefined;
  if (!isValidDate(date)) return value?.toString();
  const format: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(type === "datetime-local" ? { hour: "2-digit", minute: "2-digit" } : undefined),
  };
  return date.toLocaleString(locale, format);
};
