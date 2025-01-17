import type { BaseSelectOption, SelectOptionValue } from "../../types";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> =
  BaseSelectOption<TValue> & {
    /**
     * Whether the checkbox is checked.
     */
    modelValue?: boolean;
    /**
     * If `true`, an indeterminate indicator is shown.
     */
    indeterminate?: boolean;
  };
