import type { BaseSelectOption, SelectOptionValue } from "../../types/index.js";

export type OnyxRadioButtonProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "hideLabel" | "requiredMarker"
> & {
  /**
   * Identifier for the radio buttons in the group.
   * All radio buttons that should belong to the same radio group must have the same name.
   * See also: https://html.spec.whatwg.org/multipage/input.html#radio-button-group
   */
  name: string;
  /**
   * Whether the radio button is checked.
   */
  checked?: boolean;
  /**
   * If any radio button of a group is required, a radio button of the group must be checked.
   * But it doesn't have to be this particular option.
   * See also: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#required
   */
};
