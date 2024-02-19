import type { SelectionOption } from "../OnyxRadioButton/types";

export type OnyxRadioButtonGroupProps<TValue> = {
  /**
   * Unique name for the radio button group form element.
   * Will automatically filled, when it is not given.
   * Warning: Never use a name for form elements twice!
   */
  name?: string;
  modelValue?: SelectionOption<TValue>;
  /**
   * Headline shown above the radio button group, which is also the fieldset legend.
   */
  headline?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;

  /**
   * Direction of the checkboxes.
   */
  direction?: RadioButtonGroupDirection;
  options: SelectionOption<TValue>[];
};

export const RADIO_BUTTON_GROUP_DIRECTIONS = ["horizontal", "vertical"] as const;
export type RadioButtonGroupDirection = (typeof RADIO_BUTTON_GROUP_DIRECTIONS)[number];
