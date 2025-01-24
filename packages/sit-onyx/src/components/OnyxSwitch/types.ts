import type { BaseSelectOption, SelectOptionValue } from "../../types";

export type OnyxSwitchProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "value"
> & {
  /**
   * Whether the switch should be checked or not.
   */
  modelValue?: boolean;
};
