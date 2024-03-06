export type OnyxCheckboxProps = {
  /**
   * Whether the checkbox is checked.
   */
  modelValue?: boolean;
  /**
   * Label to show. Required due to accessibility / screen readers.
   * If you want to visually hide the label, use the `hideLabel` property.
   */
  label: string;
  /**
   * If `true`, an indeterminate indicator is shown.
   */
  indeterminate?: boolean;
  /**
   * Whether to disable the checkbox and prevent user interaction.
   */
  disabled?: boolean;
  /**
   * Whether the checkbox is required / has to be checked.
   */
  required?: boolean;
  /**
   * If `true`, the label will be visually hidden.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
  /**
   * Whether to show a skeleton button.
   */
  skeleton?: boolean;
};
