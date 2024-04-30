export type OnyxListboxOptionProps = {
  /**
   * Whether the option is (visually) active.
   */
  active?: boolean;
  /**
   * Whether the option is selected.
   */
  selected?: boolean;
  /**
   * Adds a checkbox to the option
   */
  multiple?: boolean;
  /**
   * If `true`, an indeterminate indicator is shown.
   * Only in combination with `multiple`
   */
  indeterminate?: boolean;
};
