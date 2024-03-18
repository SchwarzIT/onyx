import type { OnyxListboxOptionProps } from "../OnyxListboxOption/types";
import type { SelectionOptionValue } from "../OnyxRadioButton/types";

export type OnyxListboxProps<TValue extends SelectionOptionValue = SelectionOptionValue> = {
  /**
   * Available options to choose from.
   */
  options: FlyoutOption<TValue>[];
  /**
   * Label to show at the bottom.
   *  Required due to accessibility / screen readers. If you want to visually hide the label, use the hideLabel property.
   */
  label: string;
  /**
   * Current value / selected options.
   */
  modelValue?: TValue;
  /**
   * If true, the label will be visually hidden.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hideLabel?: boolean;
};

export type FlyoutOption<T extends SelectionOptionValue = SelectionOptionValue> = Omit<
  OnyxListboxOptionProps,
  "modelValue"
> & {
  /**
   * Option ID / value to use when the option is selected.
   */
  id: T;
};
