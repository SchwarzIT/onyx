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
   * Description / help text to display below the input.
   */
  description?: string;
  /**
   * Pattern the value must match to be valid.
   */
  pattern?: string | RegExp;
};

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];
