export type OnyxInputProps = {
  /**
   * Label to show above the input.
   */
  label: string;
  /**
   * Current value of the input.
   */
  modelValue?: string;
  /**
   * Input type.
   */
  type?: InputType;
  /**
   * Placeholder to show when the value is empty.
   */
  placeholder?: string;
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
   * Whether to focus the input on page load or when dialog/popover become shown if used inside a dialog/popover.
   * Can only be enabled for one element inside a page/dialog/popover.
   * Note: Has no effect when set after the component has been mounted.
   *
   * **UX / Accessibility**: autofocus should be used carefully since it can reduce usability and accessibility for users.
   */
  autofocus?: boolean;
  /**
   * Same as the native `name` attribute of `<input>`.
   * Used to reference the input in JavaScript or in submitted form data.
   */
  name?: string;
  /**
   * Pattern the value must match to be valid.
   */
  pattern?: string | RegExp;
  /**
   * Maximum number of characters that are allowed to be entered.
   * For validation: If the value is set by code, the browser can not detect the validity
   * so it will only get invalid when the user interacts with the component.
   */
  maxlength?: number;
  /**
   * Minimum number of characters that have to to be entered.
   * For validation: If the value is set by code, the browser can not detect the validity
   * so it will only get invalid when the user interacts with the component.
   */
  minlength?: number;
  /**
   * If `true`, a character counter will be displayed if `maxLength` is set.
   */
  withCounter?: boolean;
  /**
   * Message / help text to display below the input.
   */
  message?: string;
};

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];

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
