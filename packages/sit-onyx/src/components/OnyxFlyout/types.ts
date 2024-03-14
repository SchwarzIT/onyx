import type { SelectionOption, SelectionOptionValue } from "../OnyxRadioButton/types";

export type OnyxFlyoutProps<TValue extends SelectionOptionValue = SelectionOptionValue> = {
  /**
   * Available options to choose from.
   */
  options: SelectionOption<TValue>[];
  /**
   * Optional label to show at the bottom.
   */
  label?: string;
  /**
   * Current value / selected options.
   */
  modelValue?: TValue;
};
