export type OnyxSwitchProps = {
  /**
   * Whether the switch should be checked or not.
   */
  modelValue?: boolean;
  /**
   * The label of the switch.
   */
  label?: string;
  /**
   * Whether to disable the switch and prevent user interaction.
   */
  disabled?: boolean;
  /**
   * Whether the switch should be readonly or not.
   */
  readonly?: boolean;
  /**
   * Whether the switch is required / has to be checked.
   */
  required?: boolean;
  /**
   * Whether the switch should be invalid or not.
   */
  invalid?: boolean;
  /**
   * If `true`, the label will be visually hidden.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
};
