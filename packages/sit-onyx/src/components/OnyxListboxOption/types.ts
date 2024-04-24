export type OnyxListboxOptionProps = {
  /**
   * Unique (HTML) ID of the option.
   */
  id: string;
  /**
   * (Aria) label of the option. Required for accessibility / screen readers.
   */
  label: string;
  /**
   * Whether the option is selected.
   */
  selected?: boolean;
  /**
   * Whether the option is (visually) active.
   */
  active?: boolean;
  /**
   * Adds a checkbox to the option
   */
  multiple?: boolean;
  /**
   * Optional icon.
   */
  icon?: string;
  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
};
