import type { BaseSelectOption, Nullable, SelectOptionValue } from "../../types";

export type OnyxCheckboxProps<TValue extends SelectOptionValue = SelectOptionValue> =
  BaseSelectOption<TValue> & {
    /**
     * Whether the checkbox is checked.
     */
    modelValue?: Nullable<boolean>;
    /**
     * If `true`, an indeterminate indicator is shown.
     */
    indeterminate?: boolean;
  };
