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
   * Whether the input should be readonly.
   */
  readonly?: boolean;
  /**
   * Whether the input should be disabled.
   */
  disabled?: boolean;
};

export const INPUT_TYPES = ["email", "password", "search", "tel", "text", "url"] as const;
export type InputType = (typeof INPUT_TYPES)[number];
