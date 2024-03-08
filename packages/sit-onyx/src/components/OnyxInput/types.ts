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
