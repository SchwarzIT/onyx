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
  autocomplete?: Autocomplete | Autocomplete[];
  /**
   * Whether to focus the input on page load or when dialog/popover become shown if used inside a dialog/popover.
   * Can only be enabled for one element inside a page/dialog/popover.
   * Note: Has no effect when set after the component has been mounted.
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
};

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];

/**
 * @see [MDN autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize)
 */
export const AUTOCAPITALIZE = ["none", "sentences", "words", "characters"] as const;
export type Autocapitalize = (typeof AUTOCAPITALIZE)[number];

/**
 * @see [MDN autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
 */
export const AUTOCOMPLETE = [
  "off",
  "on",
  "name",
  "honorific-prefix",
  "given-name",
  "additional-name",
  "family-name",
  "honorific-suffix",
  "nickname",
  "email",
  "username",
  "new-password",
  "current-password",
  "one-time-code",
  "organization-title",
  "organization",
  "street-address",
  "shipping",
  "billing",
  "address-line1",
  "address-line2",
  "address-line3",
  "address-level4",
  "address-level3",
  "address-level2",
  "address-level1",
  "country",
  "country-name",
  "postal-code",
  "cc-name",
  "cc-given-name",
  "cc-additional-name",
  "cc-family-name",
  "cc-number",
  "cc-exp",
  "cc-exp-year",
  "cc-csc",
  "cc-type",
  "transaction-currency",
  "transaction-amount",
  "language",
  "bday",
  "bday-day",
  "bday-month",
  "bday-year",
  "sex",
  "tel",
  "tel-country-code",
  "tel-national",
  "tel-area-code",
  "tel-local",
  "tel-extension",
  "impp",
  "url",
  "photo",
  "webauthn",
] as const;

// Note: Since TypeScript version 5.2, there is a native "AutoFill" type that we can use
// so we don't need to maintain this here. But unfortunately the Vue compiler currently does
// not support it because the union type is too complex
export type Autocomplete = (typeof AUTOCOMPLETE)[number];
