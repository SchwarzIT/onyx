import type { BaseSelectOption, Nullable, SelectOptionValue } from "../../types/index.js";

export type OnyxSwitchProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  BaseSelectOption<TValue>,
  "value"
> & {
  /**
   * Whether the switch should be checked or not.
   */
  modelValue?: Nullable<boolean>;
};
