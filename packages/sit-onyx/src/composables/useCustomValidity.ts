import {
  computed,
  ref,
  toValue,
  watch,
  watchEffect,
  type Directive,
  type MaybeRefOrGetter,
} from "vue";
import type { DateValue, OnyxDatePickerProps } from "../components/OnyxDatePicker/types";
import type { InputType } from "../components/OnyxInput/types";
import { injectI18n } from "../i18n";
import enUS from "../i18n/locales/en-US.json";
import { isValidDate } from "../utils/date";
import { areObjectsFlatEqual } from "../utils/objects";
import { getFirstInvalidType, transformValidityStateToObject } from "../utils/validity";

export type CustomMessageType = string | FormMessages;

export type CustomValidityProp = {
  /**
   * Custom error message to show. Will only show up after the user has interacted with the input.
   */
  customError?: CustomMessageType;
};

export type UseCustomValidityOptions = {
  /**
   * Explicitly set custom error. Any non-nullish value will set the input to be invalid.
   * If both, `options.customError` and `options.props.customError` are provided, the message from the props will take precedence.
   */
  customError?: MaybeRefOrGetter<CustomMessageType | undefined>;
  /**
   * Component props as defined with `const props = defineProps()`.
   * These prop values are used for the error messages of the native validation errors.
   */
  props: {
    customError?: CustomMessageType;
    modelValue?: unknown;
    type?: InputType | OnyxDatePickerProps["type"];
    maxlength?: number;
    minlength?: number;
    min?: DateValue;
    max?: DateValue;
    validStepSize?: number;
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
 * Translated messages that inform about the state of a form element.
 */
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
export const getFormMessageText = (customError?: CustomMessageType): string | undefined => {
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
 * Composable for unified handling of custom messages for form components.
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
  const { t, locale } = injectI18n();

  const validityState = ref<Record<keyof ValidityState, boolean>>();
  const isDirty = ref(false);

  const customError = computed(() => options.props.customError ?? toValue(options.customError));

  /**
   * Sync isDirty state. The component is "dirty" when the value was modified at least once.
   */
  watch(
    () => toValue(options.props).modelValue,
    () => (isDirty.value = true),
    { once: true },
  );

  const vCustomValidity = {
    mounted: (el) => {
      /**
       * Sync custom error with the native input validity.
       */
      watchEffect(() => el.setCustomValidity(getFormMessageText(customError.value) ?? ""));

      watch(
        // we need to watch all props instead of only modelValue so the validity is re-checked
        // when the validation rules change
        [() => options.props, customError],
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
        [customError, validityState, isDirty],
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
    const customErrors = getFormMessages(customError.value);
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
      min: formatMinMax(locale.value, options.props.type, options.props.min),
      max: formatMinMax(locale.value, options.props.type, options.props.max),
      step: options.props.validStepSize,
    };

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
  type: UseCustomValidityOptions["props"]["type"],
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
