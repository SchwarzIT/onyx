import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { injectI18n } from "../i18n";
import type { Nullable } from "../types";
import type { FormMessages } from "./useCustomValidity";

/**
 * @see [MDN autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize)
 */
export const AUTOCAPITALIZE = ["none", "sentences", "words", "characters"] as const;
export type Autocapitalize = (typeof AUTOCAPITALIZE)[number];

/**
 * Same as TypeScript native "Autofill" type but without "AutoFillSection" because
 * the Vue compiler currently can not handle it (too complex union type).
 *
 * @since TypeScript version 5.2
 */
export type Autocomplete = Exclude<AutoFill, AutoFillSection | "">;

export type MaxLength =
  | number
  | {
      /**
       * Maximum number of characters that are allowed to be entered.
       */
      max: number;
      /**
       * Restricts the user from typing more characters than allowed.
       */
      strict?: boolean;
    };

/**
 * Shared types for all kind of text inputs, namely: `<input type="text">` and `<textarea>`
 */
export type SharedTextInputProps = {
  /**
   * Maximum number of characters that are allowed to be entered.
   * Warning: when the value is (pre)set programmatically,
   * the input invalidity will not be detected by the browser, it will only turn invalid
   * as soon as a user interacts with the input (types something).
   */
  maxlength?: MaxLength;
  /**
   * If `true`, a character counter will be displayed if `maxLength` is set.
   */
  withCounter?: boolean;
  /**
   * Minimum number of characters that have to to be entered.
   * Warning: when the value is (pre)set programmatically,
   * the input invalidity will not be detected by the browser, it will only turn invalid
   * as soon as a user interacts with the input (types something).
   */
  minlength?: number;
  /**
   * If and how text should be automatically be capitalized when using non-physical keyboards
   * (such as virtual keyboard on mobile devices or voice input).
   *
   * Has no effect when `type` is set to "url", "email" or "password".
   *
   * @see [MDN autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize)
   */
  autocapitalize?: Autocapitalize;
  /**
   * Specify how to provide automated assistance in filling out the input.
   * Some autocomplete values might required specific browser permissions to be allowed by the user.
   * Also browsers might require a `name` property.
   *
   * @see [MDN autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  autocomplete?: Autocomplete;
  /**
   * Current input value.
   */
  modelValue?: Nullable<string>;
};

export type HtmlTextInputElements = HTMLInputElement | HTMLTextAreaElement;

export type UseTextInputOptions = {
  modelValue: MaybeRefOrGetter<string | undefined | null>;
  props: SharedTextInputProps;
};

/**
 * This composable returns a computed property `maxLengthError` that checks if the `modelValue` prop is longer than the specified `maxlength`.
 * If so, it returns a custom error message.
 *
 * The native [maxlength attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength) restricts the user from entering more characters then allowed.
 * This custom validation circumvents that restrictions.
 */
export const useLenientMaxLengthValidation = (options: UseTextInputOptions) => {
  const { t } = injectI18n();

  const normalized = computed(() => {
    const maxLength = options.props.maxlength;
    return {
      max: maxLength && (typeof maxLength === "number" ? maxLength : maxLength.max),
      strict: (typeof maxLength === "object" && maxLength.strict) ?? false,
    };
  });

  const maxLengthError = computed(() => {
    const { strict, max } = normalized.value;
    const modelValue = toValue(options.modelValue);

    return !strict && modelValue && max && modelValue.length > max
      ? ({
          longMessage: t.value("validations.tooLong.fullError", {
            n: modelValue.length,
            maxLength: max,
          }),
          shortMessage: t.value("validations.tooLong.preview", {
            n: modelValue.length,
            maxLength: max,
          }),
        } satisfies FormMessages)
      : undefined;
  });

  const maxLength = computed(() => (normalized.value.strict ? normalized.value.max : undefined));

  return {
    /**
     * Custom maxlength error, if we are unable to use the native maxlength attribute.
     */
    maxLengthError,
    /**
     * In strict mode, the native maxlength attribute is used.
     */
    maxLength,
  };
};
