import type { CheckboxGroupOptionValue } from "../OnyxCheckboxGroup/types";
import type { SelectionOption } from "../OnyxRadioButton/types";

export type OnyxFlyoutProps<
  TValue extends CheckboxGroupOptionValue = CheckboxGroupOptionValue,
  TMultiselect extends boolean = false,
> = {
  /**
   * Available options to choose from.
   */
  options: SelectionOption<TValue>[];
  /**
   * Optional label to show at the bottom.
   */
  label?: string;
  modelValue?: TMultiselect extends true ? CheckboxGroupOptionValue[] : CheckboxGroupOptionValue;
};
