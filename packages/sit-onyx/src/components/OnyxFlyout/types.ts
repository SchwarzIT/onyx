import type { OnyxFlyoutOptionProps } from "../OnyxFlyoutOption/types";
import type { SelectionOptionValue } from "../OnyxRadioButton/types";

export type OnyxFlyoutProps<TValue extends SelectionOptionValue = SelectionOptionValue> = {
  /**
   * Available options to choose from.
   */
  options: FlyoutOption<TValue>[];
  /**
   * Optional label to show at the bottom.
   */
  label?: string;
  /**
   * Current value / selected options.
   */
  modelValue?: TValue;
};

export type FlyoutOption<T extends SelectionOptionValue = SelectionOptionValue> = Omit<
  OnyxFlyoutOptionProps,
  "modelValue"
> & {
  /**
   * Option ID / value to use when the option is selected.
   */
  id: T;
};
