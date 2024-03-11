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
   * Whether the input is required.
   */
  required?: boolean;
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
   * Whether the input should be readonly.
   */
  readonly?: boolean;
  /**
   * Whether the input should be disabled.
   */
  disabled?: boolean;
  /**
   * Whether the input is loading. User interaction will be disabled.
   */
  loading?: boolean;
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
