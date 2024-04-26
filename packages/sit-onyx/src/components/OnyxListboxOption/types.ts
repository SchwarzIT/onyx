import type { OnyxColor } from "../../types";

export type OnyxListboxOptionProps = {
  /**
   * Unique (HTML) ID of the option.
   */
  id: string;
  /**
   * Whether the option is (visually) active.
   */
  active?: boolean;
  /**
   * Adds a checkbox to the option
   */
  multiple?: boolean;
  /**
   * If `true`, an indeterminate indicator is shown.
   * Only in combination with `multiple`
   */
  indeterminate?: boolean;
  /**
   * Optional icon.
   */
  icon?: string;
  /**
   * Main color of the option. Will have no effect on the multiselect checkbox.
   */
  color?: Extract<OnyxColor, "primary" | "danger">;
};
